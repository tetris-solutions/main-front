import React from 'react'
import {branch} from 'baobab-react/higher-order'
import map from 'lodash/map'

const {PropTypes} = React

export const CompanyPlans = React.createClass({
  displayName: 'Company-Plans',
  propTypes: {
    plans: PropTypes.array
  },
  render () {
    const {plans} = this.props
    return (
      <ul>
        {map(plans, ({name}, index) => <li key={index}>{name}</li>)}
      </ul>
    )
  }
})

export default branch(CompanyPlans, {
  cursors: {
    plans: ['plans']
  }
})
