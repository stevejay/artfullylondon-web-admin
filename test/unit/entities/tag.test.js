import { Tag } from '_admin/entities/tag'

it('should have correct entityType', () => {
  const subject = new Tag({})
  expect(subject.entityType).toBe('tag')
})

it('should have correct id', () => {
  const subject = new Tag({ id: 'some-id' })
  expect(subject.id).toBe('some-id')
})

it('should have correct key', () => {
  const subject = new Tag({ id: 'some-id' })
  expect(subject.key).toBe('some-id')
})

it('should have correct name', () => {
  const subject = new Tag({ name: 'The Name' })
  expect(subject.name).toBe('The Name')
})

it('should have correct isBeingWatched when is being watched', () => {
  const watches = { 'some-id': true }
  const subject = new Tag({ id: 'some-id' })
  expect(subject.isBeingWatched(watches)).toBe(true)
})

it('should have correct isBeingWatched when is not being watched', () => {
  const watches = {}
  const subject = new Tag({ id: 'some-id' })
  expect(subject.isBeingWatched(watches)).toBe(false)
})

it('should have correct createWatchLabel', () => {
  const subject = new Tag({ label: 'The Label' })
  expect(subject.createWatchLabel()).toBe('The Label')
})
