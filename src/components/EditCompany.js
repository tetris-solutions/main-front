import React from 'react'
import {branch} from 'baobab-react/higher-order'

export const EditCompany = React.createClass({
  displayName: 'Edit-Company',
  render () {
    return (
      <div></div>
    )
  }
})

export default branch(EditCompany, {
  cursors: {

  }
})
