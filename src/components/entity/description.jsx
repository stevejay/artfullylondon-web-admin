import React from 'react'

import * as linkConstants from '_src/constants/link'
import * as entitiesPropTypes from '_src/entities/prop-types'
import './description.scss'

class EntityDescription extends React.Component {
  shouldComponentUpdate () {
    return false
  }
  render () {
    const { entity } = this.props

    const wikipediaLink = entity.getLinkByType(
      linkConstants.LINK_TYPE_WIKIPEDIA
    )

    const resultHtml = entity.createFormattedDescription()

    return (
      <div styleName='container'>
        <div
          styleName='html'
          dangerouslySetInnerHTML={{ __html: resultHtml }}
        />
        {!!wikipediaLink &&
          <a
            styleName='link'
            href={wikipediaLink.url}
            target='_blank'
            rel='noopener'
          >
            Read more on Wikipedia
          </a>}
      </div>
    )
  }
}

EntityDescription.propTypes = {
  entity: entitiesPropTypes.EDITABLE_ENTITY.isRequired
}

export default EntityDescription
