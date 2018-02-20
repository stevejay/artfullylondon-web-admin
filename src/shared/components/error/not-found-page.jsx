import React from 'react'

import Error from './index'
import errorType from '_src/domain/types/error-type'

const NotFoundPage = () => <Error type={errorType.NOT_FOUND} />
export default NotFoundPage
