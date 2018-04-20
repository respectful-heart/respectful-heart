/* @flow */
import { UserActionsEnum } from 'actions'

import type { UserActionType } from 'actions'
import type { UserModel } from 'models'

type UserState = { user: UserModel } | null

export function userReducer (state: UserState = null, action: UserActionType) {
  if (UserActionsEnum[action.type]) {
    return action.payload
  }
  return state
}
