import React from 'react'

import ShouldNeverUpdateComponent
  from '_src/components/base-class/should-never-update'
import linkType from '_src/domain/types/link-type'
import * as entitiesPropTypes from '_src/domain/prop-types'
import './description.scss'

class EntityDescription extends ShouldNeverUpdateComponent {
  render () {
    const { entity } = this.props
    const wikipediaLink = entity.getLinkByType(linkType.WIKIPEDIA)
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
