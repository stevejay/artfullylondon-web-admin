import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import NoEntries from '_src/components/no-entries'
import './index.scss'

const ImageGrid = ({ children }) =>
  (_.isEmpty(children)
    ? <NoEntries />
    : <div styleName='container'>{children}</div>)

ImageGrid.propTypes = {
  children: PropTypes.any
}

export default ImageGrid
