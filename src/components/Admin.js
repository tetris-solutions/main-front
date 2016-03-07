import React from 'react'
import Message from './intl/Message'
import {branch} from 'baobab-react/higher-order'
import map from 'lodash/map'

const {PropTypes} = React

export const Admin = React.createClass({
  displayName: 'Admin',
  propTypes: {
    companies: PropTypes.array.isRequired,
    children: PropTypes.node
  },
  contextTypes: {
    messages: PropTypes.object,
    router: PropTypes.object
  },
  navigateToCompany ({target: {value}}) {
    this.context.router.push(`/admin/${value}`)
  },
  render () {
    return (
      <div className='container'>
        <div className='page-header'>
          <h3>
            <Message>adminHeaderTitle</Message>
            <small>
              <form className='pull-right'>
                <span className='form-group'>
                  <select className='form-control' onChange={this.navigateToCompany}>

                    {map(this.props.companies, ({name, id}, index) => (
                      <option key={index} value={id}>{name}</option>
                    ))}

                    <option value=''>{this.context.messages.newCompanyLabel}</option>
                  </select>
                </span>
              </form>
            </small>
          </h3>
        </div>
        {this.props.children}
      </div>
    )
  }
})

export default branch(Admin, {
  cursors: {
    companies: ['user', 'companies']
  }
})
