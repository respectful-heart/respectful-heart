/* @flow */
import React from 'react'

import { connectRoute } from 'utils/router-config'

import type { RouteModel } from 'models'

const route: RouteModel = {
  name: 'Contact',
  path: '/contact',
  order: 3,
  open: true
}

function Contact () {
  return <div>Contact</div>
}

export default connectRoute(route)(Contact)
