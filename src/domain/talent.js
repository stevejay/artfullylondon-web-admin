import _ from 'lodash'

import { Entity } from '_src/domain/entity'
import entityType from '_src/domain/types/entity-type'

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

  getEditUrl () {
    return `/talent/edit/${this.id}`
  }
}
