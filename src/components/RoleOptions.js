import React from 'react'
import map from 'lodash/map'
import forEach from 'lodash/forEach'
import {branch} from 'baobab-react/higher-order'
import some from 'lodash/some'
import SimpleInput from './SimpleInput'
import FormMixin from '../mixins/FormMixin'
import SubmitButton from './SubmitButton'
import Message from './intl/Message'
import {updateRoleAction} from '../actions/update-role-action'

const {PropTypes} = React

export const RoleOptions = React.createClass({
  displayName: 'Role-Options',
  mixins: [FormMixin],
  contextTypes: {
    role: PropTypes.object
  },
  propTypes: {
    permissions: PropTypes.array,
    actions: PropTypes.shape({
      updateRole: PropTypes.func
    })
  },
  handleSubmit (e) {
    e.preventDefault()
    this.preSubmit()

    const {elements} = e.target
    const permissions = []
    const {role} = this.context

    forEach(this.props.permissions, ({id}) => {
      if (elements[id] && elements[id].checked) {
        permissions.push(id)
      }
    })

    return this.props.actions
      .updateRole(role.id, elements.name.value, permissions)
      .then(() => {
        // @todo make a bunch of API calls to update the UI
      })
      .catch(this.handleSubmitException)
      .then(this.posSubmit)
  },
  render () {
    const {errors} = this.state
    const {role: {name, permissions}} = this.context

    return (
      <form className='well' method='POST' onSubmit={this.handleSubmit}>
        <SimpleInput name='name'
                     label='roleName'
                     error={errors.name}
                     defaultValue={name}
                     onChange={this.dismissError}
                     required/>

        <div className='panel panel-default'>
          <div className='panel-heading'>
            <Message>permissionsHeader</Message>
          </div>
          <div className='panel-body'>
            {map(this.props.permissions, ({id, name}, index) => (
              <div className='checkbox' key={index}>
                <label>
                  <input
                    name={id}
                    type='checkbox'
                    defaultChecked={some(permissions, {id})}/> {name}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className='text-right'>
          <SubmitButton/>
        </div>

      </form>
    )
  }
})

export default branch(RoleOptions, {
  cursors: {
    permissions: ['permissions']
  },
  actions: {
    updateRole: updateRoleAction
  }
})
