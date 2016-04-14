import React from 'react'
import {branch} from 'baobab-react/dist-modules/higher-order'
import map from 'lodash/map'

const appUrls = {
  AdPeek: process.env.ADPEEK_URL
}

const {PropTypes} = React

export const CompanyApps = React.createClass({
  displayName: 'Company-Apps',
  propTypes: {
    apps: PropTypes.array
  },
  render () {
    return (
      <ul>
        {map(this.props.apps, ({id, name}, index) => (
          <li key={index}>
            <a target='_blank' href={appUrls[id]}>{name}</a>
          </li>
        ))}
      </ul>
    )
  }
})

export default branch((props, context) => ({
  apps: ['companies', props.params.company, 'apps']
}), CompanyApps)
