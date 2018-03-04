import * as talentMapper from './mapper'
import { entityMapper } from '_src/modules/entity'
import talentType from '_src/domain/types/talent-type'
import statusType from '_src/domain/types/status-type'
import linkType from '_src/domain/types/link-type'

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
      status: statusType.ACTIVE,
      firstNames: 'Foo',
      lastName: 'Bar',
      talentType: talentType.INDIVIDUAL,
      commonRole: 'Some common role',
      weSay: 'Something',
      version: 9,
      createdDate: '2018/01/01',
      description: 'Description',
      links: [{ type: linkType.WIKIPEDIA }],
      images: [{ id: '1111' }]
    }

    const actual = talentMapper.getInitialValues(talent)

    expect(actual).toEqual({
      id: 1,
      status: statusType.ACTIVE,
      validStatuses: ['Status A'],
      firstNames: 'Foo',
      lastName: 'Bar',
      talentType: talentType.INDIVIDUAL,
      commonRole: 'Some common role',
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
      weSay: 'Something',
      version: 9
    })

    expect(entityMapper.getValidStatusesInitialValue).toHaveBeenCalledWith(
      statusType.ACTIVE
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
      .mockReturnValue([{ type: linkType.WIKIPEDIA }])

    entityMapper.mapSubmittedDescription = jest
      .fn()
      .mockReturnValue('Mapped description')

    const values = {
      firstNames: 'First',
      lastName: 'Last',
      version: 7,
      weSay: ' We say ',
      status: statusType.ACTIVE,
      commonRole: 'The common role',
      talentType: talentType.INDIVIDUAL,
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
      talentType: talentType.INDIVIDUAL,
      commonRole: 'The common role',
      status: statusType.ACTIVE,
      links: [{ type: linkType.WIKIPEDIA }],
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
