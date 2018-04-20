/* @flow */
import React, { Component } from 'react'

import Month from './month.component'
import Day from './day.component'

import styles from './calendar.css'

import type { Appointment } from 'models'

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

type CalendarProps = {
  appointment?: Appointment,
  book: Function
}

type CalendarState = {
  forMonth: Date,
  selectedDate?: Date
}

const monthIncrementor = (date: Date, next?: boolean) => {
  if (next) {
    return new Date(date.getFullYear(), date.getMonth() + 1, date.getDate())
  } else {
    return new Date(date.getFullYear(), date.getMonth() - 1, date.getDate())
  }
}

export default class Calendar extends Component<CalendarProps, CalendarState> {
  constructor (props: CalendarProps) {
    super(props)
    this.state = {
      forMonth: new Date()
    }
  }

  getHeader = () => {
    return `${monthNames[this.state.forMonth.getMonth()]} ${this.state.forMonth.getFullYear()}`
  }

  nextMonth = () => {
    this.setState({ forMonth: monthIncrementor(this.state.forMonth, true) })
  }

  prevMonth = () => {
    this.setState({ forMonth: monthIncrementor(this.state.forMonth) })
  }

  onSelectDate = (day: number) => {
    const selectedDate = new Date(this.state.forMonth.getFullYear(), this.state.forMonth.getMonth(), day)
    this.setState({ selectedDate })
  }

  onSelectAppt = (apptTime: string) => {
    const selectedAppt: Appointment = {
      date: this.state.selectedDate || new Date(),
      time: apptTime
    }
    this.props.book(selectedAppt)
  }

  render () {
    return (
      <div className={styles.calendar}>
        <div>
          <div className={styles.header}>
            <button onClick={this.prevMonth} className={styles.changeMonth}>&lt;</button>
            <div>{this.getHeader()}</div>
            <button onClick={this.nextMonth} className={styles.changeMonth}>&gt;</button>
          </div>
          <Month
            appointmentDate={this.props.appointment && this.props.appointment.date}
            forDate={this.state.forMonth}
            selectedDate={this.state.selectedDate}
            onSelectDate={this.onSelectDate}
          />
        </div>
        <Day
          date={this.state.selectedDate}
          selectedAppt={this.props.appointment}
          onSelectAppt={this.onSelectAppt}
        />
      </div>
    )
  }
}
