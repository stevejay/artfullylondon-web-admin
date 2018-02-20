import * as reduxLib from '_src/shared/lib/redux'

describe('mapSelectors', () => {
  it('should map selectors', () => {
    const appleModule = 'apple'

    const appleSelectors = {
      getAppleValue: state => state.value
    }

    const bananaModule = 'banana'

    const bananaSelectors = {
      getBananaName: state => state.name
    }

    const state = {
      [appleModule]: { value: 'the value' },
      [bananaModule]: { name: 'the name' }
    }

    const mapped = {
      ...reduxLib.mapSelectors(appleSelectors, appleModule),
      ...reduxLib.mapSelectors(bananaSelectors, bananaModule)
    }

    expect(mapped.getAppleValue).toBeTruthy()
    expect(mapped.getAppleValue(state)).toEqual('the value')

    expect(mapped.getBananaName).toBeTruthy()
    expect(mapped.getBananaName(state)).toEqual('the name')
  })
})

describe('combineSelectors', () => {
  it('should combine selectors when there are no duplicates', () => {
    const appleModule = 'apple'

    const appleSelectors = {
      getAppleValue: state => state.value
    }

    const bananaModule = 'banana'

    const bananaSelectors = {
      getBananaName: state => state.name
    }

    const state = {
      [appleModule]: { value: 'the value' },
      [bananaModule]: { name: 'the name' }
    }

    const mapped = reduxLib.combineSelectors(
      reduxLib.mapSelectors(appleSelectors, appleModule),
      reduxLib.mapSelectors(bananaSelectors, bananaModule)
    )

    expect(mapped.getAppleValue).toBeTruthy()
    expect(mapped.getAppleValue(state)).toEqual('the value')

    expect(mapped.getBananaName).toBeTruthy()
    expect(mapped.getBananaName(state)).toEqual('the name')
  })

  it('should throw an error when there is a duplicate', () => {
    const appleModule = 'apple'

    const appleSelectors = {
      getAppleValue: state => state.value
    }

    const bananaModule = 'banana'

    const bananaSelectors = {
      getAppleValue: state => state.name
    }

    expect(() =>
      reduxLib.combineSelectors(
        reduxLib.mapSelectors(appleSelectors, appleModule),
        reduxLib.mapSelectors(bananaSelectors, bananaModule)
      )
    ).toThrowError("Duplicate selector found for key 'getAppleValue'")
  })
})
