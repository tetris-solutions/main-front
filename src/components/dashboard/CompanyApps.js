import React from 'react'
import {branch} from 'baobab-react/higher-order'
import map from 'lodash/map'

const appUrls = {
  AdPeek: process.env.ADPEEK_URL
}

const {PropTypes} = React

export const CompanyApps = React.createClass({
  displayName: 'Company-Apps',
  propTypes: {
    apps: PropTypes.array,
    params: PropTypes.shape({
      company: PropTypes.string
    })
  },
  render () {
    const {apps, params: {company}} = this.props
    return (
      <ul>
        {map(apps, ({id, name}, index) => (
          <li key={index}>
            <a target='_blank' href={`${appUrls[id]}/company/${company}`}>
              {name}
            </a>
          </li>
        ))}
      </ul>
    )
  }
})

export default branch((props, context) => ({
  apps: ['companies', props.params.company, 'apps']
}), CompanyApps)
