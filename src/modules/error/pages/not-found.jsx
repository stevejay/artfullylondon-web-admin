import React from 'react'

import Error from '../components/error'
import * as errorConstants from '../constants'

const NotFoundPage = () => <Error type={errorConstants.NOT_FOUND} />
export default NotFoundPage
