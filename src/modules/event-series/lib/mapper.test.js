import * as eventSeriesMapper from './mapper'
import { entityMapper } from '_src/modules/entity'
import statusType from '_src/domain/types/status-type'
import linkType from '_src/domain/types/link-type'
import eventSeriesType from '_src/domain/types/event-series-type'

describe('getInitialValues', () => {
  it('should handle getting initial values for an existing event series', () => {
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
      eventSeriesType: eventSeriesType.OCCASIONAL,
      occurrence: 'Occurrence',
      summary: 'Summary',
      version: 9,
      createdDate: '2018/01/01',
      description: 'Description',
      links: [{ type: linkType.WIKIPEDIA }],
      images: [{ id: '1111' }]
    }

    const actual = eventSeriesMapper.getInitialValues(entity)

    expect(actual).toEqual({
      id: 1,
      status: statusType.ACTIVE,
      validStatuses: ['Status A'],
      name: 'Foo',
      eventSeriesType: eventSeriesType.OCCASIONAL,
      occurrence: 'Occurrence',
      summary: 'Summary',
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
      version: 9
    })

    expect(entityMapper.getValidStatusesInitialValue).toHaveBeenCalledWith(
      statusType.ACTIVE
    )

    expect(entityMapper.getRichTextInitialValue).toHaveBeenCalledWith(
      'Description'
    )
  })

  it('should handle getting initial values for a new event series', () => {
    entityMapper.getValidStatusesInitialValue = jest
      .fn()
      .mockReturnValue(['Status A'])

    entityMapper.getRichTextInitialValue = jest
      .fn()
      .mockReturnValue('Description')

    const entity = {}
    const actual = eventSeriesMapper.getInitialValues(entity)

    expect(actual).toEqual({
      id: null,
      status: statusType.ACTIVE,
      validStatuses: ['Status A'],
      name: '',
      eventSeriesType: '',
      occurrence: '',
      summary: '',
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

    const values = {
      name: 'Name',
      eventSeriesType: eventSeriesType.OCCASIONAL,
      occurrence: 'Occurrence',
      summary: 'Summary',
      version: 7,
      status: statusType.ACTIVE,
      description: 'Description',
      descriptionCredit: 'Some credit',
      images: [{ key: '1111' }],
      links: [{ key: '2222' }]
    }

    const actual = eventSeriesMapper.mapSubmittedValues(values)

    expect(actual).toEqual({
      name: 'Name',
      eventSeriesType: eventSeriesType.OCCASIONAL,
      occurrence: 'Occurrence',
      summary: 'Summary',
      weSay: '',
      status: statusType.ACTIVE,
      description: 'Mapped description',
      descriptionCredit: 'Some credit',
      links: [{ type: linkType.WIKIPEDIA }],
      images: [{ id: '1111' }],
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
