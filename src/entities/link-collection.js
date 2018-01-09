export class LinkCollection {
  constructor (links) {
    this.links = links
  }

  getLinkByType (linkType) {
    if (!this.links) {
      return null
    }

    const matches = this.links.filter(x => x.type === linkType)
    return matches.length ? matches[0] : null
  }
}
