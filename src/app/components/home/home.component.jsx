/* @flow */

import React from 'react'

import logo from 'images/amanda_logo_proto_plain.svg'
import { connectRoute } from 'utils/router-config'

import type { RouteModel } from 'models'

import styles from './home.css'

function Home () {
  return (
    <main className={`text-light ${styles.home}`}>
      <div className={styles.background} />
      <div className={styles.contentWrapper}>
        <img src={logo} className={styles.logo} />
      </div>
    </main>
  )
}

const route: RouteModel = {
  name: 'Respectful Heart Counseling',
  path: '/',
  order: 0,
  clearNav: true
}

export default connectRoute(route)(Home)
