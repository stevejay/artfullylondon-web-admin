import {
  FullTalent,
  SummaryTalent,
  EventSummaryTalent
} from '_src/entities/talent'
import * as entityLib from '_src/lib/entity'
import linkType from '_src/entities/link-type'

describe('SummaryTalent', () => {
  it('should construct an individual with an image', () => {
    const subject = new SummaryTalent({
      entityType: 'talent',
      status: 'Active',
      id: 'talent-id',
      lastName: 'Cracknell',
      talentType: 'Individual',
      commonRole: 'Actor',
      image: '0342826208934d90b801e055152f1d0f',
      imageCopyright: 'Tate Modern',
      imageRatio: 1.2,
      firstNames: 'Carrie'
    })

    expect(subject.entityType).toEqual('talent')
    expect(subject.id).toEqual('talent-id')
    expect(subject.key).toEqual('talent-id')
    expect(subject.firstNames).toEqual('Carrie')
    expect(subject.lastName).toEqual('Cracknell')
    expect(subject.name).toEqual('Carrie Cracknell')
    expect(subject.status).toEqual('Active')
    expect(subject.talentType).toEqual('Individual')
    expect(subject.commonRole).toEqual('Actor')
    expect(subject.image).toEqual('0342826208934d90b801e055152f1d0f')
    expect(subject.imageCopyright).toEqual('Tate Modern')
    expect(subject.imageRatio).toEqual(1.2)
    expect(subject.hasImage).toEqual(true)
    expect(subject.entityTypeLabel).toEqual('Talent')
    expect(subject.url).toEqual('/talent/talent-id')
  })

  it('should construct a group with no image', () => {
    const subject = new SummaryTalent({
      entityType: 'talent',
      status: 'Active',
      id: 'talent-id',
      lastName: 'Cracknell',
      talentType: 'Group',
      commonRole: 'Actor'
    })

    expect(subject.entityType).toEqual('talent')
    expect(subject.id).toEqual('talent-id')
    expect(subject.key).toEqual('talent-id')
    expect(subject.lastName).toEqual('Cracknell')
    expect(subject.name).toEqual('Cracknell')
    expect(subject.status).toEqual('Active')
    expect(subject.talentType).toEqual('Group')
    expect(subject.commonRole).toEqual('Actor')
    expect(subject.hasImage).toEqual(false)
    expect(subject.entityTypeLabel).toEqual('Talent')
    expect(subject.url).toEqual('/talent/talent-id')
  })
})

describe('EventSummaryTalent', () => {
  it('should construct an individual with an image', () => {
    const subject = new EventSummaryTalent({
      entityType: 'talent',
      status: 'Active',
      id: 'talent-id',
      lastName: 'Cracknell',
      talentType: 'Individual',
      commonRole: 'Actor',
      image: '0342826208934d90b801e055152f1d0f',
      imageCopyright: 'Tate Modern',
      imageRatio: 1.2,
      firstNames: 'Carrie'
    })

    expect(subject.entityType).toEqual('talent')
    expect(subject.id).toEqual('talent-id')
    expect(subject.key).toEqual('talent-id')
    expect(subject.firstNames).toEqual('Carrie')
    expect(subject.lastName).toEqual('Cracknell')
    expect(subject.name).toEqual('Carrie Cracknell')
    expect(subject.status).toEqual('Active')
    expect(subject.talentType).toEqual('Individual')
    expect(subject.commonRole).toEqual('Actor')
    expect(subject.image).toEqual('0342826208934d90b801e055152f1d0f')
    expect(subject.imageCopyright).toEqual('Tate Modern')
    expect(subject.imageRatio).toEqual(1.2)
    expect(subject.hasImage).toEqual(true)
    expect(subject.entityTypeLabel).toEqual('Talent')
    expect(subject.url).toEqual('/talent/talent-id')
  })

  it('should have correct createRolesString when has roles', () => {
    const subject = new EventSummaryTalent({ roles: ['A', 'B'] })
    expect(subject.createRolesString()).toBe('A / B')
  })

  it('should have correct createRolesString when has no roles', () => {
    const subject = new EventSummaryTalent({ roles: null })
    expect(subject.createRolesString()).toBe('')
  })

  it('should have correct hasCharacters when has characters', () => {
    const subject = new EventSummaryTalent({ characters: ['A', 'B'] })
    expect(subject.hasCharacters()).toBe(true)
  })

  it('should have correct hasCharacters when has no characters', () => {
    const subject = new EventSummaryTalent({ characters: null })
    expect(subject.hasCharacters()).toBe(false)
  })

  it('should have correct createCharactersString when has characters', () => {
    const subject = new EventSummaryTalent({ characters: ['A', 'B'] })
    expect(subject.createCharactersString()).toBe('A, B')
  })

  it('should have correct createCharactersString when has no characters', () => {
    const subject = new EventSummaryTalent({ characters: null })
    expect(subject.createCharactersString()).toBe('')
  })
})

describe('FullTalent', () => {
  it('should construct a full talent', () => {
    const subject = new FullTalent({
      status: 'Active',
      id: 'talent-id',
      firstNames: 'Carrie',
      lastName: 'Cracknell',
      talentType: 'Individual',
      commonRole: 'Actor',
      schemeVersion: 2,
      version: 3,
      createdDate: '2016/01/10',
      updatedDate: '2016/01/11',
      description: 'An actor.',
      descriptionCredit: 'Description credit',
      weSay: 'something',
      links: [{ type: 'Wikipedia', url: 'https://en.wikipedia.org/foo' }],
      images: [
        {
          id: '0342826208934d90b801e055152f1d0f',
          ratio: 1.2,
          copyright: 'Tate Modern'
        }
      ]
    })

    expect(subject.lastName).toEqual('Cracknell')
  })
})
