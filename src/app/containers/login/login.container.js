/* @flow */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { connectRoute } from 'utils/router-config'

import styles from './login.css'
import { signIn, signUp, book } from 'actions'

import type { ContextRouter } from 'react-router-dom'
import type { State } from 'reducers'

type Props = ContextRouter & {
  signIn: typeof signIn,
  signUp: typeof signUp,
  book: typeof book
}

type LoginState = {
  username?: string,
  password?: string,
  phoneNumber?: string
}

class Login extends Component<Props, LoginState> {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      phoneNumber: ''
    }
  }

  handleChange = (event: Object) => {
    this.setState({ [event.target.id]: event.target.value })
  }

  signIn = (event) => {
    event.preventDefault()
    this.props.signIn({
      username: this.state.username,
      password: this.state.password,
      phoneNumber: this.state.phoneNumber
    })
    this.props.book({
      date: new Date(),
      time: '1PM - 2PM'
    })
    this.props.history.push('/')
  }

  render () {
    let newClient = this.props.match.params.new
    return (
      <form
        className={styles.login}
        onSubmit={this.signIn}
      >
        <div className={styles.formGroup}>

          <label htmlFor='username'>Username</label>
          <input
            type='text'
            id='username'
            className='form-control'
            value={this.state.username}
            onChange={this.handleChange}
          />

          <label htmlFor='password' className='mt-sm-3'>Password</label>
          <input
            type='password'
            id='password'
            className='form-control'
            value={this.state.password}
            onChange={this.handleChange}
          />

          <label htmlFor='phone' className='mt-sm-3'>Phone Number</label>
          <input
            type='text'
            id='phoneNumber'
            className='form-control'
            value={this.state.phoneNumber}
            onChange={this.handleChange}
          />

          <button
            type='submit'
            className='btn btn-dark mt-sm-3'
          >
            Sign { newClient ? 'Up' : 'In'}
          </button>
        </div>
      </form>
    )
  }
}

const route = {
  name: 'Sign In',
  path: '/sign-in/:new?',
  order: 'last',
  open: true
}

const mapStateToProps = (state: State) => {
  return { user: state.user }
}

const mapDispatchToProps = (dispatch: *) => {
  return bindActionCreators({ signIn, signUp, book }, dispatch)
}

export default connectRoute(route)(connect(mapStateToProps, mapDispatchToProps)(Login))
