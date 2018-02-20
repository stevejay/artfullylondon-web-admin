import 'sanitize.css/sanitize.css'
import 'react-day-picker/lib/style.css'
import './scss/global.scss'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route } from 'react-router-dom'
import smartOutline from 'smart-outline'
import document from 'global/document'

import history from '_src/shared/lib/history'
import store from '_src/store'
import Routes from '_src/routes'

smartOutline.init()

export const root = (
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={Routes} />
    </Router>
  </Provider>
)

const reactRoot = document.getElementById('react-root')
reactRoot && render(root, reactRoot)
