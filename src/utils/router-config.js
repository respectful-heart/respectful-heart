/* @flow */
import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import type { Element } from 'react'
import type { PathGetter, RouteModel, UsableRoute } from 'models'
type RouteableComponent<P> = ((props: P) => Element<string>) | Class<Component<P>>

const routes: UsableRoute[] = []
let lastRoute: UsableRoute

function getPathFactory (path: string): PathGetter {
  return (pathParams: { [string]: string } = {}) => {
    return path.replace(/:([a-zA-Z0-9_]+)/g, (match, param: string) => {
      return pathParams[param] || ''
    })
  }
}

export function getRoutes (): UsableRoute[] {
  return [...routes].concat(lastRoute)
}

export function connectRoute (route: RouteModel) {
  route.getPath = getPathFactory(route.path)
  if (route.order === 'last') {
    lastRoute = ((route: any): UsableRoute)
  } else {
    routes[route.order] = ((route: any): UsableRoute)
  }
  return <P>(component: RouteableComponent<P>) => {
    return () => <Route exact path={route.path} component={component} key={route.path} />
  }
}

/*
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect, withRouter } from 'react-router-dom'

import type { Element } from 'react'
import type { State } from 'reducers'
import type { PathGetter, RouteModel, UsableRoute, UserModel } from 'models'
type RouteableComponent<P> = ((props: P) => Element<string>) | Class<Component<P>>
type RouteConnectorProps = {
  user: UserModel
}

const routes: UsableRoute[] = []
let lastRoute: UsableRoute

function getPathFactory (path: string): PathGetter {
  return (pathParams: { [string]: string } = {}) => {
    return path.replace(/:([a-zA-Z0-9_]+)/g, (match, param: string) => {
      return pathParams[param] || ''
    })
  }
}

function routeConnectorClassFactory<P> (route: RouteModel, component: RouteableComponent<P>) {
  const TargetComponent = component
  class RouteConnector extends Component<RouteConnectorProps> {
    route: RouteModel

    constructor (props: RouteConnectorProps) {
      super(props)
      this.route = route
    }

    routeRender = () => {
      if (!this.route.open) {
        return <Redirect to={{ pathname: '/' }} />
      } else {
        return <TargetComponent />
      }
    }

    render () {
      return (
        <Route exact path={route.path} render={this.routeRender} key={route.path} />
      )
    }
  }

  function mapStateToProps ({ user }: State): RouteConnectorProps {
    return { user }
  }

  return withRouter(connect(mapStateToProps)(RouteConnector))
  // return () => <Route exact path={route.path} component={component} key={route.path} />
}

export function getRoutes (): UsableRoute[] {
  return [...routes].concat(lastRoute)
}

export function connectRoute (route: RouteModel) {
  route.getPath = getPathFactory(route.path)
  if (route.order === 'last') {
    lastRoute = ((route: any): UsableRoute)
  } else {
    routes[route.order] = ((route: any): UsableRoute)
  }
  return <P>(component: RouteableComponent<P>) => routeConnectorClassFactory(route, component)
}
*/
