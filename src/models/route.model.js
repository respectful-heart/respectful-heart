/* @flow */

export type PathGetter = (pathParams?: Object) => string

export type RouteModel = {
  name: string,
  path: string,
  order: number|'last',
  open?: boolean,
  getPath?: PathGetter,
  clearNav?: boolean,
  exact?: boolean
}

export type UsableRoute = RouteModel & { getPath: PathGetter }
