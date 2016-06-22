import React from 'react'
import {branch} from 'baobab-react/higher-order'

const {PropTypes} = React

export const CompanyEdit = React.createClass({
  displayName: 'Company-Edit',
  propTypes: {
    company: PropTypes.shape({
      name: PropTypes.string
    })
  },
  render () {
    return (
      <div>{this.props.company.name} Bla bla bla</div>
    )
  }
})

export default branch((props, context) => ({
  company: ['companies', props.params.company]
}), CompanyEdit)
