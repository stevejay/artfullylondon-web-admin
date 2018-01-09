import React from 'react'
import Error from '_src/pages/error'

const NotFound = () => <Error statusCode={404} />

module.exports = {
  path: '*',
  component: NotFound
}
