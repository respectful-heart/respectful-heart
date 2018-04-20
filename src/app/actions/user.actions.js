/* @flow */
import type { Action } from 'actions'
import type { UserModel } from 'models'

export const UserActionsEnum = {
  SIGN_UP: 'SIGN_UP',
  SIGN_IN: 'SIGN_IN'
}

export type UserActionType = Action<typeof UserActionsEnum, UserModel>

export function signUp (user: UserModel): UserActionType {
  return {
    type: UserActionsEnum.SIGN_UP,
    payload: user
  }
}

export function signIn (user: UserModel): UserActionType {
  return {
    type: UserActionsEnum.SIGN_IN,
    payload: user
  }
}
