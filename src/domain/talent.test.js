import {
  FullTalent,
  SummaryTalent,
  EventSummaryTalent
} from '_src/domain/talent'
import entityType from '_src/domain/types/entity-type'
import linkType from '_src/domain/types/link-type'
import talentType from '_src/domain/types/talent-type'
import statusType from '_src/domain/types/status-type'

describe('SummaryTalent', () => {
  let entity = null

  beforeEach(() => {
    entity = {
      entityType: entityType.TALENT,
      status: statusType.ACTIVE,
      id: 'talent-id',
      lastName: 'Cracknell',
      talentType: talentType.INDIVIDUAL,
      commonRole: 'Actor',
      image: '0342826208934d90b801e055152f1d0f',
      imageCopyright: 'Tate Modern',
      imageRatio: 1.2,
      firstNames: 'Carrie'
    }
  })

  it('should get the key', () => {
    const subject = new SummaryTalent(entity)
    expect(subject.key).toEqual('talent-id')
  })

  describe('name', () => {
    it('should get the name for an individual', () => {
      entity.talentType = talentType.INDIVIDUAL
      entity.firstNames = 'Carrie Jane'
      entity.lastName = 'Cracknell'

      const subject = new SummaryTalent(entity)

      expect(subject.name).toEqual('Carrie Jane Cracknell')
    })

    it('should get the name for a group', () => {
      entity.talentType = talentType.GROUP
      entity.firstNames = null
      entity.lastName = 'Cracknell'

      const subject = new SummaryTalent(entity)

      expect(subject.name).toEqual('Cracknell')
    })
  })

  it('should handle getEntityTypeLabel', () => {
    const subject = new SummaryTalent(entity)
    expect(subject.getEntityTypeLabel()).toEqual('Talent')
  })

  describe('hasImage', () => {
    it('should handle having an image', () => {
      entity.image = '12345678123456781234567812345678'
      const subject = new SummaryTalent(entity)
      expect(subject.hasImage()).toEqual(true)
    })

    it('should handle having no image', () => {
      entity.image = null
      const subject = new SummaryTalent(entity)
      expect(subject.hasImage()).toEqual(false)
    })
  })

  it('should handle getUrl', () => {
    const subject = new SummaryTalent(entity)
    expect(subject.getUrl()).toEqual('/talent/talent-id')
  })
})

describe('EventSummaryTalent', () => {
  let entity = null

  beforeEach(() => {
    entity = {
      entityType: entityType.TALENT,
      status: statusType.ACTIVE,
      id: 'talent-id',
      lastName: 'Cracknell',
      talentType: talentType.INDIVIDUAL,
      commonRole: 'Actor',
      image: '0342826208934d90b801e055152f1d0f',
      imageCopyright: 'Tate Modern',
      imageRatio: 1.2,
      firstNames: 'Carrie'
    }
  })

  describe('createRolesString', () => {
    it('should handle roles', () => {
      entity.roles = ['Actor', 'Director']
      const subject = new EventSummaryTalent(entity)
      expect(subject.createRolesString()).toEqual('Actor / Director')
    })

    it('should handle no roles', () => {
      entity.roles = null
      const subject = new EventSummaryTalent(entity)
      expect(subject.createRolesString()).toEqual('')
    })
  })

  describe('hasCharacters', () => {
    it('should handle characters', () => {
      entity.characters = ['Foo', 'Bar']
      const subject = new EventSummaryTalent(entity)
      expect(subject.hasCharacters()).toEqual(true)
    })

    it('should handle no characters', () => {
      entity.characters = null
      const subject = new EventSummaryTalent(entity)
      expect(subject.hasCharacters()).toEqual(false)
    })
  })

  describe('createCharactersString', () => {
    it('should handle characters', () => {
      entity.characters = ['Foo', 'Bar']
      const subject = new EventSummaryTalent(entity)
      expect(subject.createCharactersString()).toEqual('Foo, Bar')
    })

    it('should handle no characters', () => {
      entity.characters = null
      const subject = new EventSummaryTalent(entity)
      expect(subject.createCharactersString()).toEqual('')
    })
  })
})

describe('FullTalent', () => {
  let entity = null

  beforeEach(() => {
    entity = {
      status: statusType.ACTIVE,
      id: 'talent-id',
      firstNames: 'Carrie',
      lastName: 'Cracknell',
      talentType: talentType.INDIVIDUAL,
      commonRole: 'Actor',
      schemeVersion: 2,
      version: 3,
      createdDate: '2016/01/10',
      updatedDate: '2016/01/11',
      description: 'An actor.',
      descriptionCredit: 'Description credit',
      weSay: 'something',
      links: [
        { type: linkType.WIKIPEDIA, url: 'https://en.wikipedia.org/foo' }
      ],
      images: [
        {
          id: '0342826208934d90b801e055152f1d0f',
          ratio: 1.2,
          copyright: 'Tate Modern'
        }
      ]
    }
  })

  it('should handle entityType', () => {
    const subject = new FullTalent(entity)
    expect(subject.entityType).toEqual(entityType.TALENT)
  })

  describe('name', () => {
    it('should get the name for an individual', () => {
      entity.talentType = talentType.INDIVIDUAL
      entity.firstNames = 'Carrie Jane'
      entity.lastName = 'Cracknell'

      const subject = new FullTalent(entity)

      expect(subject.name).toEqual('Carrie Jane Cracknell')
    })

    it('should get the name for a group', () => {
      entity.talentType = talentType.GROUP
      entity.firstNames = null
      entity.lastName = 'Cracknell'

      const subject = new FullTalent(entity)

      expect(subject.name).toEqual('Cracknell')
    })
  })

  it('should handle getInfoBarLabel', () => {
    const subject = new FullTalent(entity)
    expect(subject.getInfoBarLabel()).toEqual('Actor')
  })

  it('should handle getEditUrl', () => {
    const subject = new FullTalent(entity)
    expect(subject.getEditUrl()).toEqual('/talent/edit/talent-id')
  })
})
