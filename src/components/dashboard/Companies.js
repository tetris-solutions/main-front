import React from 'react'
import Message from './../intl/Message'
import {branch} from 'baobab-react/higher-order'
import map from 'lodash/map'

const {PropTypes} = React

export const Companies = React.createClass({
  displayName: 'Companies',
  propTypes: {
    companies: PropTypes.array.isRequired,
    children: PropTypes.node
  },
  contextTypes: {
    messages: PropTypes.object,
    router: PropTypes.object,
    params: PropTypes.object
  },
  navigateToCompany ({target: {value}}) {
    this.context.router.push(`/dashboard/companies/${value}`)
  },
  render () {
    const {params: {company}} = this.context
    return (
      <div>
        <h3>
          <Message>adminHeader</Message>
          <small>
            <form className='pull-right'>
              <span className='form-group'>
                <select className='form-control' onChange={this.navigateToCompany} value={company || ''}>

                  {map(this.props.companies, ({name, id}, index) => (
                    <option key={index} value={id}>{name}</option>
                  ))}

                  <option value=''>{this.context.messages.newCompanyLabel}</option>
                </select>
              </span>
            </form>
          </small>
        </h3>
        <br/>
        {this.props.children}
      </div>
    )
  }
})

export default branch(Companies, {
  cursors: {
    companies: ['user', 'companies']
  }
})
