import React from 'react'
import * as timeLib from '_src/lib/time'
import './index.scss'

class CopyrightFooter extends React.Component {
  shouldComponentUpdate () {
    return false
  }
  render () {
    const year = timeLib.getYearNow()
    const copy = `\u00A9${year} Artfully London. All Rights Reserved.`
    return <div className='nocontent' styleName='container'>{copy}</div>
  }
}

export default CopyrightFooter
