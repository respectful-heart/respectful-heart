/* @flow */

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from './app/app'

import store from './utils/store'

document.addEventListener('DOMContentLoaded', () => {
  const appContainer = document.getElementById('app_container')

  if (appContainer) {
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      appContainer
    )
  } else {
    console.error('Unable to find application root container element: app_container')
  }
})
