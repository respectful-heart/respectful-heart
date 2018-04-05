/* @flow */
import React from 'react'
import { Link, withRouter } from 'react-router-dom'

import { getRoutes } from 'utils/router-config'
import styles from './nav-bar.css'

import type { ContextRouter } from 'react-router-dom'
import type { RouteModel } from 'models'

function NavBar ({ location }: ContextRouter) {
  const routes = getRoutes()
  const home = routes.shift()
  const login = routes.pop()

  function getHomeLink () {
    return <Link className='nav-brand' to={home.path}>
      <header className={`navbar-brand mr-sm-5`}>{home.name}</header>
    </Link>
  }

  function getCurrentRoute (): ?RouteModel {
    return getRoutes().find(route => route.path === location.pathname)
  }

  function getNavBarClasses () {
    let classes = 'navbar navbar-expand-sm navbar-dark'
    const currentRoute = getCurrentRoute
    if (currentRoute && currentRoute.clearNav) {
      classes += ' bg-dark'
    }
    return classes
  }

  function renderNavBarItems () {
    return routes.map(item => {
      return <li key={item.path} className='nav-item ml-sm-5'>
        <Link className='nav-link' to={item.path}>{item.name}</Link>
      </li>
    })
  }

  function getLoginLink () {
    return (
      <Link
        to={login.path}
        role='button'
        className={`btn btn-info ${styles.userMenu}`}
      >Log In</Link>
    )
  }

  return (
    <nav className={`${getNavBarClasses()} ${styles.navBarWrapper}`}>
      {getHomeLink()}
      <ul className={`navbar-nav`}>
        {renderNavBarItems()}
      </ul>
      {getLoginLink()}
    </nav>
  )
}

export default withRouter(NavBar)
