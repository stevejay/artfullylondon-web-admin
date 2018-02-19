import * as eventSeriesMapper from './mapper'
import * as dateLib from '_src/lib/date'
import { entityMapper } from '_src/modules/entity'
import statusType from '_src/domain/types/status-type'

describe('getInitialValues', () => {
  it('should handle getting initial values for an existing event series', () => {
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

    const entity = {
      id: 1,
      status: 'Active',
      name: 'Foo',
      eventSeriesType: 'Occasional',
      occurrence: 'Occurrence',
      summary: 'Summary',
      version: 9,
      createdDate: '2018/01/01',
      description: 'Description',
      links: { links: [{ type: 'Wikipedia' }] },
      images: [{ id: '1111' }]
    }

    const actual = eventSeriesMapper.getInitialValues(entity)

    expect(actual).toEqual({
      id: 1,
      status: 'Active',
      validStatuses: ['Status A'],
      name: 'Foo',
      eventSeriesType: 'Occasional',
      occurrence: 'Occurrence',
      summary: 'Summary',
      description: 'Rich Text Description',
      descriptionCredit: '',
      links: [{ type: 'Wikipedia', url: 'mapped' }],
      images: [{ key: '1111' }],
      weSay: '',
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

  it('should handle getting initial values for a new event series', () => {
    entityMapper.getValidStatusesInitialValue = jest
      .fn()
      .mockReturnValue(['Status A'])

    entityMapper.getRichTextInitialValue = jest
      .fn()
      .mockReturnValue('Description')

    const entity = { isNew: true }
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

    const values = {
      name: 'Name',
      eventSeriesType: 'Occasional',
      occurrence: 'Occurrence',
      summary: 'Summary',
      version: 7,
      status: 'Active',
      description: 'Description',
      descriptionCredit: 'Some credit',
      images: [{ key: '1111' }],
      links: [{ key: '2222' }]
    }

    const actual = eventSeriesMapper.mapSubmittedValues(values)

    expect(actual).toEqual({
      name: 'Name',
      eventSeriesType: 'Occasional',
      occurrence: 'Occurrence',
      summary: 'Summary',
      weSay: '',
      status: 'Active',
      description: 'Mapped description',
      descriptionCredit: 'Some credit',
      links: [{ type: 'Wikipedia' }],
      images: [{ id: '1111' }],
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
