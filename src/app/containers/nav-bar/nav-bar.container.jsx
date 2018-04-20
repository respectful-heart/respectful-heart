/* @flow */
import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { getRoutes } from 'utils/router-config'
import styles from './nav-bar.css'

import type { ContextRouter } from 'react-router-dom'
import type { RouteModel, UsableRoute, UserModel } from 'models'
import type { State } from 'reducers'

type NavBarProps = ContextRouter & { user: UserModel }

class NavBar extends Component<NavBarProps> {
  routes: UsableRoute[]
  home: UsableRoute
  login: UsableRoute

  constructor (props: NavBarProps) {
    super(props)
    this.routes = getRoutes()
    this.home = this.routes.shift()
    this.login = this.routes.pop()
  }

  getHomeLink () {
    return <Link className='nav-brand' to={this.home.path}>
      <header className={`navbar-brand mr-sm-5`}>{this.home.name}</header>
    </Link>
  }

  getCurrentRoute (): ?RouteModel {
    return getRoutes().find(route => route.path === this.props.location.pathname)
  }

  getNavBarClasses () {
    return 'navbar navbar-light navbar-expand-sm'
  }

  renderNavBarItems () {
    return this.routes.map(item => {
      if (item.open || this.props.user) {
        return <li key={item.path} className='nav-item ml-sm-5'>
          <Link className='nav-link' to={item.path}>{item.name}</Link>
        </li>
      }
    })
  }

  getLoginLink () {
    return (
      <div className={styles.userMenu}>
        <Link
          to={this.login.getPath()}
          role='button'
          className={`btn btn-link`}
        >
          Sign In
        </Link>
        or
        <Link
          to={this.login.getPath({ new: 'new' })}
          role='button'
          className={`btn btn-link`}
        >
          Sign Up
        </Link>
      </div>
    )
  }

  getUserMenu () {
    if (this.props.user) {
      return (
        <button className={`btn btn-link ${styles.userMenu}`}>Sign Out</button>
      )
    } else {
      return this.getLoginLink()
    }
  }

  render () {
    return (
      <nav className={`${this.getNavBarClasses()} ${styles.navBarWrapper}`}>
        {this.getHomeLink()}
        <ul className={`navbar-nav`}>
          {this.renderNavBarItems()}
        </ul>
        {this.getUserMenu()}
      </nav>
    )
  }
}

const mapStateToProps = ({ user }: State): { user: UserModel } => {
  return { user }
}

export default withRouter(connect(mapStateToProps)(NavBar))
