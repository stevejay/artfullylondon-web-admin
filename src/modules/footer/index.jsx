import React from 'react'

import './index.scss'

class Footer extends React.Component {
  shouldComponentUpdate () {
    return false
  }
  render () {
    return (
      <ul role='presentation' styleName='item-container'>
        <li styleName='item'>
          © {new Date().getFullYear()} Middle Engine Software Ltd
        </li>
        <li styleName='item'>Version {process.env.WEBSITE_VERSION}</li>
      </ul>
    )
  }
}

export default Footer
