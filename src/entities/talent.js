import _ from 'lodash'

import { LinkCollection } from '_src/entities/link-collection'
import * as entityConstants from '_src/constants/entity'
import * as entityLib from '_src/lib/entity'
import * as talentLib from '_src/lib/talent'

export class SummaryTalent {
  constructor (entity) {
    /* istanbul ignore if */
    if (!entity) {
      throw new Error('null or undefined entity')
    }

    this.entity = entity
  }

  get entityType () {
    return entityConstants.ENTITY_TYPE_TALENT
  }

  get entityTypeLabel () {
    return 'Talent'
  }

  get id () {
    return this.entity.id
  }

  get key () {
    return this.id
  }

  get status () {
    return this.entity.status
  }

  get name () {
    return talentLib.formatTalentName(this.entity)
  }

  get talentType () {
    return this.entity.talentType
  }

  get commonRole () {
    return this.entity.commonRole
  }

  get image () {
    return this.entity.image
  }

  get imageCopyright () {
    return this.entity.imageCopyright
  }

  get imageRatio () {
    return this.entity.imageRatio
  }

  get hasImage () {
    return !!this.image
  }

  get url () {
    return entityLib.createEntityUrl(this.entityType, this.id)
  }

  get editUrl () {
    return entityLib.createEntityEditUrl(this.entityType, this.id)
  }

  get isFullEntity () {
    return false
  }

  isBeingWatched (watches) {
    return !!watches[this.id]
  }

  createWatchLabel () {
    return `${this.name} (${this.commonRole})`
  }

  createWatchChangeInstruction (isBeingWatched) {
    const prefix = isBeingWatched ? 'Unwatch' : 'Watch'
    return prefix + ' this talent'
  }

  createRolesString () {
    return this.entity.roles ? this.entity.roles.join(' / ') : ''
  }

  hasCharacters () {
    return !_.isEmpty(this.entity.characters)
  }

  createCharactersString () {
    return this.entity.characters ? this.entity.characters.join(', ') : ''
  }
}

export class FullTalent extends SummaryTalent {
  constructor (entity) {
    super(entity)
    this.links = new LinkCollection(entity.links)
  }

  get images () {
    return this.entity.images
  }

  get description () {
    return this.entity.description
  }

  get descriptionCredit () {
    return this.entity.descriptionCredit
  }

  get weSay () {
    return this.entity.weSay
  }

  get isFullEntity () {
    return true
  }

  createInfoBarLabel () {
    return this.entity.commonRole
  }

  createFormattedDescription () {
    return entityLib.processDescription(
      this.entity.description,
      this.entity.descriptionCredit
    )
  }

  getLinkByType (linkType) {
    return this.links.getLinkByType(linkType)
  }
}
