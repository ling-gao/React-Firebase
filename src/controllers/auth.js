import { auth } from '../constants/firebase'
import firebase from 'firebase'
import { logoutAction } from '../actions/authAC'
import { message } from 'antd'

export function callFacebookLogin () {
  return function * (dispatch, getState) {
    const provider = new firebase.auth.FacebookAuthProvider()
    try {
      const authData = yield auth.signInWithPopup(provider)
      console.log('facebook login ok', authData)
    } catch (e) {
      console.log('facebook login error', e)
    }
  }
}

export function callGoogleLogin () {
  return function * (dispatch, getState) {
    const provider = new firebase.auth.GoogleAuthProvider()
    try {
      const authData = yield auth.signInWithPopup(provider)
      console.log('google login ok', authData)
    } catch (e) {
      console.log('google login error', e)
    }
  }
}


export function logout () {
  return function * (dispatch, getState) {
    try {
      yield auth.signOut()
      // dispatch(logoutAction())
    } catch (e) {
      console.log('signOut error', e)
    }
  }
}

export function signInByEmailPassword (values) {
  return function * (dispatch, getState) {
    try {
      console.log('signInByEmailPassword', values)
      try {
        yield auth.signInWithEmailAndPassword(values.email, values.password)
      } catch (error) {
        if (error) {
          switch (error.code) {
            case 'auth/invalid-email':
              console.log('The specified user account email is invalid.')
              message.error('The specified user account email is invalid.')
              break
            case 'auth/wrong-password':
              console.log('The specified user account password is incorrect.')
              message.error('The specified user account password is incorrect.')
              break
            case 'auth/user-not-found':
              console.log('The specified user account does not exist.')
              message.error('The specified user account does not exist.')
              break
            case 'auth/user-disabled':
              console.log('The specified user account is disabled.')
              message.error('The specified user account is disabled.')
              break
            default:
              console.log('Error logging user in:', error)
          }
        }
      }
    } catch (e) {
      console.error(e)
    }
  }
}

export function signUp (values) {
  return function * (dispatch, getState) {
    try {
      console.log('signUp with values', values)
      const userData = yield auth.createUserWithEmailAndPassword(values.signUpEmail, values.signUpPassword)
      console.log('Successfully created user account with uid:', userData.uid)
      yield auth.signInWithEmailAndPassword(values.signUpEmail, values.signUpPassword)
    } catch (error) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          console.log('This email is already in use.')
          message.error('This email is already in use.')
          break
        case 'auth/invalid-email':
          console.log('The specified email is not a valid email.')
          message.error('The specified email is not a valid email.')
          break
        case 'auth/operation-not-allowed':
          console.log('Operation is not allowed.')
          message.error('Operation is not allowed.')
          break
        case 'auth/weak-password':
          console.log('The specified password is not strong enough.')
          message.error('The specified password is not strong enough.')
          break
        default:
          console.log('SighUp error:', error)
          message.error(error.message)
      }
    }
  }
}
