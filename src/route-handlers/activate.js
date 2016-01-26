import {GET} from '@tetris/http'
import assign from 'lodash/assign'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import HTML from '../components/HTML'
import Root from '../components/Root'
import ActivationSuccess from '../components/ActivationSuccess'
import ActivationFailure from '../components/ActivationFailure'

const {USER_API_URL} = process.env

export default (req, res) =>
  GET(`${USER_API_URL}/activate/${req.params.activationCode}`)

    .then(() => res.send(ReactDOMServer.renderToStaticMarkup(
      <HTML>
      <Root>
        <ActivationSuccess/>
      </Root>
      </HTML>)))

    .catch(r => r.json()
      .then(response => res.status(r.status)
        .send(ReactDOMServer.renderToStaticMarkup(
          <HTML inject={{activationError: assign(r, response)}}>
          <Root>
            <ActivationFailure>
              {response.message}
            </ActivationFailure>
          </Root>
          </HTML>))))
