import React from 'react'

import Error from '_src/components/error'
import * as errorConstants from '_src/constants/error'

const NotFoundPage = () => <Error type={errorConstants.NOT_FOUND} />
export default NotFoundPage
