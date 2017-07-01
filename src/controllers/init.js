import { browserHistory } from 'react-router'
import { auth } from '../constants/firebase'
import { authDataAction, logoutAction } from '../actions/authAC'

export function appInitialized () {
  return function * (dispatch, getState) {
    auth.onAuthStateChanged((authData) => {
      console.log('checkAuth', authData, browserHistory.getCurrentLocation())
      if (authData) {
        console.log('auth ok', authData)
        const user = {
          id: authData.uid,
          name: authData.displayName,
          email: authData.email
        }
    //    ref.child('users').child(authData.uid).update(user)
        dispatch(authDataAction(user))
        // co(initApps(dispatch, authData.uid))
        const location = browserHistory.getCurrentLocation()
        console.log('currentLocation', location)
        if (location.pathname === '/auth') {
          browserHistory.push('/profile')
        }
        // const state = getState()
        // if (state.authData.id !== authData.id) {
        //   browserHistory.push('/dashboard')
        // }
      } else {
        console.log('user is not authorized')
        dispatch(logoutAction())
        browserHistory.push('/auth')
      }
    })
  }
}
