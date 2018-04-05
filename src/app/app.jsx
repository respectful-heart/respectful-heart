/* @flow */
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import NavBar from 'components/nav-bar/nav-bar.component'
import Home from 'components/home/home.component'
import About from 'components/about/about.component'
import Login from 'containers/login/login.container'

import styles from './app.css'

export default function App () {
  return (
    <Router>
      <div className={styles.appRoot}>
        <NavBar />
        <Home />
        <About />
        <Login />
      </div>
    </Router>
  )
}
