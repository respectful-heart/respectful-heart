/* @flow */
import React from 'react'

import { connectRoute } from 'utils/router-config'

import type { RouteModel } from 'models'

const route: RouteModel = {
  name: 'About',
  path: '/about',
  order: 1
}

function About () {
  return <main style={{ marginTop: '100px' }}>About</main>
}

export default connectRoute(route)(About)
