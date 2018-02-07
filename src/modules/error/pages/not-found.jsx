import React from 'react'

import Error from '_src/modules/error/components/error'
import * as errorConstants from '_src/modules/error/constants'

const NotFoundPage = () => <Error type={errorConstants.NOT_FOUND} />
export default NotFoundPage
