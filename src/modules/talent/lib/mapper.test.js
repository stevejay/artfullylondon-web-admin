import * as talentMapper from './mapper'
import * as dateLib from '_src/shared/lib/date'
import talentType from '_src/domain/types/talent-type'
import statusType from '_src/domain/types/status-type'
import { entityMapper } from '_src/modules/entity'

describe('getInitialValues', () => {
  it('should handle getting initial values for an existing talent', () => {
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

    const talent = {
      id: 1,
      status: 'Active',
      firstNames: 'Foo',
      lastName: 'Bar',
      talentType: 'Individual',
      commonRole: 'Some common role',
      weSay: 'Something',
      version: 9,
      createdDate: '2018/01/01',
      description: 'Description',
      links: [{ type: 'Wikipedia' }],
      images: [{ id: '1111' }],
      isNew: () => false
    }

    const actual = talentMapper.getInitialValues(talent)

    expect(actual).toEqual({
      id: 1,
      status: 'Active',
      validStatuses: ['Status A'],
      firstNames: 'Foo',
      lastName: 'Bar',
      talentType: 'Individual',
      commonRole: 'Some common role',
      description: 'Rich Text Description',
      descriptionCredit: '',
      links: [{ type: 'Wikipedia', url: 'mapped' }],
      images: [{ key: '1111' }],
      weSay: 'Something',
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

  it('should handle getting initial values for a new talent', () => {
    entityMapper.getValidStatusesInitialValue = jest
      .fn()
      .mockReturnValue(['Status A'])

    entityMapper.getRichTextInitialValue = jest
      .fn()
      .mockReturnValue('Description')

    const talent = { isNew: () => true }
    const actual = talentMapper.getInitialValues(talent)

    expect(actual).toEqual({
      id: null,
      status: statusType.ACTIVE,
      validStatuses: ['Status A'],
      firstNames: '',
      lastName: '',
      talentType: talentType.INDIVIDUAL,
      commonRole: '',
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
      firstNames: 'First',
      lastName: 'Last',
      version: 7,
      weSay: ' We say ',
      status: 'Active',
      commonRole: 'The common role',
      talentType: 'Individual',
      description: 'Description',
      descriptionCredit: '',
      images: [{ key: '1111' }],
      links: [{ key: '2222' }]
    }

    const actual = talentMapper.mapSubmittedValues(values)

    expect(actual).toEqual({
      firstNames: 'First',
      lastName: 'Last',
      description: 'Mapped description',
      descriptionCredit: '',
      talentType: 'Individual',
      commonRole: 'The common role',
      status: 'Active',
      links: [{ type: 'Wikipedia' }],
      images: [{ id: '1111' }],
      weSay: 'We say',
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
