import React from 'react'
import {IndexLink} from 'react-router'

export default React.createClass({
  displayName: 'Activation-Success',
  render () {
    return (
      <div className='container'>
        <h1 className='page-header'>Conta ativada!</h1>
        <p className='text-success'>Sua conta foi ativada com sucesso.</p>
        <IndexLink to='/' className='btn btn-primary pull-right'>
          Voltar
        </IndexLink>
      </div>
    )
  }
})