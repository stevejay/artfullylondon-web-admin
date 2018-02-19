import { Entity } from './entity'

describe('isNew', () => {
  it('should return correct value for a new entity', () => {
    const subject = new Entity({})
    expect(subject.isNew()).toEqual(true)
  })

  it('should return correct value for an existing entity', () => {
    const subject = new Entity({ id: 'some-id' })
    expect(subject.isNew()).toEqual(false)
  })
})

describe('getLinkByType', () => {
  it('should handle a link that exists', () => {
    const subject = new Entity({
      links: [
        { type: 'Wikipedia', url: '/some/wikipedia/url' },
        { type: 'Facebook', url: '/some/facebook/url' }
      ]
    })

    expect(subject.getLinkByType('Wikipedia')).toEqual({
      type: 'Wikipedia',
      url: '/some/wikipedia/url'
    })
  })

  it('should handle a link that does not exists', () => {
    const subject = new Entity({
      links: [{ type: 'Facebook', url: '/some/facebook/url' }]
    })

    expect(subject.getLinkByType('Wikipedia')).toEqual(null)
  })

  it('should handle null links', () => {
    const subject = new Entity({})
    expect(subject.getLinkByType('Wikipedia')).toEqual(null)
  })
})

describe('createFormattedDescription', () => {
  it('should handle no description', () => {
    const subject = new Entity({})

    expect(subject.createFormattedDescription()).toEqual(
      '<p>We do not have a description.</p>'
    )
  })

  it('should handle a description', () => {
    const subject = new Entity({ description: 'Foo' })
    expect(subject.createFormattedDescription()).toEqual('Foo')
  })

  it('should handle a description with a credit', () => {
    const subject = new Entity({
      description: 'Foo',
      descriptionCredit: 'Some credit'
    })

    expect(subject.createFormattedDescription()).toEqual(
      'Foo<p><em>(Description by Some credit.)</em></p>'
    )
  })
})
