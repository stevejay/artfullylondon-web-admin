import React from 'react'
import Envelope from 'react-icons/lib/fa/envelope-o'
import Instagram from 'react-icons/lib/fa/instagram'
import Twitter from 'react-icons/lib/fa/twitter'
import Facebook from 'react-icons/lib/fa/facebook'

import ShouldNeverUpdateComponent
  from '_src/components/base-class/should-never-update'
import * as linkConstants from '_src/constants/link'
import * as entitiesPropTypes from '_src/entities/prop-types'
import './external-links.scss'

class EntityExternalLinks extends ShouldNeverUpdateComponent {
  _createSocialLink (url, icon) {
    return (
      <a href={url} target='_blank' rel='noopener' styleName='link'>
        {React.createElement(icon, { className: 'icon' })}
      </a>
    )
  }
  render () {
    const { email, links } = this.props.entity

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

EntityExternalLinks.propTypes = {
  entity: entitiesPropTypes.EDITABLE_ENTITY.isRequired
}

export default EntityExternalLinks
