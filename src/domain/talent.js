import _ from 'lodash'

import { Entity } from '_src/domain/entity'
import entityType from '_src/domain/types/entity-type'

export class FullTalent extends Entity {
  get entityType () {
    return entityType.TALENT
  }

  get name () {
    return `${this.firstNames || ''} ${this.lastName}`.trim()
  }

  getInfoBarLabel () {
    return this.commonRole
  }

  // TODO remove when can
  getUrl () {
    throw new Error('url accessed')
  }

  getEditUrl () {
    return `/talent/edit/${this.id}`
  }
}

export class SummaryTalent {
  constructor (entity) {
    _.extend(this, entity)
  }

  get key () {
    return this.id
  }

  get name () {
    return `${this.firstNames || ''} ${this.lastName}`.trim()
  }

  getEntityTypeLabel () {
    return 'Talent'
  }

  hasImage () {
    return !!this.image
  }

  getUrl () {
    return `/talent/${this.id}`
  }
}

// TODO delete this info when not needed:
// talent.key = talent.id
// talent.roles = talent.roles.join(', ')
// talent.characters = (talent.characters || []).join(', ')

export class EventSummaryTalent extends SummaryTalent {
  createRolesString () {
    return (this.roles || []).join(' / ')
  }

  hasCharacters () {
    return !_.isEmpty(this.characters)
  }

  createCharactersString () {
    return (this.characters || []).join(', ')
  }
}
