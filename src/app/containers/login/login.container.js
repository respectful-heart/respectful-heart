/* @flow */
import React, { Component } from 'react'

import { connectRoute } from 'utils/router-config'
import styles from './login.css'

class Login extends Component<{}> {
  render () {
    return (
      <form className={styles.login}>
        <div className={styles.formGroup}>
          <label htmlFor='username-input'>Username</label>
          <input type='text' id='username-input' className='form-control' />
          <label htmlFor='password-input' className='mt-sm-3'>Password</label>
          <input type='text' id='password-input' className='form-control' />
        </div>
      </form>
    )
  }
}

const route = {
  name: 'Login',
  path: '/login',
  order: 2
}

export default connectRoute(route)(Login)
