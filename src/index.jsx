import 'sanitize.css/sanitize.css'
import './reset.scss'
import './mixins.scss'
import './theme.scss'
import './typography.scss'
import './startup.scss'
import 'react-day-picker/lib/style.css'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route } from 'react-router-dom'
import smartOutline from 'smart-outline'

import history from '_src/history'
import store from '_src/store'
import Routes from '_src/routes'
import { fetchServerConstants } from '_src/actions/server-constants'

smartOutline.init()
store.dispatch(fetchServerConstants())

const root = (
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={Routes} />
    </Router>
  </Provider>
)

render(root, document.getElementById('react-root'))
