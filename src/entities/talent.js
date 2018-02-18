import _ from 'lodash'

import { Entity } from '_src/entities/entity'
import entityType from '_src/entities/types/entity-type'

export class FullTalent extends Entity {
  get entityType () {
    return entityType.TALENT
  }

  get name () {
    return `${this.firstNames || ''} ${this.lastName || ''}`.trim()
  }

  getInfoBarLabel () {
    return this.commonRole
  }

  get url () {
    throw new Error('url accessed')
  }

  get editUrl () {
    return `/talent/edit/${this.id}`
  }
}

export class SummaryTalent {
  constructor (entity) {
    _.extend(this, entity)
  }

  get entityTypeLabel () {
    return 'Talent'
  }

  get key () {
    return this.id
  }

  get name () {
    return `${this.firstNames || ''} ${this.lastName || ''}`.trim()
  }

  get hasImage () {
    return !!this.image
  }

  get url () {
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
