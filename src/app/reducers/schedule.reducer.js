/* @flow */
import { ScheduleActionsEnum } from 'actions'

import type { ScheduleActionType } from 'actions'
import type { Appointment } from 'models'

type ScheduleStateType = { schedule: Appointment } | null

export function scheduleReducer (state: ScheduleStateType = null, action: ScheduleActionType) {
  if (ScheduleActionsEnum[action.type]) {
    return action.payload
  }
  return state
}
