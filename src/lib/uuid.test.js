import uuid from '_src/lib/uuid'

it('should create a uuid', () => {
  const actual = uuid()
  expect(actual.length).toBe(32)
})
