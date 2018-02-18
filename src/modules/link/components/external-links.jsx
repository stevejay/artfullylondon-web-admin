import React from 'react'
import Envelope from 'react-icons/lib/fa/envelope-o'
import Instagram from 'react-icons/lib/fa/instagram'
import Twitter from 'react-icons/lib/fa/twitter'
import Facebook from 'react-icons/lib/fa/facebook'

import linkType from '_src/entities/link-type'
import * as entitiesPropTypes from '_src/entities/prop-types'
import EntityExternalLink from './external-link'
import './external-links.scss'

class EntityExternalLinks extends React.PureComponent {
  render () {
    const { entity } = this.props
    const { email } = entity

    const facebook = entity.getLinkByType(linkType.FACEBOOK)
    const twitter = entity.getLinkByType(linkType.TWITTER)
    const instagram = entity.getLinkByType(linkType.INSTAGRAM)
    const hasNoLinks = !email && !facebook && !twitter && !instagram

    if (hasNoLinks) {
      return null
    }

    return (
      <section styleName='links-container'>
        {!!email &&
          <EntityExternalLink url={`mailto:${email}`} icon={Envelope} />}
        {!!facebook &&
          <EntityExternalLink url={facebook.url} icon={Facebook} />}
        {!!twitter && <EntityExternalLink url={twitter.url} icon={Twitter} />}
        {!!instagram &&
          <EntityExternalLink url={instagram.url} icon={Instagram} />}
      </section>
    )
  }
}

EntityExternalLinks.propTypes = {
  entity: entitiesPropTypes.EDITABLE_ENTITY.isRequired
}

export default EntityExternalLinks
