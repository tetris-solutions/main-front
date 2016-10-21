import React from 'react'
import {Link} from 'react-router'
import csjs from 'csjs'
import StyledMixin from './mixins/styled'

const style = csjs`
.link {
  color: #213277 !important;
}`

const BlueLink = React.createClass({
  displayName: 'Blue-Link',
  mixins: [StyledMixin],
  style,
  render () {
    return (
      <Link className={`${style.link}`} {...this.props}/>
    )
  }
})

export default BlueLink
