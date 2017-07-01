import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { appInitialized } from './controllers/init'
import configureStore from './store/configureStore'
import Calendar from './pages/Calendar'
import { LocaleProvider } from 'antd'
import enUS from 'antd/lib/locale-provider/en_US'
import Profile from './pages/Profile'
import Auth from './pages/Auth'
import 'antd/dist/antd.css'
import './index.css'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <LocaleProvider locale={enUS}>
      <Router history={browserHistory}>
        <Route path={'/auth'} component={Auth} />
        <Route path={'/calendar'} component={Calendar} />
        <Route path={'/profile'} component={Profile} />
      </Router>
    </LocaleProvider>
  </Provider>,
  document.getElementById('root')
)

store.dispatch(appInitialized())
