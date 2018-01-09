import { SummaryTalent, FullTalent } from '_admin/entities/talent'

describe('SummaryTalent', () => {
  it('should have correct entityType', () => {
    const subject = new SummaryTalent({})
    expect(subject.entityType).toBe('talent')
  })

  it('should have correct entityTypeLabel', () => {
    const subject = new SummaryTalent({})
    expect(subject.entityTypeLabel).toBe('Talent')
  })

  it('should have correct id', () => {
    const subject = new SummaryTalent({ id: 'some-id' })
    expect(subject.id).toBe('some-id')
  })

  it('should have correct key', () => {
    const subject = new SummaryTalent({ id: 'some-id' })
    expect(subject.key).toBe('some-id')
  })

  it('should have correct status', () => {
    const subject = new SummaryTalent({ status: 'Active' })
    expect(subject.status).toBe('Active')
  })

  it('should have correct name for an individual', () => {
    const subject = new SummaryTalent({
      firstNames: 'Bob Arnold',
      lastName: 'Smith'
    })

    expect(subject.name).toBe('Bob Arnold Smith')
  })

  it('should have correct name for a group', () => {
    const subject = new SummaryTalent({
      firstNames: null,
      lastName: 'The Smiths'
    })

    expect(subject.name).toBe('The Smiths')
  })

  it('should have correct talentType', () => {
    const subject = new SummaryTalent({ talentType: 'Individual' })
    expect(subject.talentType).toBe('Individual')
  })

  it('should have correct commonRole', () => {
    const subject = new SummaryTalent({ commonRole: 'Actor' })
    expect(subject.commonRole).toBe('Actor')
  })

  it('should have correct image', () => {
    const subject = new SummaryTalent({ image: '123456' })
    expect(subject.image).toBe('123456')
  })

  it('should have correct imageCopyright', () => {
    const subject = new SummaryTalent({ imageCopyright: 'The copyright' })
    expect(subject.imageCopyright).toBe('The copyright')
  })

  it('should have correct imageRatio', () => {
    const subject = new SummaryTalent({ imageRatio: 2 })
    expect(subject.imageRatio).toBe(2)
  })

  it('should have correct hasImage when has image', () => {
    const subject = new SummaryTalent({ image: '123456' })
    expect(subject.hasImage).toBe(true)
  })

  it('should have correct hasImage when has no image', () => {
    const subject = new SummaryTalent({ image: null })
    expect(subject.hasImage).toBe(false)
  })

  it('should have correct url', () => {
    const subject = new SummaryTalent({ id: 'carrie-cracknell' })
    expect(subject.url).toBe('/talent/carrie-cracknell')
  })

  it('should have correct editUrl', () => {
    const subject = new SummaryTalent({ id: 'carrie-cracknell' })
    expect(subject.editUrl).toBe('/talent/edit/carrie-cracknell')
  })

  it('should have correct isFullEntity', () => {
    const subject = new SummaryTalent({})
    expect(subject.isFullEntity).toBe(false)
  })

  it('should have correct isBeingWatched when is being watched', () => {
    const watches = { 'carrie-cracknell': true }
    const subject = new SummaryTalent({ id: 'carrie-cracknell' })
    expect(subject.isBeingWatched(watches)).toBe(true)
  })

  it('should have correct isBeingWatched when is not being watched', () => {
    const watches = { 'carrie-cracknell': false }
    const subject = new SummaryTalent({ id: 'carrie-cracknell' })
    expect(subject.isBeingWatched(watches)).toBe(false)
  })

  it('should have correct createWatchLabel', () => {
    const subject = new SummaryTalent({
      firstNames: 'Bob Arnold',
      lastName: 'Smith',
      commonRole: 'Actor'
    })

    expect(subject.createWatchLabel()).toBe('Bob Arnold Smith (Actor)')
  })

  it('should have correct createWatchChangeInstruction when is being watched', () => {
    const subject = new SummaryTalent({})
    expect(subject.createWatchChangeInstruction(true)).toBe(
      'Unwatch this talent'
    )
  })

  it('should have correct createWatchChangeInstruction when is not being watched', () => {
    const subject = new SummaryTalent({})
    expect(subject.createWatchChangeInstruction(false)).toBe(
      'Watch this talent'
    )
  })

  it('should have correct createRolesString when has roles', () => {
    const subject = new SummaryTalent({ roles: ['A', 'B'] })
    expect(subject.createRolesString()).toBe('A / B')
  })

  it('should have correct createRolesString when has no roles', () => {
    const subject = new SummaryTalent({ roles: null })
    expect(subject.createRolesString()).toBe('')
  })

  it('should have correct hasCharacters when has characters', () => {
    const subject = new SummaryTalent({ characters: ['A', 'B'] })
    expect(subject.hasCharacters()).toBe(true)
  })

  it('should have correct createCharactersString when has no characters', () => {
    const subject = new SummaryTalent({ characters: [] })
    expect(subject.hasCharacters()).toBe(false)
  })

  it('should have correct createCharactersString when has characters', () => {
    const subject = new SummaryTalent({ characters: ['A', 'B'] })
    expect(subject.createCharactersString()).toBe('A, B')
  })

  it('should have correct createCharactersString when has no characters', () => {
    const subject = new SummaryTalent({ characters: [] })
    expect(subject.createCharactersString()).toBe('')
  })
})

describe('FullTalent', () => {
  it('should have correct images', () => {
    const subject = new FullTalent({ images: [{ id: 'some-id' }] })
    expect(subject.images).toEqual([{ id: 'some-id' }])
  })

  it('should have correct description', () => {
    const subject = new FullTalent({ description: 'Some description' })
    expect(subject.description).toBe('Some description')
  })

  it('should have correct descriptionCredit', () => {
    const subject = new FullTalent({
      descriptionCredit: 'Some description credit'
    })
    expect(subject.descriptionCredit).toBe('Some description credit')
  })

  it('should have correct weSay', () => {
    const subject = new FullTalent({ weSay: 'We say' })
    expect(subject.weSay).toBe('We say')
  })

  it('should have correct isFullEntity', () => {
    const subject = new FullTalent({})
    expect(subject.isFullEntity).toBe(true)
  })

  it('should have correct createInfoBarLabel', () => {
    const subject = new FullTalent({ commonRole: 'Actor' })
    expect(subject.createInfoBarLabel()).toBe('Actor')
  })
})
