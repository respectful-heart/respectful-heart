/* @flow */
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import NavBar from 'containers/nav-bar/nav-bar.container'
import Home from 'components/home/home.component'
import About from 'components/about/about.component'
import Services from 'components/services/services.component'
import Contact from 'components/contact/contact.component'
import Schedule from 'containers/schedule/schedule.container'
import Login from 'containers/login/login.container'

import styles from './app.css'

const mainStyle = {
  width: '95%',
  maxWidth: '1000px',
  margin: '10rem auto 0'

}

export default function App () {
  return (
    <Router>
      <div className={styles.appRoot}>
        <NavBar />
        <main style={mainStyle}>
          <Home />
          <About />
          <Services />
          <Contact />
          <Schedule />
          <Login />
        </main>
      </div>
    </Router>
  )
}
