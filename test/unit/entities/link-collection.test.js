import { LinkCollection } from '_src/entities/link-collection'

it('should have correct getLinkByType when has link of type', () => {
  const links = [{ type: 'Twitter' }, { type: 'Facebook' }]
  const subject = new LinkCollection(links)
  expect(subject.getLinkByType('Facebook')).toEqual({ type: 'Facebook' })
})

it('should have correct getLinkByType when has no link of type', () => {
  const links = [{ type: 'Twitter' }]
  const subject = new LinkCollection(links)
  expect(subject.getLinkByType('Facebook')).toBe(null)
})

it('should have correct getLinkByType when has no links', () => {
  const subject = new LinkCollection()
  expect(subject.getLinkByType('Facebook')).toBe(null)
})
