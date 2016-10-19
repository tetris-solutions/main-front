import React from 'react'
import {branch} from 'baobab-react/higher-order'
import FormMixin from '../FormMixin'
import SimpleInput from '../SimpleInput'
import SubmitButton from '../SubmitButton'
import Message from 'tetris-iso/Message'
import _timezones from '../../timezones'
import map from 'lodash/map'
import flatten from 'lodash/flatten'
import sortBy from 'lodash/sortBy'
import {updateCompanyAction} from '../../actions/update-company-action'
import {pushSuccessMessageAction} from '../../actions/push-success-message-action'
import {updateCompanyIconAction} from '../../actions/update-company-icon-action'
import {loadCompanyAction} from '../../actions/load-company-action'
import AvatarPicker from '../AvatarPicker'

const {PropTypes} = React

const fmtTz = str => str.replace(/_/g, ' ').split('/').reverse().join(', ')
const timezones = sortBy(flatten(map(_timezones, ({utc}) =>
  map(utc || [], str => ({
    text: fmtTz(str),
    value: str
  })))), 'text')

export const CompanyEdit = React.createClass({
  displayName: 'Company-Edit',
  mixins: [FormMixin],
  propTypes: {
    dispatch: PropTypes.func,
    company: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      icon: PropTypes.string,
      legacy_dash_url: PropTypes.string,
      timezone: PropTypes.string
    })
  },
  handleSubmit (e) {
    e.preventDefault()
    const form = e.target
    const {dispatch, company} = this.props
    const payload = {
      name: form.elements.name.value,
      timezone: form.elements.timezone.value,
      legacy_dash_url: form.elements.legacy_dash_url.value
    }

    return dispatch(updateCompanyAction, company.id, payload)
      .then(() => dispatch(pushSuccessMessageAction))
      .then(this.uploadAvatar)
      .then(() => dispatch(loadCompanyAction, company.id))
      .catch(this.handleSubmitException)
      .then(this.posSubmit)
  },
  uploadAvatar () {
    /**
     * @type {AvatarPicker}
     */
    const av = this.refs.icon
    const {company, dispatch} = this.props

    if (!av.hasImage()) {
      return Promise.resolve()
    }

    av.getImageAsBlob().then(blob =>
      dispatch(updateCompanyIconAction, company.id, blob))
  },
  render () {
    const {company} = this.props
    const {errors} = this.state

    return (
      <div>
        <br/>

        <form className='jumbotron' onSubmit={this.handleSubmit} method='POST'>

          <AvatarPicker ref='icon' image={company.icon}/>

          <SimpleInput
            name='name'
            label='companyName'
            defaultValue={company.name}
            error={errors.name}
            onChange={this.dismissError}
            required/>

          <SimpleInput
            type='url'
            name='legacy_dash_url'
            label='legacyDashUrl'
            defaultValue={company.legacy_dash_url}
            error={errors.legacy_dash_url}
            onChange={this.dismissError}/>

          <div className='form-group'>
            <label className='control-label'>
              <Message>timezoneLabel</Message>
            </label>

            <select className='form-control' name='timezone' required defaultValue={company.timezone}>
              {map(timezones, ({text, value}, index) => (
                <option key={index} value={value}>
                  {text}
                </option>))}
            </select>
          </div>
          <SubmitButton/>
        </form>
      </div>
    )
  }
})

export default branch((props, context) => ({
  company: ['companies', props.params.company]
}), CompanyEdit)
