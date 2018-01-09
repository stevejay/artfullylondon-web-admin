import { ENTITY_TYPE_TAG } from '_src/constants/entity'

export class Tag {
  constructor (entity) {
    if (!entity) {
      throw new Error('null or undefined entity')
    }

    this.entity = entity
  }

  get entityType () {
    return ENTITY_TYPE_TAG
  }

  get id () {
    return this.entity.id
  }

  get key () {
    return this.id
  }

  get name () {
    return this.entity.name // TODO wrong?
  }

  isBeingWatched (watches) {
    return !!watches[this.id]
  }

  createWatchLabel () {
    return this.entity.label
  }

  createWatchChangeInstruction () {
    throw new Error('Not implemented')
  }
}
