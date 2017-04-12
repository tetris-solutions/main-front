import React from 'react'
import PropTypes from 'prop-types'
import Message from 'tetris-iso/Message'
import {Link} from 'react-router'

function DashboardNav () {
  return (
    <div>
      <h3 className='page-header'>
        <Message>dashboardHeader</Message>
      </h3>
      <div className='row'>
        <Link to='/dashboard/profile' className='col-sm-6 col-md-4 col-md-offset-2 text-center'>
          <div className='thumbnail'>
            <h1 className='glyphicon glyphicon-user'/>
            <div className='caption'>
              <h3>
                <Message>navProfile</Message>
              </h3>
              <p>
                <Message>manageYourProfile</Message>
              </p>
            </div>
          </div>
        </Link>
        <Link to='/dashboard/companies' className='col-sm-6 col-md-4 text-center'>
          <div className='thumbnail'>
            <h1 className='glyphicon glyphicon-briefcase huge'/>
            <div className='caption'>
              <h3>
                <Message>navCompanies</Message>
              </h3>
              <p>
                <Message>manageYourCompanies</Message>
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

DashboardNav.displayName = 'Dashboard-Nav'

export class Dashboard extends React.Component {
  static displayName = 'Dashboard'

  static propTypes = {
    children: PropTypes.node
  }

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
}

export default Dashboard
