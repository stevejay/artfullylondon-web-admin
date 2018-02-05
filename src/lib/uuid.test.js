import * as uuidLib from '_src/lib/uuid'

it('should create a uuid', () => {
  const actual = uuidLib.create()
  expect(actual.length).toBe(32)
})
