import { SummaryVenue, FullVenue } from '_src/domain/venue'
import linkType from '_src/domain/types/link-type'
import * as timeLib from '_src/lib/time'
import entityType from '_src/domain/types/entity-type'

describe('SummaryVenue', () => {
  it('should construct a summary venue', () => {
    const subject = new SummaryVenue({
      entityType: 'venue',
      id: 'venue-id',
      status: 'Active',
      name: 'Tate Modern',
      venueType: 'Art Gallery',
      address: 'Bankside\nLondon',
      postcode: 'SW1 2ER',
      latitude: 51.5398,
      longitude: -0.109,
      image: 'abcd1234abcd1234abcd1234abcd1234',
      imageCopyright: 'Foo',
      imageRatio: 1.2
    })

    expect(subject.key).toEqual('venue-id')
    expect(subject.getPostcodeDistrict()).toEqual('SW1')
    expect(subject.getEntityTypeLabel()).toEqual('Venue')
    expect(subject.getUrl()).toEqual('/venue/venue-id')
    expect(subject.getPin()).toEqual({ lat: 51.5398, lng: -0.109 })
    expect(subject.hasImage()).toEqual(true)
    expect(subject.createFullAddress()).toEqual('Bankside, London, SW1 2ER')
  })

  it('should construct a summary venue with no image or postcode', () => {
    const subject = new SummaryVenue({
      entityType: 'venue',
      id: 'venue-id',
      status: 'Active',
      name: 'Tate Modern',
      venueType: 'Art Gallery',
      address: 'Bankside\nLondon',
      latitude: 51.5398,
      longitude: -0.109
    })

    expect(subject.key).toEqual('venue-id')
    expect(subject.getPostcodeDistrict()).toEqual(null)
    expect(subject.getEntityTypeLabel()).toEqual('Venue')
    expect(subject.getUrl()).toEqual('/venue/venue-id')
    expect(subject.getPin()).toEqual({ lat: 51.5398, lng: -0.109 })
    expect(subject.hasImage()).toEqual(false)
    expect(subject.createFullAddress()).toEqual('Bankside, London')
  })

  it('should clone correctly', () => {
    const source = new SummaryVenue({ name: 'source' })
    const copy = source.createShallowClone()

    copy.name = 'copy'

    expect(source.name).toBe('source')
    expect(copy.name).toBe('copy')
  })
})

describe('FullVenue', () => {
  it('should construct a full venue', () => {
    const subject = new FullVenue({
      id: 'venue-id',
      name: 'Tate Modern',
      status: 'Active',
      venueType: 'Art Gallery',
      description: 'Some description',
      descriptionCredit: 'Some description credit',
      address: 'Bankside\nLondon',
      postcode: 'SW1 2ER',
      latitude: 51.5398,
      longitude: -0.109,
      wheelchairAccessType: 'FullAccess',
      disabledBathroomType: 'Present',
      hearingFacilitiesType: 'HearingLoops',
      hasPermanentCollection: true,
      email: 'boxoffice@tate.co.uk',
      telephone: '020 7359 4404',
      openingTimes: [
        { day: 0, from: '09:00', to: '18:00' },
        { day: 1, from: '09:00', to: '18:00' }
      ],
      additionalOpeningTimes: [
        { date: '2016/02/12', from: '23:00', to: '23:30' }
      ],
      openingTimesClosures: [{ date: '2016/02/10' }, { date: '2016/02/11' }],
      namedClosures: ['ChristmasDay', 'NewYearsDay'],
      links: [{ type: 'Wikipedia', url: 'https://en.wikipedia.org/foo' }],
      images: [
        {
          id: 'abcd1234abcd1234abcd1234abcd1234',
          ratio: 1.2,
          copyright: 'Foo'
        }
      ],
      weSay: 'something',
      notes: 'hi',
      version: 1,
      schemeVersion: 3,
      createdDate: '2016/01/10',
      updatedDate: '2016/01/11'
    })

    expect(subject.id).toEqual('venue-id')
    expect(subject.name).toEqual('Tate Modern')
    expect(subject.status).toEqual('Active')
    expect(subject.entityType).toEqual('venue')
    expect(subject.getInfoBarLabel()).toEqual('Art Gallery')
    expect(subject.getEditUrl()).toEqual('/venue/edit/venue-id')
  })

  it('should get the homepage URL', () => {
    const subject = new FullVenue({
      links: [{ type: linkType.HOMEPAGE, url: '/some/url' }]
    })

    expect(subject.getHomepageUrl()).toEqual('/some/url')
  })

  it('should get the homepage URL when there is none', () => {
    const subject = new FullVenue({ links: [] })
    expect(subject.getHomepageUrl()).toEqual(null)
  })

  it('should clone correctly', () => {
    const source = new FullVenue({ name: 'source' })
    const copy = source.createShallowClone()

    copy.name = 'copy'

    expect(source.name).toBe('source')
    expect(copy.name).toBe('copy')
  })

  it('should create times details', () => {
    timeLib.getTimesDetails = jest.fn().mockReturnValue('Times details')

    const subject = new FullVenue({ name: 'The name' })

    expect(subject.createTimesDetailsOn('2017/01/20')).toBe('Times details')

    expect(timeLib.getTimesDetails).toBeCalledWith(
      { name: 'The name' },
      entityType.VENUE,
      '2017/01/20'
    )
  })
})
