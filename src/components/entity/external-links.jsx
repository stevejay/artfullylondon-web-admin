import React from 'react'
import PropTypes from 'prop-types'
import Envelope from 'react-icons/lib/fa/envelope-o'
import Instagram from 'react-icons/lib/fa/instagram'
import Twitter from 'react-icons/lib/fa/twitter'
import Facebook from 'react-icons/lib/fa/facebook'

import * as linkConstants from '_src/constants/link'
import './external-links.scss'

class ExternalLinks extends React.Component {
  shouldComponentUpdate () {
    return false
  }
  _createSocialLink (url, icon) {
    return (
      <a href={url} target='_blank' rel='noopener' styleName='link'>
        {React.createElement(icon, { styleName: 'icon' })}
      </a>
    )
  }
  render () {
    const { email, links } = this.props

    const facebook = links.getLinkByType(linkConstants.LINK_TYPE_FACEBOOK)
    const twitter = links.getLinkByType(linkConstants.LINK_TYPE_TWITTER)
    const instagram = links.getLinkByType(linkConstants.LINK_TYPE_INSTAGRAM)
    const hasNoLinks = !email && !facebook && !twitter && !instagram

    if (hasNoLinks) {
      return null
    }

    return (
      <div styleName='links-container'>
        {!!email && this._createSocialLink('mailto:' + email, Envelope)}
        {!!facebook && this._createSocialLink(facebook.url, Facebook)}
        {!!twitter && this._createSocialLink(twitter.url, Twitter)}
        {!!instagram && this._createSocialLink(instagram.url, Instagram)}
      </div>
    )
  }
}

ExternalLinks.propTypes = {
  email: PropTypes.string,
  links: PropTypes.object.isRequired
}

export default ExternalLinks
