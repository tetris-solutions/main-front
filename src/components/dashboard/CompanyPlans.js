import React from 'react'
import PropTypes from 'prop-types'
import {branch} from 'baobab-react/higher-order'
import map from 'lodash/map'
import Plan from './Plan'

export class CompanyPlans extends React.Component {
  static displayName = 'Company-Plans'

  static propTypes = {
    company: PropTypes.object,
    plans: PropTypes.array
  }

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
}

export default branch((props, context) => ({
  company: ['companies', props.params.company],
  plans: ['plans']
}), CompanyPlans)
