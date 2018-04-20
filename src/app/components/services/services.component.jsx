/* @flow */
import React from 'react'

import { connectRoute } from 'utils/router-config'

import type { RouteModel } from 'models'

const route: RouteModel = {
  name: 'Services',
  path: '/services',
  order: 2,
  open: true
}

function Services () {
  return <div>Services</div>
}

export default connectRoute(route)(Services)
