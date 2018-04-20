/* @flow */
import type { Action } from 'actions'
import type { Appointment } from 'models'

export const ScheduleActionsEnum = {
  BOOK: 'BOOK'
}

export type ScheduleActionType = Action<typeof ScheduleActionsEnum, Appointment>

export function book (appointment: Appointment): ScheduleActionType {
  return {
    type: ScheduleActionsEnum.BOOK,
    payload: appointment
  }
}
