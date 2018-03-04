import * as talentMapper from './mapper'
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
      images: [{ id: '1111' }]
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
      links: [{ type: 'Wikipedia', key: 'Wikipedia' }],
      images: [
        {
          id: '1111',
          key: '1111',
          isMain: true,
          previewUrl: 'https://images.test.com/11/11/1111/120x120.jpg'
        }
      ],
      weSay: 'Something',
      version: 9
    })

    expect(entityMapper.getValidStatusesInitialValue).toHaveBeenCalledWith(
      'Active'
    )

    expect(entityMapper.getRichTextInitialValue).toHaveBeenCalledWith(
      'Description'
    )
  })

  it('should handle getting initial values for a new talent', () => {
    entityMapper.getValidStatusesInitialValue = jest
      .fn()
      .mockReturnValue(['Status A'])

    entityMapper.getRichTextInitialValue = jest
      .fn()
      .mockReturnValue('Description')

    const talent = {}
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
