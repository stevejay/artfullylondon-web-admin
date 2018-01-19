import { SummaryVenue, FullVenue } from '_src/entities/venue'
import * as linkConstants from '_src/constants/link'
import * as entityConstants from '_src/constants/entity'
import * as imageLib from '_src/lib/image'
import * as timeLib from '_src/lib/time'
import * as entityLib from '_src/lib/entity'

describe('SummaryVenue', () => {
  it('should have correct entityType', () => {
    const subject = new SummaryVenue({})
    expect(subject.entityType).toBe('venue')
  })

  it('should have correct entityTypeLabel', () => {
    const subject = new SummaryVenue({})
    expect(subject.entityTypeLabel).toBe('Venue')
  })

  it('should have correct id', () => {
    const subject = new SummaryVenue({ id: 'some-id' })
    expect(subject.id).toBe('some-id')
  })

  it('should have correct key', () => {
    const subject = new SummaryVenue({ id: 'some-id' })
    expect(subject.key).toBe('some-id')
  })

  it('should have correct status', () => {
    const subject = new SummaryVenue({ status: 'Active' })
    expect(subject.status).toBe('Active')
  })

  it('should have correct name', () => {
    const subject = new SummaryVenue({ name: 'Almeida' })
    expect(subject.name).toBe('Almeida')
  })

  it('should have correct venueType', () => {
    const subject = new SummaryVenue({ venueType: 'Theatre' })
    expect(subject.venueType).toBe('Theatre')
  })

  it('should have correct postcode', () => {
    const subject = new SummaryVenue({ postcode: 'N5 2WW' })
    expect(subject.postcode).toBe('N5 2WW')
  })

  it('should have correct latitude', () => {
    const subject = new SummaryVenue({ latitude: 2 })
    expect(subject.latitude).toBe(2)
  })

  it('should have correct longitude', () => {
    const subject = new SummaryVenue({ longitude: 3 })
    expect(subject.longitude).toBe(3)
  })

  it('should have correct pin', () => {
    const subject = new SummaryVenue({ latitude: 2, longitude: 3 })
    expect(subject.pin).toEqual({ lat: 2, lng: 3 })
  })

  it('should have correct image', () => {
    const subject = new SummaryVenue({ image: '123456' })
    expect(subject.image).toBe('123456')
  })

  it('should have correct imageCopyright', () => {
    const subject = new SummaryVenue({ imageCopyright: 'The copyright' })
    expect(subject.imageCopyright).toBe('The copyright')
  })

  it('should have correct imageRatio', () => {
    const subject = new SummaryVenue({ imageRatio: 2 })
    expect(subject.imageRatio).toBe(2)
  })

  it('should have correct hasImage when has image', () => {
    const subject = new SummaryVenue({ image: '123456' })
    expect(subject.hasImage).toBe(true)
  })

  it('should have correct hasImage when has no image', () => {
    const subject = new SummaryVenue({ image: null })
    expect(subject.hasImage).toBe(false)
  })

  it('should have correct cardImageLoaded', () => {
    const subject = new SummaryVenue({ cardImageLoaded: true })
    expect(subject.cardImageLoaded).toBe(true)
  })

  it('should have correct url', () => {
    const subject = new SummaryVenue({ id: 'almeida-theatre' })
    expect(subject.url).toBe('/venue/almeida-theatre')
  })

  it('should have correct editUrl', () => {
    const subject = new SummaryVenue({ id: 'almeida-theatre' })
    expect(subject.editUrl).toBe('/venue/edit/almeida-theatre')
  })

  it('should have correct isFullEntity', () => {
    const subject = new SummaryVenue({})
    expect(subject.isFullEntity).toBe(false)
  })

  it('should have correct isBeingWatched when is being watched', () => {
    const watches = { 'almeida-theatre': true }
    const subject = new SummaryVenue({ id: 'almeida-theatre' })
    expect(subject.isBeingWatched(watches)).toBe(true)
  })

  it('should have correct isBeingWatched when is not being watched', () => {
    const watches = {}
    const subject = new SummaryVenue({ id: 'almeida-theatre' })
    expect(subject.isBeingWatched(watches)).toBe(false)
  })

  it('should have correct createWatchLabel', () => {
    const subject = new SummaryVenue({ name: 'Almeida' })
    expect(subject.createWatchLabel()).toBe('Almeida')
  })

  it('should have correct createWatchChangeInstruction when is being watched', () => {
    const subject = new SummaryVenue({})
    expect(subject.createWatchChangeInstruction(true)).toBe(
      'Unwatch this venue'
    )
  })

  it('should have correct createWatchChangeInstruction when is not being watched', () => {
    const subject = new SummaryVenue({})
    expect(subject.createWatchChangeInstruction(false)).toBe('Watch this venue')
  })

  it('should have correct createFullAddress', () => {
    const subject = new SummaryVenue({
      address: '50 Foo Street',
      postcode: 'N5 2WW'
    })

    expect(subject.createFullAddress()).toBe('50 Foo Street, N5 2WW')
  })

  it('should clone correctly', () => {
    const source = new SummaryVenue({ name: 'source' })
    const copy = source.shallowClone()

    copy.entity.name = 'copy'

    expect(source.name).toBe('source')
    expect(copy.name).toBe('copy')
  })
})

describe('FullVenue', () => {
  it('should have correct images', () => {
    const subject = new FullVenue({ images: [{ id: 'some-id' }] })
    expect(subject.images).toEqual([{ id: 'some-id' }])
  })

  it('should have correct description', () => {
    const subject = new FullVenue({ description: 'Some description' })
    expect(subject.description).toBe('Some description')
  })

  it('should have correct descriptionCredit', () => {
    const subject = new FullVenue({
      descriptionCredit: 'Some description credit'
    })
    expect(subject.descriptionCredit).toBe('Some description credit')
  })

  it('should have correct weSay', () => {
    const subject = new FullVenue({ weSay: 'We say' })
    expect(subject.weSay).toBe('We say')
  })

  it('should have correct isFullEntity', () => {
    const subject = new FullVenue({})
    expect(subject.isFullEntity).toBe(true)
  })

  it('should have correct createInfoBarLabel', () => {
    const subject = new FullVenue({ venueType: 'Theatre' })
    expect(subject.createInfoBarLabel()).toBe('Theatre')
  })

  it('should have correct email', () => {
    const subject = new FullVenue({ email: 'foo@bar.com' })
    expect(subject.email).toBe('foo@bar.com')
  })

  it('should have correct telephone', () => {
    const subject = new FullVenue({ telephone: '12345' })
    expect(subject.telephone).toBe('12345')
  })

  it('should have correct wheelchairAccessType', () => {
    const subject = new FullVenue({ wheelchairAccessType: 'Unknown' })
    expect(subject.wheelchairAccessType).toBe('Unknown')
  })

  it('should have correct disabledBathroomType', () => {
    const subject = new FullVenue({ disabledBathroomType: 'Unknown' })
    expect(subject.disabledBathroomType).toBe('Unknown')
  })

  it('should have correct hearingFacilitiesType', () => {
    const subject = new FullVenue({ hearingFacilitiesType: 'Unknown' })
    expect(subject.hearingFacilitiesType).toBe('Unknown')
  })

  it('should have correct hasPermanentCollection', () => {
    const subject = new FullVenue({ hasPermanentCollection: true })
    expect(subject.hasPermanentCollection).toBe(true)
  })

  it('should get the homepage URL', () => {
    const subject = new FullVenue({
      links: [{ type: linkConstants.LINK_TYPE_HOMEPAGE, url: '/some/url' }]
    })

    expect(subject.getHomepageUrl()).toEqual('/some/url')
  })

  it('should clone correctly', () => {
    const source = new FullVenue({ name: 'source' })
    const copy = source.shallowClone()

    copy.entity.name = 'copy'

    expect(source.name).toBe('source')
    expect(copy.name).toBe('copy')
  })

  it('should have correct formatted description', () => {
    entityLib.processDescription = jest.fn().mockReturnValue('The Result')

    const subject = new FullVenue({
      description: 'Some description',
      descriptionCredit: 'The Credit'
    })

    expect(subject.createFormattedDescription()).toBe('The Result')

    expect(entityLib.processDescription).toBeCalledWith(
      'Some description',
      'The Credit'
    )
  })

  it('should create times details', () => {
    timeLib.getTimesDetails = jest.fn().mockReturnValue('Times details')

    const subject = new FullVenue({ name: 'The name' })

    expect(subject.createTimesDetailsOn('2017/01/20')).toBe('Times details')

    expect(timeLib.getTimesDetails).toBeCalledWith(
      { name: 'The name' },
      entityConstants.ENTITY_TYPE_VENUE,
      '2017/01/20'
    )
  })

  it('should create a times description', () => {
    timeLib.formatTimesStringForGivenDate = jest
      .fn()
      .mockReturnValue('Times description')

    const subject = new FullVenue({ name: 'The name' })

    expect(
      subject.createTimesDescriptionForDate('2017/01/01', '18:00', {})
    ).toBe('Times description')

    expect(timeLib.formatTimesStringForGivenDate).toBeCalledWith(
      { name: 'The name' },
      '2017/01/01',
      '18:00',
      {}
    )
  })

  it('should create a venue map icon url', () => {
    imageLib.createVenueTypePngIconUrl = jest.fn().mockReturnValue('/some/url')

    const subject = new FullVenue({ venueType: 'Theatre' })

    expect(subject.createVenuesMapIconUrl(true)).toBe('/some/url')
    expect(imageLib.createVenueTypePngIconUrl).toBeCalledWith('Theatre', true)
  })
})
