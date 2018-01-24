import * as tagSelectors from '_src/store/selectors/tag'

describe('getTagsForType', () => {
  it('should return an empty array when tag type does not exist', () => {
    const state = { tag: { medium: [{ id: 1 }] } }
    const result = tagSelectors.getTagsForType(state, 'foo')
    expect(result).toEqual([])
  })

  it('should return the tags when tag type exists', () => {
    const state = { tag: { medium: [{ id: 1 }] } }
    const result = tagSelectors.getTagsForType(state, 'medium')
    expect(result).toEqual([{ id: 1 }])
  })
})
