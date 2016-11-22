import React from 'react'
import {branch} from 'baobab-react/higher-order'
import {Link} from 'react-router'
import Message from 'tetris-iso/Message'

const {PropTypes} = React

export const CompanyInfo = React.createClass({
  displayName: 'Company-Info',
  propTypes: {
    location: PropTypes.object.isRequired,
    company: PropTypes.shape({
      name: PropTypes.string,
      timezone: PropTypes.string
    }).isRequired
  },
  render () {
    const {company, location} = this.props
    return (
      <div>
        <br/>

        <dl className='dl-horizontal'>
          <dt><Message>companyNameLabel</Message></dt>
          <dd>{company.name}</dd>
          <dt><Message>timezoneLabel</Message></dt>
          <dd>{company.timezone}</dd>
        </dl>

        <hr/>
        <Link className='btn btn-link' to={`${location.pathname}/edit`}>
          <Message>editCompany</Message>
        </Link>
      </div>
    )
  }
})

export default branch((props, context) => ({
  company: ['companies', props.params.company]
}), CompanyInfo)
