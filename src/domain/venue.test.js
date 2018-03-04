import { SummaryVenue, FullVenue } from '_src/domain/venue'
import linkType from '_src/domain/types/link-type'
import entityType from '_src/domain/types/entity-type'
import statusType from '_src/domain/types/status-type'
import venueType from '_src/domain/types/venue-type'
import hearingFacilitiesType from '_src/domain/types/hearing-facilities-type'
import disabledBathroomType from '_src/domain/types/disabled-bathroom-type'
import wheelchairAccessType from '_src/domain/types/wheelchair-access-type'
import * as timeLib from '_src/shared/lib/time'

describe('SummaryVenue', () => {
  let entity = null

  beforeEach(() => {
    entity = {
      entityType: entityType.VENUE,
      id: 'venue-id',
      status: statusType.ACTIVE,
      name: 'Tate Modern',
      venueType: venueType.ART_GALLERY,
      address: 'Bankside\nLondon',
      postcode: 'SW1 2ER',
      latitude: 51.5398,
      longitude: -0.109,
      image: 'abcd1234abcd1234abcd1234abcd1234',
      imageCopyright: 'Foo',
      imageRatio: 1.2
    }
  })

  it('should get the key', () => {
    const subject = new SummaryVenue(entity)
    expect(subject.key).toEqual('venue-id')
  })

  it('should handle getPostcodeDistrict', () => {
    const subject = new SummaryVenue(entity)
    expect(subject.getPostcodeDistrict()).toEqual('SW1')
  })

  it('should handle getEntityTypeLabel', () => {
    const subject = new SummaryVenue(entity)
    expect(subject.getEntityTypeLabel()).toEqual('Venue')
  })

  it('should handle getUrl', () => {
    const subject = new SummaryVenue(entity)
    expect(subject.getUrl()).toEqual('/venue/venue-id')
  })

  it('should handle getPin', () => {
    const subject = new SummaryVenue(entity)
    expect(subject.getPin()).toEqual({ lat: 51.5398, lng: -0.109 })
  })

  describe('hasImage', () => {
    it('should handle having an image', () => {
      entity.image = '12345678123456781234567812345678'
      const subject = new SummaryVenue(entity)
      expect(subject.hasImage()).toEqual(true)
    })

    it('should handle having no image', () => {
      entity.image = null
      const subject = new SummaryVenue(entity)
      expect(subject.hasImage()).toEqual(false)
    })
  })

  describe('createFullAddress', () => {
    it('should handle having a postcode', () => {
      const subject = new SummaryVenue(entity)
      expect(subject.createFullAddress()).toEqual('Bankside, London, SW1 2ER')
    })

    it('should handle having no postcode', () => {
      entity.postcode = null
      const subject = new SummaryVenue(entity)
      expect(subject.createFullAddress()).toEqual('Bankside, London')
    })
  })
})

describe('FullVenue', () => {
  let entity = null

  beforeEach(() => {
    entity = {
      id: 'venue-id',
      name: 'Tate Modern',
      status: statusType.ACTIVE,
      venueType: venueType.ART_GALLERY,
      description: 'Some description',
      descriptionCredit: 'Some description credit',
      address: 'Bankside\nLondon',
      postcode: 'SW1 2ER',
      latitude: 51.5398,
      longitude: -0.109,
      wheelchairAccessType: wheelchairAccessType.FULL_ACCESS,
      disabledBathroomType: disabledBathroomType.PRESENT,
      hearingFacilitiesType: hearingFacilitiesType.HEARING_LOOPS,
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
      links: [
        { type: linkType.WIKIPEDIA, url: 'https://en.wikipedia.org/foo' }
      ],
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
    }
  })

  it('should handle entityType', () => {
    const subject = new FullVenue(entity)
    expect(subject.entityType).toEqual(entityType.VENUE)
  })

  it('should handle getInfoBarLabel', () => {
    const subject = new FullVenue(entity)
    expect(subject.getInfoBarLabel()).toEqual('Art Gallery')
  })

  it('should handle getEditUrl', () => {
    const subject = new FullVenue(entity)
    expect(subject.getEditUrl()).toEqual('/venue/edit/venue-id')
  })

  it('should handle getPin', () => {
    const subject = new FullVenue(entity)
    expect(subject.getPin()).toEqual({ lat: 51.5398, lng: -0.109 })
  })

  describe('getHomepageUrl', () => {
    it('should handle a venue with a homepage', () => {
      entity.links = [
        { type: linkType.WIKIPEDIA, url: 'https://en.wikipedia.org/foo' },
        { type: linkType.HOMEPAGE, url: 'https://homepage.com/foo' }
      ]

      const subject = new FullVenue(entity)
      expect(subject.getHomepageUrl()).toEqual('https://homepage.com/foo')
    })

    it('should handle a venue with no homepage', () => {
      entity.links = [
        { type: linkType.WIKIPEDIA, url: 'https://en.wikipedia.org/foo' }
      ]

      const subject = new FullVenue(entity)
      expect(subject.getHomepageUrl()).toEqual(null)
    })
  })

  it('should handle createTimesDetailsOn', () => {
    timeLib.getTimesDetails = jest.fn().mockReturnValue('Times Details')

    const subject = new FullVenue(entity)

    expect(subject.createTimesDetailsOn('2018/01/01')).toEqual('Times Details')

    expect(timeLib.getTimesDetails).toHaveBeenCalledWith(
      subject,
      entityType.VENUE,
      '2018/01/01'
    )
  })

  describe('createFullAddress', () => {
    it('should handle having a postcode', () => {
      const subject = new FullVenue(entity)
      expect(subject.createFullAddress()).toEqual('Bankside, London, SW1 2ER')
    })

    it('should handle having no postcode', () => {
      entity.postcode = null
      const subject = new FullVenue(entity)
      expect(subject.createFullAddress()).toEqual('Bankside, London')
    })
  })
})
