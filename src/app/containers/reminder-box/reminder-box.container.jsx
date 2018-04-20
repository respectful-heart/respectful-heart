/* @flow */
import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from './reminder-box.css'

import type { State } from 'reducers'
import type { Appointment } from 'models'

type ReminderBoxState = {
  schedule?: Appointment
}

type ReminderBoxProps = ReminderBoxState & {
  applyStyles?: Object,
  applyClasses?: string
}

class ReminderBox extends Component<ReminderBoxProps> {
  getAppointmentBox = () => {
    if (!this.props.schedule) { return }
    const time = this.props.schedule.time
    const apptString = `${this.props.schedule.date.toDateString()} at ${time}`
    return <div className={styles.reminderBox}>
      Welcome back, User! Your next appointment is on {apptString}.
    </div>
  }

  render () {
    return (
      <div className={this.props.applyClasses} style={this.props.applyStyles}>
        {this.getAppointmentBox()}
      </div>
    )
  }
}

const mapStateToProps = ({ schedule }: State): ReminderBoxState => {
  return { schedule }
}

export default connect(mapStateToProps)(ReminderBox)
