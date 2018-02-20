import * as entityLib from '_src/shared/lib/entity'

describe('descriptionStringIsEmpty', () => {
  it('should handle a non-empty description string', () => {
    const actual = entityLib.descriptionStringIsEmpty('<p> Some content   </p>')
    expect(actual).toEqual(false)
  })

  it('should handle an empty description string', () => {
    const actual = entityLib.descriptionStringIsEmpty('<p></p>')
    expect(actual).toEqual(true)
  })

  it('should handle a whitespace-only description string', () => {
    const actual = entityLib.descriptionStringIsEmpty('<p>      </p>')
    expect(actual).toEqual(true)
  })

  it('should handle a br-only description string', () => {
    const actual = entityLib.descriptionStringIsEmpty('<p><br /></p>')
    expect(actual).toEqual(true)
  })
})
