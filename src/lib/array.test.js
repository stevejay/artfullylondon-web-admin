import array from '_src/lib/array'

describe('addElement', () => {
  it('should return null when element is already in the array by key', () => {
    const actual = array.addElement([{ key: 'a' }, { key: 'b' }], { key: 'b' })
    expect(actual).toEqual(null)
  })

  it('should return null when element is already in the array by value', () => {
    const actual = array.addElement(['a', 'b'], 'b')
    expect(actual).toEqual(null)
  })

  it('should return a new array when element is not already in the array by key', () => {
    const actual = array.addElement([{ key: 'a' }, { key: 'b' }], { key: 'c' })
    expect(actual).toEqual([{ key: 'a' }, { key: 'b' }, { key: 'c' }])
  })

  it('should return a new array when element is not already in the array by value', () => {
    const actual = array.addElement(['a', 'b'], 'c')
    expect(actual).toEqual(['a', 'b', 'c'])
  })
})

describe('removeElementByKey', () => {
  it('should remove an element that exists by key', () => {
    const actual = array.removeElementByKey([{ key: 'a' }, { key: 'b' }], 'b')
    expect(actual).toEqual([{ key: 'a' }])
  })

  it('should remove an element that exists by value', () => {
    const actual = array.removeElementByKey(['a', 'b'], 'b')
    expect(actual).toEqual(['a'])
  })

  it('should not remove an element that does not exist', () => {
    const actual = array.removeElementByKey([{ key: 'a' }, { key: 'b' }], 'c')
    expect(actual).toEqual([{ key: 'a' }, { key: 'b' }])
  })
})

describe('updateElementByKey', () => {
  it('should update an existing element by key', () => {
    const actual = array.updateElementByKey(
      [{ key: 'a', value: 1 }, { key: 'b', value: 2 }, { key: 'c', value: 3 }],
      'b',
      { value: 22, foo: 'bar' }
    )

    expect(actual).toEqual([
      { key: 'a', value: 1 },
      { key: 'b', value: 22, foo: 'bar' },
      { key: 'c', value: 3 }
    ])
  })

  it('should not update a non-existing element by key', () => {
    const actual = array.updateElementByKey(
      [{ key: 'a', value: 1 }, { key: 'b', value: 2 }, { key: 'c', value: 3 }],
      'd',
      { value: 22, foo: 'bar' }
    )

    expect(actual).toEqual([
      { key: 'a', value: 1 },
      { key: 'b', value: 2 },
      { key: 'c', value: 3 }
    ])
  })
})
