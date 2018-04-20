/* @flow */
import React from 'react'
import classnames from 'classnames'

import styles from './calendar.css'

import type { Appointment } from 'models'

const appts = [
  '9AM - 10AM',
  '10AM- 11AM',
  '11AM - 12PM',
  '1PM - 2PM',
  '2PM - 3PM',
  '3PM - 4PM'
]
const apptAvailable = appts.map(appt => Math.random() > 0.5)

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

type DayProps = {
  date?: Date,
  selectedAppt?: Appointment,
  onSelectAppt: Function
}

export default (props: DayProps) => {
  const getHeader = (date: Date) => {
    return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
  }

  const isSelectedAppt = (appt) => {
    return props.selectedAppt &&
      props.selectedAppt.date.toDateString() === (props.date && props.date.toDateString()) &&
      appt === props.selectedAppt.time
  }

  const getAppts = () => {
    return appts.map((appt, index) => {
      const apptClass: string = classnames(
        styles.appt,
        styles.apptOpen,
        { [styles.apptSelected]: isSelectedAppt(appt) }
      )
      if (apptAvailable[index]) {
        return <button
          key={index}
          className={apptClass}
          value={appt}
          onClick={() => props.onSelectAppt(appt)}
        >
          {appt}
        </button>
      } else {
        return <div key={index} className={styles.appt}>{appt}</div>
      }
    })
  }

  const getContent = (date?: Date) => {
    if (props.date) {
      return <div>
        <div className={styles.dateString}>
          {getHeader(props.date)}
        </div>
        <div>{getAppts()}</div>
      </div>
    }
  }

  return (
    <div className={styles.day}>
      {getContent(props.date)}
    </div>
  )
}
