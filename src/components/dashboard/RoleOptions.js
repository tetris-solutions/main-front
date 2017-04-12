import React from 'react'
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types'
import map from 'lodash/map'
import forEach from 'lodash/forEach'
import {branch} from 'baobab-react/higher-order'
import some from 'lodash/some'
import SimpleInput from '../SimpleInput'
import FormMixin from '../FormMixin'
import SubmitButton from '../SubmitButton'
import Message from 'tetris-iso/Message'
import {updateRoleAction} from '../../actions/update-role-action'
import {loadUserCompaniesAction} from 'tetris-iso/actions'
import {loadCompanyAction} from '../../actions/load-company-action'
import {pushSuccessMessageAction} from '../../actions/push-success-message-action'
import groupBy from 'lodash/groupBy'

export const RoleOptions = createReactClass({
  displayName: 'Role-Options',
  mixins: [FormMixin],
  propTypes: {
    role: PropTypes.object,
    permissions: PropTypes.array,
    params: PropTypes.object,
    dispatch: PropTypes.func
  },
  handleSubmit (e) {
    e.preventDefault()
    this.preSubmit()

    const {elements} = e.target
    const permissions = []
    const {dispatch, role, params: {company}} = this.props

    forEach(this.props.permissions, ({id}) => {
      if (elements[id] && elements[id].checked) {
        permissions.push(id)
      }
    })

    return dispatch(updateRoleAction, role.id, elements.name.value, permissions)
      .then(() => Promise.all([
        dispatch(loadUserCompaniesAction),
        dispatch(loadCompanyAction, company)
      ]))
      .then(() => dispatch(pushSuccessMessageAction))
      .catch(this.handleSubmitException)
      .then(this.posSubmit)
  },
  render () {
    const {errors} = this.state
    const {permissions: availablePerms, role: {id, name, permissions: enabledPerms}} = this.props
    const permGroups = groupBy(availablePerms, 'app_name')

    return (
      <form key={`edit-role-${id}`} className='well' method='POST' onSubmit={this.handleSubmit}>
        <SimpleInput
          name='name'
          label='roleName'
          error={errors.name}
          defaultValue={name}
          onChange={this.dismissError}
          required/>

        {map(permGroups, (permissions, groupName) =>
          <div key={groupName} className='panel panel-default'>
            <div className='panel-heading'>
              <Message group={groupName === 'undefined' ? 'Global' : groupName}>
                permissionsHeader
              </Message>
            </div>

            <div className='panel-body'>
              {map(permissions, ({id, name}, index) =>
                <div className='checkbox' key={index}>
                  <label>
                    <input
                      name={id}
                      type='checkbox'
                      defaultChecked={some(enabledPerms, {id})}/> {name}
                  </label>
                </div>)}
            </div>
          </div>)}

        <div className='text-right'>
          <SubmitButton/>
        </div>

      </form>
    )
  }
})

export default branch(({params: {company}}) => ({
  permissions: ['companies', company, 'permissions']
}), RoleOptions)
