import React from 'react'
import Message from 'tetris-iso/Message'
import {branch} from 'baobab-react/higher-order'
import map from 'lodash/map'
import {Link} from 'react-router'
import Fence from './Fence'

const {PropTypes} = React

function CompanyThumb ({name, id, role}) {
  return (
    <Link to={`/dashboard/company/${id}/info`} className='col-sm-6 col-md-4 text-center'>
      <div className='thumbnail'>
        <h1 className='glyphicon glyphicon-briefcase huge'/>
        <div className='caption'>
          <h2>{name}</h2>
          <p>{role.name}</p>
        </div>
      </div>
    </Link>
  )
}

CompanyThumb.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  role: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string
  })
}

CompanyThumb.displayName = 'Company-Thumb'

export const Companies = React.createClass({
  displayName: 'Companies',
  propTypes: {
    companies: PropTypes.array.isRequired
  },
  contextTypes: {
    messages: PropTypes.object,
    router: PropTypes.object,
    params: PropTypes.object
  },
  render () {
    return (
      <div>
        <h3>
          <Message>navCompanies</Message>
        </h3>
        <br/>
        <div className='row'>
          {map(this.props.companies, (company, index) => <CompanyThumb key={index} {...company} />)}

          <Fence adminOnly>
            <Link to='/dashboard/create/company' className='col-sm-6 col-md-4 text-center'>
              <div className='thumbnail'>
                <h1 className='glyphicon glyphicon-briefcase huge'/>
                <div className='caption'>
                  <h2>
                    <Message>newCompanyHeader</Message>
                  </h2>
                  <p>
                    <Message>createCompany</Message>
                  </p>
                </div>
              </div>
            </Link>
          </Fence>
        </div>
      </div>
    )
  }
})

export default branch({companies: ['user', 'companies']}, Companies)
