import React from 'react'
import PropTypes from 'prop-types'
import {branch} from 'baobab-react/higher-order'
import {Link} from 'react-router'
import Message from 'tetris-iso/Message'
import Fence from './Fence'

export class CompanyInfo extends React.Component {
  static displayName = 'Company-Info'

  static propTypes = {
    location: PropTypes.object.isRequired,
    company: PropTypes.shape({
      name: PropTypes.string,
      timezone: PropTypes.string
    }).isRequired
  }

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

        <Fence canEditCompany>
          <Link className='btn btn-link' to={`${location.pathname}/edit`}>
            <Message>editCompany</Message>
          </Link>
        </Fence>
      </div>
    )
  }
}

export default branch((props, context) => ({
  company: ['companies', props.params.company]
}), CompanyInfo)
