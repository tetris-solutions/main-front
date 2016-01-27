import React from 'react'
import {IndexLink} from 'react-router'

const {createClass, PropTypes} = React

export default createClass({
  displayName: 'Activation-Failure',
  propTypes: {
    children: PropTypes.node
  },
  render () {
    return (
      <div className='container'>
        <h1 className='page-header'>Falha na ativação!</h1>
        <p className='text-danger'>
          {this.props.children || 'Não foi possível ativar sua conta.'}
        </p>
        <IndexLink to='/' className='btn btn-primary pull-right'>Voltar</IndexLink>
      </div>
    )
  }
})