import React from 'react'
import PropTypes from 'prop-types'
import {branch} from 'baobab-react/higher-order'
import map from 'lodash/map'

const appUrls = {
  AdPeek: process.env.ADPEEK_URL
}

export class CompanyApps extends React.Component {
  static displayName = 'Company-Apps'

  static propTypes = {
    apps: PropTypes.array,
    params: PropTypes.shape({
      company: PropTypes.string
    })
  }

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
}

export default branch((props, context) => ({
  apps: ['companies', props.params.company, 'apps']
}), CompanyApps)
