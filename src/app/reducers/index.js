/* @flow */

import { combineReducers } from 'redux'

import { userReducer } from './user.reducer'
import { scheduleReducer } from './schedule.reducer'

const reducers = {
  user: userReducer,
  schedule: scheduleReducer
}

type ExtractReturnType = <ReducerReturn>(v: (...args: any) => ReducerReturn) => ReducerReturn
export type State = $ObjMap<typeof reducers, ExtractReturnType>

const rootReducer = combineReducers(reducers)

export default rootReducer
