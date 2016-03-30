import React from 'react'
import Message from '../intl/Message'
import {Link} from 'react-router'

function DashboardNav () {
  return (
    <div>
      <h3 className='page-header'>
        <Message>dashboardHeader</Message>
      </h3>
      <div className='row'>
        <Link to='/dashboard/profile' className='col-sm-6 col-md-4 col-md-offset-2 text-center'>
          <h1 className='glyphicon glyphicon-user'/>
          <div className='caption'>
            <h3>
              <Message>navProfile</Message>
            </h3>
            <p>
              <Message>manageYourProfile</Message>
            </p>
          </div>
        </Link>
        <Link to='/dashboard/companies' className='col-sm-6 col-md-4 text-center'>
          <h1 className='glyphicon glyphicon-briefcase huge'/>
          <div className='caption'>
            <h3>
              <Message>navCompanies</Message>
            </h3>
            <p>
              <Message>manageYourCompanies</Message>
            </p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export const Dashboard = React.createClass({
  propTypes: {
    children: React.PropTypes.node
  },
  render () {
    const {children} = this.props
    // @todo: breadcrumbs
    return (
      <div className='container'>
        {children || (
          <DashboardNav />
        )}
      </div>
    )
  }
})

export default Dashboard
