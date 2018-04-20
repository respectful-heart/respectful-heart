/* @flow */
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { connectRoute } from 'utils/router-config'

import { book } from 'actions'
import Calendar from 'components/calendar'
import styles from './schedule.css'

import type { State } from 'reducers'
import type { RouteModel, UserModel, Appointment } from 'models'

type ScheduleState = {
  user?: UserModel,
  schedule?: Appointment,
}

type ScheduleProps = ScheduleState & {
  book: typeof book
}

class Schedule extends Component<ScheduleProps, ScheduleState> {
  constructor (props: ScheduleProps) {
    super(props)
    this.state = { selectedDate: new Date() }
  }

  getAppointmentBox = () => {
    if (!this.props.schedule) { return }
    const time = this.props.schedule.time
    const apptString = `${this.props.schedule.date.toDateString()} at ${time}`
    return <div className={styles.apptBox}>
      Your next appointment is on {apptString}.
    </div>
  }

  render () {
    if (!this.props.user) {
      return <Redirect to='/' />
    } else {
      return (
        <div>
          {this.getAppointmentBox()}
          <Calendar appointment={this.props.schedule} book={this.props.book} />
        </div>
      )
    }
  }
}

const mapStateToProps = ({ user, schedule }: State): ScheduleState => { return { user, schedule } }

const mapDispatchToProps = (dispatch: *) => {
  return bindActionCreators({ book }, dispatch)
}

const route: RouteModel = {
  name: 'Schedule',
  path: '/schedule',
  order: 5,
  open: false
}

export default connectRoute(route)(connect(mapStateToProps, mapDispatchToProps)(Schedule))
