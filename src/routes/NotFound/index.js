import React from 'react'
import Error from '_admin/pages/error'

const NotFound = () => <Error statusCode={404} />

module.exports = {
  path: '*',
  component: NotFound
}
