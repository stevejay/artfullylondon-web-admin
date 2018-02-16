import * as venueMapper from './mapper'
import * as entityConstants from '_src/constants/entity'
import * as dateLib from '_src/lib/date'
import { entityMapper } from '_src/modules/entity'
import { DEFAULT_MAP_CENTER } from '_src/modules/location'
import * as accessConstants from '_src/constants/access'

describe('getInitialValues', () => {
  it('should handle getting initial values for an existing venue', () => {
    entityMapper.getValidStatusesInitialValue = jest
      .fn()
      .mockReturnValue(['Status A'])

    entityMapper.getRichTextInitialValue = jest
      .fn()
      .mockReturnValue('Rich Text Description')

    entityMapper.getLinksInitialValue = jest
      .fn()
      .mockReturnValue([{ type: 'Wikipedia', url: 'mapped' }])

    entityMapper.getImagesInitialValue = jest
      .fn()
      .mockReturnValue([{ key: '1111' }])

    entityMapper.getOpeningTimesInitialValue = jest.fn().mockReturnValue([])

    entityMapper.getAdditionalOpeningTimesInitialValue = jest
      .fn()
      .mockReturnValue([])

    entityMapper.getOpeningTimesClosuresInitialValue = jest
      .fn()
      .mockReturnValue([])

    entityMapper.getNamedClosuresInitialValue = jest.fn().mockReturnValue([])

    const entity = {
      id: 1,
      status: 'Active',
      name: 'Foo',
      venueType: 'Theatre',
      address: 'Some address',
      latitude: 1.1,
      longitude: 2.2,
      postcode: 'N4 2RR',
      email: 'some@email.com',
      telephone: '123456789',
      wheelchairAccessType: accessConstants.WHEELCHAIR_ACCESS_TYPE_FULL_ACCESS,
      disabledBathroomType: accessConstants.DISABLED_BATHROOM_TYPE_PRESENT,
      hearingFacilitiesType: accessConstants.HEARING_FACILITIES_TYPE_HEARING_LOOPS,
      hasPermanentCollection: true,
      openingTimes: [],
      additionalOpeningTimes: [],
      openingTimesClosures: [],
      namedClosures: [],
      description: 'Description',
      links: { links: [{ type: 'Wikipedia' }] },
      images: [{ id: '1111' }],
      weSay: '',
      version: 9,
      createdDate: '2018/01/01'
    }

    const actual = venueMapper.getInitialValues(entity)

    expect(actual).toEqual({
      id: 1,
      status: 'Active',
      validStatuses: ['Status A'],
      name: 'Foo',
      venueType: 'Theatre',
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
      wheelchairAccessType: accessConstants.WHEELCHAIR_ACCESS_TYPE_FULL_ACCESS,
      disabledBathroomType: accessConstants.DISABLED_BATHROOM_TYPE_PRESENT,
      hearingFacilitiesType: accessConstants.HEARING_FACILITIES_TYPE_HEARING_LOOPS,
      hasPermanentCollection: true,
      openingTimes: [],
      additionalOpeningTimes: [],
      openingTimesClosures: [],
      namedClosures: [],
      description: 'Rich Text Description',
      descriptionCredit: '',
      links: [{ type: 'Wikipedia', url: 'mapped' }],
      images: [{ key: '1111' }],
      weSay: '',
      notes: '',
      version: 9,
      createdDate: '2018/01/01'
    })

    expect(entityMapper.getValidStatusesInitialValue).toHaveBeenCalledWith(
      'Active'
    )

    expect(entityMapper.getRichTextInitialValue).toHaveBeenCalledWith(
      'Description'
    )

    expect(entityMapper.getLinksInitialValue).toHaveBeenCalledWith([
      { type: 'Wikipedia' }
    ])

    expect(entityMapper.getImagesInitialValue).toHaveBeenCalledWith([
      { id: '1111' }
    ])
  })

  it('should handle getting initial values for a new venue', () => {
    entityMapper.getValidStatusesInitialValue = jest
      .fn()
      .mockReturnValue(['Status A'])

    entityMapper.getRichTextInitialValue = jest
      .fn()
      .mockReturnValue('Description')

    const entity = { isNew: true }
    const actual = venueMapper.getInitialValues(entity)

    expect(actual).toEqual({
      id: null,
      status: entityConstants.ACTIVE_STATUS,
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
      version: 0,
      createdDate: null
    })
  })
})

describe('mapSubmittedValues', () => {
  it('should map the values', () => {
    dateLib.getDateNowForDatabase = jest.fn().mockReturnValue('2018/01/01')

    entityMapper.mapSubmittedImages = jest
      .fn()
      .mockReturnValue([{ id: '1111' }])

    entityMapper.mapSubmittedLinks = jest
      .fn()
      .mockReturnValue([{ type: 'Wikipedia' }])

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
      status: 'Active',
      venueType: 'Theatre',
      address: 'Some address ',
      postcode: 'n4 2RR ',
      pin: { lat: 1.1, lng: 2.2 },
      wheelchairAccessType: accessConstants.WHEELCHAIR_ACCESS_TYPE_FULL_ACCESS,
      disabledBathroomType: accessConstants.DISABLED_BATHROOM_TYPE_PRESENT,
      hearingFacilitiesType: accessConstants.HEARING_FACILITIES_TYPE_HEARING_LOOPS,
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
      status: 'Active',
      venueType: 'Theatre',
      address: 'Some address',
      postcode: 'N4 2RR',
      latitude: 1.1,
      longitude: 2.2,
      wheelchairAccessType: accessConstants.WHEELCHAIR_ACCESS_TYPE_FULL_ACCESS,
      disabledBathroomType: accessConstants.DISABLED_BATHROOM_TYPE_PRESENT,
      hearingFacilitiesType: accessConstants.HEARING_FACILITIES_TYPE_HEARING_LOOPS,
      hasPermanentCollection: true,
      email: 'some@email.com',
      telephone: '123456789',
      openingTimes: [],
      additionalOpeningTimes: [],
      openingTimesClosures: [],
      namedClosures: [],
      links: [{ type: 'Wikipedia' }],
      images: [{ id: '1111' }],
      weSay: '',
      notes: '',
      version: 8,
      createdDate: '2018/01/01',
      updatedDate: '2018/01/01'
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