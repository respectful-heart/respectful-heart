/* @flow */
export type Action<U, V> = {
  type: $Keys<U>,
  payload: V
}

export type { UserActionType } from './user.actions'
export { UserActionsEnum, signUp, signIn } from './user.actions'
export type { ScheduleActionType } from './schedule.actions'
export { ScheduleActionsEnum, book } from './schedule.actions'
