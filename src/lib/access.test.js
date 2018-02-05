import * as accessLib from '_src/lib/access'
import * as accessConstants from '_src/constants/access'

describe('getAccessText', () => {
  it('should return correct text when has all types known and no access link', () => {
    const actual = accessLib.getAccessText(
      accessConstants.WHEELCHAIR_ACCESS_TYPE_FULL_ACCESS,
      accessConstants.DISABLED_BATHROOM_TYPE_PRESENT,
      accessConstants.HEARING_FACILITIES_TYPE_HEARING_LOOPS,
      false
    )

    expect(actual).toBe(
      'All spaces have wheelchair access. There are accessible toilets. Hearing loops are present in all spaces.'
    )
  })

  it('should return correct text when has one or more unknown types and no access link', () => {
    const actual = accessLib.getAccessText(
      accessConstants.WHEELCHAIR_ACCESS_TYPE_FULL_ACCESS,
      accessConstants.DISABLED_BATHROOM_TYPE_PRESENT,
      accessConstants.HEARING_FACILITIES_TYPE_UNKNOWN,
      false
    )

    expect(actual).toBe(
      'All spaces have wheelchair access. There are accessible toilets. Contact the venue for information on the available facilities.'
    )
  })

  it('should return correct text when has all types known and an access link', () => {
    const actual = accessLib.getAccessText(
      accessConstants.WHEELCHAIR_ACCESS_TYPE_FULL_ACCESS,
      accessConstants.DISABLED_BATHROOM_TYPE_PRESENT,
      accessConstants.HEARING_FACILITIES_TYPE_HEARING_LOOPS,
      true
    )

    expect(actual).toBe(
      'All spaces have wheelchair access. There are accessible toilets. Hearing loops are present in all spaces.'
    )
  })

  it('should return correct text when has one or more unknown types and an access link', () => {
    const actual = accessLib.getAccessText(
      accessConstants.WHEELCHAIR_ACCESS_TYPE_FULL_ACCESS,
      accessConstants.DISABLED_BATHROOM_TYPE_PRESENT,
      accessConstants.HEARING_FACILITIES_TYPE_UNKNOWN,
      true
    )

    expect(actual).toBe(
      'All spaces have wheelchair access. There are accessible toilets.'
    )
  })

  it('should return correct text when has all partial access and no access link', () => {
    const actual = accessLib.getAccessText(
      accessConstants.WHEELCHAIR_ACCESS_TYPE_PARTIAL_ACCESS,
      accessConstants.DISABLED_BATHROOM_TYPE_PRESENT,
      accessConstants.HEARING_FACILITIES_TYPE_PARTIAL_HEARING_LOOPS,
      false
    )

    expect(actual).toBe(
      'Only some spaces have wheelchair access. There are accessible toilets. Hearing loops are present in some spaces.'
    )
  })

  it('should return correct text when has no access and no access link', () => {
    const actual = accessLib.getAccessText(
      accessConstants.WHEELCHAIR_ACCESS_TYPE_NO_ACCESS,
      accessConstants.DISABLED_BATHROOM_TYPE_NOT_PRESENT,
      accessConstants.HEARING_FACILITIES_TYPE_NO_HEARING_LOOPS,
      false
    )

    expect(actual).toBe(
      'There is no wheelchair access. There are no accessible toilets. There are no hearing loops.'
    )
  })

  it('should return correct text when has nothing known', () => {
    const actual = accessLib.getAccessText(
      accessConstants.WHEELCHAIR_ACCESS_TYPE_UNKNOWN,
      accessConstants.DISABLED_BATHROOM_TYPE_UNKNOWN,
      accessConstants.HEARING_FACILITIES_TYPE_UNKNOWN,
      false
    )

    expect(actual).toBe(
      'Contact the venue for information on the available facilities.'
    )
  })
})
