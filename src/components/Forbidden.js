import React from 'react'

export default React.createClass({
  displayName: 'Forbidden',
  render () {
    return (
      <div className='container'>
        <div className='alert alert-warning'>
          <h1 className='page-header'>Acesso negado!</h1>
          <p>Você não tem permissão para acessar está página.</p>
        </div>
      </div>
    )
  }
})
