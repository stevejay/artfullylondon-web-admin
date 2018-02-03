import * as search from '_src/lib/link'

describe('getAvailableLinkTypeDropdownOptions', () => {
  it('should filter out link types in value', () => {
    const value = [
      { type: 'Wikipedia' },
      { type: 'Twitter' },
      { type: 'Access' }
    ]

    const actual = search.getAvailableLinkTypeDropdownOptions(value)

    expect(actual).toEqual([
      { value: 'Homepage', label: 'Homepage' },
      { value: 'Facebook', label: 'Facebook' },
      { value: 'Instagram', label: 'Instagram' },
      { value: 'Booking', label: 'Booking' }
    ])
  })
})
