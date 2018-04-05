/* @flow */
import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import type { Element, ComponentType } from 'react'
import type { RouteModel } from 'models'

type RouteableComponent<P> = ((props: P) => Element<string>) | Class<Component<P>>
type RouteConnector<P> = RouteableComponent<P> => ComponentType<P>
const routes: RouteModel[] = []

export function getRoutes (): RouteModel[] {
  return [...routes]
}

export function connectRoute<P> (route: RouteModel): RouteConnector<P> {
  routes[route.order] = route
  return (component: RouteableComponent<P>) => {
    return () => <Route exact path={route.path} component={component} key={route.path} />
  }
}
