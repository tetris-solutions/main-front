import React from 'react'
import {branch} from 'baobab-react/higher-order'
import map from 'lodash/map'
import Plan from './Plan'

const {PropTypes} = React

export const CompanyPlans = React.createClass({
  displayName: 'Company-Plans',
  propTypes: {
    company: PropTypes.object,
    plans: PropTypes.array
  },
  render () {
    const {plans, company} = this.props
    return (
      <div className='container'>
        <div className='row'>
          {map(plans, (plan, index) =>
            <Plan key={index} company={company} plan={plan}/>)}
        </div>
      </div>
    )
  }
})

export default branch(CompanyPlans, {
  cursors (props, context) {
    return {
      company: ['companies', props.params.company],
      plans: ['plans']
    }
  }
})
