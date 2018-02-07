import * as sagas from './index'

describe('getImages', () => {
  it('should get the images', () => {
    const generator = sagas.getImages('ParentFormName')

    let result = generator.next()

    result = generator.next({ images: [{ id: 1 }] })

    expect(result.value).toEqual([{ id: 1 }])

    result = generator.next()

    expect(result.done).toEqual(true)
  })
})
