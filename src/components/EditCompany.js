import React from 'react'
import {branch} from 'baobab-react/higher-order'
import {Link} from 'react-router'
import cx from 'classnames'

const {PropTypes} = React

export const EditCompany = React.createClass({
  displayName: 'Edit-Company',
  propTypes: {
    company: PropTypes.object,
    params: PropTypes.object,
    children: PropTypes.node
  },
  childContextTypes: {
    company: PropTypes.object
  },
  getChildContext () {
    return {
      company: this.props.company
    }
  },
  render () {
    const {company, children, params} = this.props
    return (
      <div className='row'>
        <div className='col-sm-3'>
          <ul className='nav nav-pills nav-stacked'>
            <li className='disabled'>
              <h3>Grupos</h3>
              <hr/>
            </li>
            {company.roles.map(({id, name}, index) => (
              <li key={index} className={cx(params.role === id && 'active')}>
                <Link to={`/admin/${params.company}/${id}`}>
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className='col-sm-9'>
          <div className='tab-content'>
            <div className='tab-pane active'>
              {children}
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
