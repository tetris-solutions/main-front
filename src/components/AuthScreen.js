import React from 'react'
import csjs from 'csjs'
import StyledMixin from './mixins/styled'
import SimpleInput from './SimpleInput'

const style = csjs`
.container {
  padding-top: 20vh;
  height: 100vh;
  background-color: #e5e5e5;
}
.input {
  background-color: #e5e5e5 !important;
  border-radius: 2px;
}
.input::-webkit-input-placeholder {
  opacity: 1;
  font-weight: bold;
  color: #bdbdbd;
}
.input:-webkit-autofill,
.input:-webkit-autofill:hover, 
.input:-webkit-autofill:focus
.input:-webkit-autofill {
  background-color: #e5e5e5 !important;
  -webkit-box-shadow: 0 0 0px 1000px #e5e5e5 inset;
}
.box {
  padding: 46px 50px;
  background: white;
  width: 340px;
  border-radius: 3px;
  margin: 0 auto;
  box-shadow: 1px 2px 10px rgba(0, 0, 0, 0.1);
}
.logo {
  display: block;
  width: 140px;
  height: auto;
  margin: 0 auto 32px auto;
}
@media (max-width: 400px) {
  .box {
    width: 96%;
  }
}`

export const Input = props => <SimpleInput className={String(style.input)} {...props} />

const AuthScreen = React.createClass({
  displayName: 'Auth-Screen',
  mixins: [StyledMixin],
  style,
  propTypes: {
    children: React.PropTypes.node.isRequired
  },
  render () {
    return (
      <div className={`container-fluid ${style.container}`}>
        <div className={`${style.box}`}>
          <img className={`${style.logo}`} src='/img/tetris-logo.png'/>
          {this.props.children}
        </div>
      </div>
    )
  }
})

export default AuthScreen
