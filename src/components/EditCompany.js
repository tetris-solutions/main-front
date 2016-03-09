import React from 'react'
import {branch} from 'baobab-react/higher-order'

const {PropTypes} = React

export const EditCompany = React.createClass({
  displayName: 'Edit-Company',
  propTypes: {
    company: PropTypes.object,
    params: PropTypes.object
  },
  contextTypes: {
    location: PropTypes.object,
    params: PropTypes.object
  },
  render () {
    return (
      <h2>{this.props.company.name}</h2>
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
