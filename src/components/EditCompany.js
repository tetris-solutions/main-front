import React from 'react'
import {branch} from 'baobab-react/higher-order'
import {Link} from 'react-router'
import Message from './intl/Message'
import cx from 'classnames'

const {PropTypes, cloneElement} = React

export const EditCompany = React.createClass({
  displayName: 'Edit-Company',
  propTypes: {
    company: PropTypes.object,
    params: PropTypes.object,
    children: PropTypes.node
  },
  render () {
    const {company, children, params} = this.props
    return (
      <div className='row'>
        <div className='col-sm-3'>
          <ul className='nav nav-pills nav-stacked'>
            <li className='disabled'>
              <h4>Grupos</h4>
            </li>
            {company.roles.map(({id, name}, index) => (
              <li key={index} className={cx(params.role === id && 'active')}>
                <Link to={`/admin/${params.company}/${id}`}>
                  {name}
                </Link>
              </li>
            ))}
            <li className={cx(!params.role && 'active')}>
              <Link to={`/admin/${params.company}`}>
                <Message>newRoleHeader</Message>
              </Link>
            </li>
          </ul>
        </div>
        <div className='col-sm-9'>
          <div className='tab-content'>
            <div className='tab-pane active'>
              {cloneElement(children, {company})}
            </div>
          </div>
        </div>
      </div>
    )
  }
})

export default branch(EditCompany, {
  cursors (props, context) {
    return {
      company: ['companies', props.params.company]
    }
  }
})
