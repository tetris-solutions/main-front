import {GET} from '@tetris/http'
import get from 'lodash/get'
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

    .catch(fetchResponse => res.status(fetchResponse.status)
        .send(ReactDOMServer.renderToStaticMarkup(
          <HTML inject={{activationError: {status: fetchResponse.status, message: get(fetchResponse, 'data.message')}}}>
          <Root>
            <ActivationFailure>
              {get(fetchResponse, 'data.message')}
            </ActivationFailure>
          </Root>
          </HTML>)))
