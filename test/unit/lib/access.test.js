import * as access from '_admin/lib/access'
import * as constants from '_admin/constants/access'

describe('getAccessText', () => {
  it('should return correct text when has all types known and no access link', () => {
    const actual = access.getAccessText(
      constants.WHEELCHAIR_ACCESS_TYPE_FULL_ACCESS,
      constants.DISABLED_BATHROOM_TYPE_PRESENT,
      constants.HEARING_FACILITIES_TYPE_HEARING_LOOPS,
      false
    )

    expect(actual).toBe(
      'All spaces have wheelchair access. There are accessible toilets. Hearing loops are present in all spaces.'
    )
  })

  it('should return correct text when has one or more unknown types and no access link', () => {
    const actual = access.getAccessText(
      constants.WHEELCHAIR_ACCESS_TYPE_FULL_ACCESS,
      constants.DISABLED_BATHROOM_TYPE_PRESENT,
      constants.HEARING_FACILITIES_TYPE_UNKNOWN,
      false
    )

    expect(actual).toBe(
      'All spaces have wheelchair access. There are accessible toilets. Contact the venue for information on the available facilities.'
    )
  })

  it('should return correct text when has all types known and an access link', () => {
    const actual = access.getAccessText(
      constants.WHEELCHAIR_ACCESS_TYPE_FULL_ACCESS,
      constants.DISABLED_BATHROOM_TYPE_PRESENT,
      constants.HEARING_FACILITIES_TYPE_HEARING_LOOPS,
      true
    )

    expect(actual).toBe(
      'All spaces have wheelchair access. There are accessible toilets. Hearing loops are present in all spaces.'
    )
  })

  it('should return correct text when has one or more unknown types and an access link', () => {
    const actual = access.getAccessText(
      constants.WHEELCHAIR_ACCESS_TYPE_FULL_ACCESS,
      constants.DISABLED_BATHROOM_TYPE_PRESENT,
      constants.HEARING_FACILITIES_TYPE_UNKNOWN,
      true
    )

    expect(actual).toBe(
      'All spaces have wheelchair access. There are accessible toilets.'
    )
  })
})
