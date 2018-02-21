import _ from 'lodash'

export class Entity {
  constructor (entity) {
    _.extend(this, entity)
  }

  // TODO remove this shortly
  get key () {
    throw new Error('key accessed!')
  }

  isNew () {
    return !this.id
  }

  getLinkByType (type) {
    if (!this.links) {
      return null
    }

    const matches = this.links.filter(x => x.type === type)
    return matches.length ? matches[0] : null
  }

  createFormattedDescription () {
    if (!this.description) {
      return this.summary || '<p>We do not have a description.</p>'
    }

    let result = this.description

    if (this.descriptionCredit) {
      result =
        result +
        '<p><em>(Description by ' +
        _.escape(this.descriptionCredit) +
        '.)</em></p>'
    }

    return result
  }
}
