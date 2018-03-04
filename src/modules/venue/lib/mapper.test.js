import * as venueMapper from './mapper'
import { entityMapper } from '_src/modules/entity'
import { DEFAULT_MAP_CENTER } from '_src/modules/location'
import wheelchairAccessType from '_src/domain/types/wheelchair-access-type'
import disabledBathroomType from '_src/domain/types/disabled-bathroom-type'
import hearingFacilitiesType from '_src/domain/types/hearing-facilities-type'
import statusType from '_src/domain/types/status-type'
import linkType from '_src/domain/types/link-type'
import venueType from '_src/domain/types/venue-type'

describe('getInitialValues', () => {
  it('should handle getting initial values for an existing venue', () => {
    entityMapper.getValidStatusesInitialValue = jest
      .fn()
      .mockReturnValue(['Status A'])

    entityMapper.getRichTextInitialValue = jest
      .fn()
      .mockReturnValue('Rich Text Description')

    const entity = {
      id: 1,
      status: statusType.ACTIVE,
      name: 'Foo',
      venueType: venueType.THEATRE,
      address: 'Some address',
      latitude: 1.1,
      longitude: 2.2,
      postcode: 'N4 2RR',
      email: 'some@email.com',
      telephone: '123456789',
      wheelchairAccessType: wheelchairAccessType.FULL_ACCESS,
      disabledBathroomType: disabledBathroomType.PRESENT,
      hearingFacilitiesType: hearingFacilitiesType.HEARING_LOOPS,
      hasPermanentCollection: true,
      openingTimes: [],
      additionalOpeningTimes: [],
      openingTimesClosures: [],
      namedClosures: [],
      description: 'Description',
      links: [{ type: linkType.WIKIPEDIA }],
      images: [{ id: '1111' }],
      weSay: '',
      version: 9,
      createdDate: '2018/01/01'
    }

    const actual = venueMapper.getInitialValues(entity)

    expect(actual).toEqual({
      id: 1,
      status: statusType.ACTIVE,
      validStatuses: ['Status A'],
      name: 'Foo',
      venueType: venueType.THEATRE,
      address: 'Some address',
      pin: {
        lat: 1.1,
        lng: 2.2
      },
      defaultCenter: {
        lat: 1.1,
        lng: 2.2
      },
      postcode: 'N4 2RR',
      email: 'some@email.com',
      telephone: '123456789',
      wheelchairAccessType: wheelchairAccessType.FULL_ACCESS,
      disabledBathroomType: disabledBathroomType.PRESENT,
      hearingFacilitiesType: hearingFacilitiesType.HEARING_LOOPS,
      hasPermanentCollection: true,
      openingTimes: [],
      additionalOpeningTimes: [],
      openingTimesClosures: [],
      namedClosures: '',
      description: 'Rich Text Description',
      descriptionCredit: '',
      links: [{ type: linkType.WIKIPEDIA, key: linkType.WIKIPEDIA }],
      images: [
        {
          id: '1111',
          key: '1111',
          isMain: true,
          previewUrl: 'https://images.test.com/11/11/1111/120x120.jpg'
        }
      ],
      weSay: '',
      notes: '',
      version: 9
    })

    expect(entityMapper.getValidStatusesInitialValue).toHaveBeenCalledWith(
      statusType.ACTIVE
    )

    expect(entityMapper.getRichTextInitialValue).toHaveBeenCalledWith(
      'Description'
    )
  })

  it('should handle getting initial values for a new venue', () => {
    entityMapper.getValidStatusesInitialValue = jest
      .fn()
      .mockReturnValue(['Status A'])

    entityMapper.getRichTextInitialValue = jest
      .fn()
      .mockReturnValue('Description')

    const entity = {}
    const actual = venueMapper.getInitialValues(entity)

    expect(actual).toEqual({
      id: null,
      status: statusType.ACTIVE,
      validStatuses: ['Status A'],
      name: '',
      venueType: '',
      address: '',
      pin: {
        lat: null,
        lng: null
      },
      defaultCenter: DEFAULT_MAP_CENTER,
      postcode: '',
      email: '',
      telephone: '',
      wheelchairAccessType: '',
      disabledBathroomType: '',
      hearingFacilitiesType: '',
      hasPermanentCollection: false,
      openingTimes: [],
      additionalOpeningTimes: [],
      openingTimesClosures: [],
      namedClosures: '',
      notes: '',
      description: 'Description',
      descriptionCredit: '',
      links: [],
      images: [],
      weSay: '',
      version: 0
    })
  })
})

describe('mapSubmittedValues', () => {
  it('should map the values', () => {
    entityMapper.mapSubmittedImages = jest
      .fn()
      .mockReturnValue([{ id: '1111' }])

    entityMapper.mapSubmittedLinks = jest
      .fn()
      .mockReturnValue([{ type: linkType.WIKIPEDIA }])

    entityMapper.mapSubmittedDescription = jest
      .fn()
      .mockReturnValue('Mapped description')

    entityMapper.mapSubmittedOpeningTimes = jest.fn().mockReturnValue([])

    entityMapper.mapSubmittedAdditionalOpeningTimes = jest
      .fn()
      .mockReturnValue([])

    entityMapper.mapSubmittedOpeningTimesClosures = jest
      .fn()
      .mockReturnValue([])

    entityMapper.mapSubmittedNamedClosures = jest.fn().mockReturnValue([])

    const values = {
      name: 'Name',
      description: 'Description',
      descriptionCredit: 'Some credit',
      status: statusType.ACTIVE,
      venueType: venueType.THEATRE,
      address: 'Some address ',
      postcode: 'n4 2RR ',
      pin: { lat: 1.1, lng: 2.2 },
      wheelchairAccessType: wheelchairAccessType.FULL_ACCESS,
      disabledBathroomType: disabledBathroomType.PRESENT,
      hearingFacilitiesType: hearingFacilitiesType.HEARING_LOOPS,
      hasPermanentCollection: true,
      email: 'some@email.com',
      telephone: '123456789',
      openingTimes: [],
      additionalOpeningTimes: [],
      openingTimesClosures: [],
      namedClosures: [],
      images: [{ key: '1111' }],
      links: [{ key: '2222' }],
      weSay: '',
      notes: '',
      version: 7
    }

    const actual = venueMapper.mapSubmittedValues(values)

    expect(actual).toEqual({
      name: 'Name',
      description: 'Mapped description',
      descriptionCredit: 'Some credit',
      status: statusType.ACTIVE,
      venueType: venueType.THEATRE,
      address: 'Some address',
      postcode: 'N4 2RR',
      latitude: 1.1,
      longitude: 2.2,
      wheelchairAccessType: wheelchairAccessType.FULL_ACCESS,
      disabledBathroomType: disabledBathroomType.PRESENT,
      hearingFacilitiesType: hearingFacilitiesType.HEARING_LOOPS,
      hasPermanentCollection: true,
      email: 'some@email.com',
      telephone: '123456789',
      openingTimes: [],
      additionalOpeningTimes: [],
      openingTimesClosures: [],
      namedClosures: [],
      links: [{ type: linkType.WIKIPEDIA }],
      images: [{ id: '1111' }],
      weSay: '',
      notes: '',
      version: 8
    })

    expect(entityMapper.mapSubmittedDescription).toHaveBeenCalledWith(
      'Description'
    )

    expect(entityMapper.mapSubmittedImages).toHaveBeenCalledWith([
      { key: '1111' }
    ])

    expect(entityMapper.mapSubmittedLinks).toHaveBeenCalledWith([
      { key: '2222' }
    ])
  })
})
