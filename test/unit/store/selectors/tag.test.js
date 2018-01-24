import * as tagSelectors from '_src/store/selectors/tag'

describe('getTagsForType', () => {
  it('should return null when the reducer is not for the requested tag type', () => {
    const state = { tag: { tagType: 'medium', tags: [{ id: 1 }] } }
    const result = tagSelectors.getTagsForType(state, 'audience')
    expect(result).toEqual(null)
  })

  it('should return null when the reducer tags are for the requested tag type but are null', () => {
    const state = { tag: { tagType: 'medium', tags: null } }
    const result = tagSelectors.getTagsForType(state, 'medium')
    expect(result).toEqual(null)
  })

  it('should return empty tags when the reducer tags are for the requested tag type but are empty', () => {
    const state = { tag: { tagType: 'medium', tags: [] } }
    const result = tagSelectors.getTagsForType(state, 'medium')
    expect(result).toEqual([])
  })

  it('should return populated tags when the reducer tags are for the requested tag type and are not empty', () => {
    const state = { tag: { tagType: 'medium', tags: [{ id: 1 }] } }
    const result = tagSelectors.getTagsForType(state, 'medium')
    expect(result).toEqual([{ id: 1 }])
  })
})
