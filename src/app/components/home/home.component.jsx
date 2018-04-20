/* @flow */

import React from 'react'

import logo from 'images/logo-placeholder.jpg'
import { connectRoute } from 'utils/router-config'
import ReminderBox from 'containers/reminder-box/reminder-box.container'
import styles from './home.css'

import type { RouteModel } from 'models'

const reminderStyles = {
  position: 'absolute',
  bottom: '2rem',
  right: '2rem'
}
function Home () {
  return (
    <div className={styles.home}>
      <img src={logo} className={styles.logo} />
      <ReminderBox applyStyles={reminderStyles} />
    </div>
  )
}

const route: RouteModel = {
  name: 'Respectful Heart Counseling',
  path: '/',
  order: 0,
  open: true,
  clearNav: true,
  exact: true
}

export default connectRoute(route)(Home)
