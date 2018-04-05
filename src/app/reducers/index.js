/* @flow */

import { combineReducers } from 'redux'

import { genericReducer } from './generic.reducer'

const reducers = {
  generic: genericReducer
}

type ExtractReturnType = <ReducerReturn>(v: (...args: any) => ReducerReturn) => ReducerReturn
export type State = $ObjMap<typeof reducers, ExtractReturnType>

const rootReducer = combineReducers(reducers)

export default rootReducer
