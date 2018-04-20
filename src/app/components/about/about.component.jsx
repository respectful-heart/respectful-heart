/* @flow */
import React from 'react'
import { connectRoute } from 'utils/router-config'

import type { RouteModel } from 'models'

const route: RouteModel = {
  name: 'About',
  path: '/about',
  order: 1,
  open: true
}

function About () {
  return (
    <div>
      About
    </div>
  )
}

export default connectRoute(route)(About)
