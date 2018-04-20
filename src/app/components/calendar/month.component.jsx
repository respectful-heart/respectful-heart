/* @flow */
import React from 'react'
import classnames from 'classnames'

import styles from './calendar.css'

const days: number[] = [1]
while (days.length < 31) {
  days[days.length] = days[days.length - 1] + 1
}

const weekdays = [ 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT' ]

type MonthProps = {
  appointmentDate?: Date,
  selectedDate?: Date,
  forDate: Date,
  onSelectDate: Function
}

export default (props: MonthProps) => {
  const getDateForDay = (date: Date, day: number) => {
    return new Date(date.getFullYear(), date.getMonth(), day)
  }

  const getStartDayIndex = (date: Date) => {
    return getDateForDay(date, 1).getDay()
  }

  const getLastDate = (date: Date) => {
    const lastDateCandidates = [ 31, 30, 29, 28 ]
    const dates = lastDateCandidates.map(day => getDateForDay(date, day))
    return lastDateCandidates[dates.findIndex(lastDate => lastDate.getMonth() === date.getMonth())]
  }

  const getWeekStartDates = (date: Date) => {
    const startDayIndex = getStartDayIndex(date)
    const lastDate = getLastDate(date)
    const startDates = [1 - startDayIndex]
    while (startDates[startDates.length - 1] < lastDate - 7) {
      startDates.push(startDates[startDates.length - 1] + 7)
    }
    return startDates
  }

  const getWeekDay = (date: Date, firstDay: number, index: number) => {
    let day = firstDay + index > 0 ? firstDay + index : ''
    if (typeof day === 'number' && day > getLastDate(date)) { day = '' }

    if (!day) {
      return <div key={index} className={styles.monthDayEmpty}>{day}</div>
    }

    const selected = getDateForDay(props.forDate, day).toDateString() ===
      (props.selectedDate && props.selectedDate.toDateString())
    const booked = getDateForDay(props.forDate, day).toDateString() ===
      (props.appointmentDate && props.appointmentDate.toDateString())
    const dayClasses: string = classnames(
      styles.monthDay,
      { [styles.monthDayBooked]: booked },
      { [styles.monthDaySelected]: selected }
    )

    if (day) {
      return (
        <button
          key={index}
          className={dayClasses}
          onClick={event => props.onSelectDate(event.target.value)}
          value={day}
        >
          {day}
        </button>
      )
    }
  }

  const getWeek = (date: Date, firstDay: number, weekIndex: number) => {
    return (
      <div key={weekIndex} className={styles.week}>
        {
          weekdays.map((day, index) => {
            return getWeekDay(date, firstDay, index)
          })
        }
      </div>
    )
  }

  const getWeeks = (date: Date) => {
    return getWeekStartDates(date).map((startDate, weekIndex) => getWeek(date, startDate, weekIndex))
  }

  return (
    <div>
      <div className={styles.week}>
        {weekdays.map((day, index) => <div key={index} className={styles.dayName}>{day}</div>)}
      </div>
      {getWeeks(props.forDate)}
    </div>
  )
}
