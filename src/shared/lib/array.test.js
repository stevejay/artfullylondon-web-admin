import * as arrayLib from '_src/shared/lib/array'

describe('addElement', () => {
  it('should return null for an element that already exists by key', () => {
    const actual = arrayLib.addElement([{ key: 'a' }, { key: 'b' }], {
      key: 'b'
    })

    expect(actual).toEqual(null)
  })

  it('should return null for an element that already exists by value', () => {
    const actual = arrayLib.addElement(['a', 'b'], 'b')
    expect(actual).toEqual(null)
  })

  it('should add the element', () => {
    const actual = arrayLib.addElement([{ key: 'a' }], {
      key: 'b'
    })

    expect(actual).toEqual([{ key: 'a' }, { key: 'b' }])
  })
})

describe('removeElementByKey', () => {
  it('should remove an element that exists by key', () => {
    const actual = arrayLib.removeElementByKey(
      [{ key: 'a' }, { key: 'b' }],
      'b'
    )

    expect(actual).toEqual([{ key: 'a' }])
  })

  it('should remove an element that exists by value', () => {
    const actual = arrayLib.removeElementByKey(['a', 'b'], 'b')
    expect(actual).toEqual(['a'])
  })

  it('should not remove an element that does not exist', () => {
    const actual = arrayLib.removeElementByKey(
      [{ key: 'a' }, { key: 'b' }],
      'c'
    )

    expect(actual).toEqual([{ key: 'a' }, { key: 'b' }])
  })
})

describe('updateElementByKey', () => {
  it('should update an existing element by key', () => {
    const actual = arrayLib.updateElementByKey(
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
    const actual = arrayLib.updateElementByKey(
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
