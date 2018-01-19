import * as entityConstants from '_src/constants/entity'

export class Tag {
  constructor (entity) {
    /* istanbul ignore if */
    if (!entity) {
      throw new Error('null or undefined entity')
    }

    this.entity = entity
  }

  get entityType () {
    return entityConstants.ENTITY_TYPE_TAG
  }

  get id () {
    return this.entity.id
  }

  get key () {
    return this.id
  }

  get name () {
    return this.entity.name // TODO is this wrong?
  }

  isBeingWatched (watches) {
    return !!watches[this.id]
  }

  createWatchLabel () {
    return this.entity.label
  }

  /* istanbul ignore next */
  createWatchChangeInstruction () {
    throw new Error('Not implemented')
  }
}
