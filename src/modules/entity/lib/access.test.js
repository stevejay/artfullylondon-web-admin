import * as accessLib from './access'
import wheelchairAccessType from '_src/entities/wheelchair-access-type'
import disabledBathroomType from '_src/entities/disabled-bathroom-type'
import hearingFacilitiesType from '_src/entities/hearing-facilities-type'

describe('getAccessText', () => {
  it('should return correct text when has all types known and no access link', () => {
    const actual = accessLib.getAccessText(
      wheelchairAccessType.FULL_ACCESS,
      disabledBathroomType.PRESENT,
      hearingFacilitiesType.HEARING_LOOPS,
      false
    )

    expect(actual).toBe(
      'All spaces have wheelchair access. There are accessible toilets. Hearing loops are present in all spaces.'
    )
  })

  it('should return correct text when has one or more unknown types and no access link', () => {
    const actual = accessLib.getAccessText(
      wheelchairAccessType.FULL_ACCESS,
      disabledBathroomType.PRESENT,
      hearingFacilitiesType.UNKNOWN,
      false
    )

    expect(actual).toBe(
      'All spaces have wheelchair access. There are accessible toilets. Contact the venue for information on the available facilities.'
    )
  })

  it('should return correct text when has all types known and an access link', () => {
    const actual = accessLib.getAccessText(
      wheelchairAccessType.FULL_ACCESS,
      disabledBathroomType.PRESENT,
      hearingFacilitiesType.HEARING_LOOPS,
      true
    )

    expect(actual).toBe(
      'All spaces have wheelchair access. There are accessible toilets. Hearing loops are present in all spaces.'
    )
  })

  it('should return correct text when has one or more unknown types and an access link', () => {
    const actual = accessLib.getAccessText(
      wheelchairAccessType.FULL_ACCESS,
      disabledBathroomType.PRESENT,
      hearingFacilitiesType.UNKNOWN,
      true
    )

    expect(actual).toBe(
      'All spaces have wheelchair access. There are accessible toilets.'
    )
  })

  it('should return correct text when has all partial access and no access link', () => {
    const actual = accessLib.getAccessText(
      wheelchairAccessType.PARTIAL_ACCESS,
      disabledBathroomType.PRESENT,
      hearingFacilitiesType.PARTIAL_HEARING_LOOPS,
      false
    )

    expect(actual).toBe(
      'Only some spaces have wheelchair access. There are accessible toilets. Hearing loops are present in some spaces.'
    )
  })

  it('should return correct text when has no access and no access link', () => {
    const actual = accessLib.getAccessText(
      wheelchairAccessType.NO_ACCESS,
      disabledBathroomType.NOT_PRESENT,
      hearingFacilitiesType.NO_HEARING_LOOPS,
      false
    )

    expect(actual).toBe(
      'There is no wheelchair access. There are no accessible toilets. There are no hearing loops.'
    )
  })

  it('should return correct text when has nothing known', () => {
    const actual = accessLib.getAccessText(
      wheelchairAccessType.UNKNOWN,
      disabledBathroomType.UNKNOWN,
      hearingFacilitiesType.UNKNOWN,
      false
    )

    expect(actual).toBe(
      'Contact the venue for information on the available facilities.'
    )
  })
})
