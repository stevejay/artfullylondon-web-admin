import * as linkLib from './link'
import linkType from '_src/domain/types/link-type'

describe('getAvailableLinkTypeDropdownOptions', () => {
  it('should filter out link types in value', () => {
    const value = [
      { type: linkType.WIKIPEDIA },
      { type: linkType.TWITTER },
      { type: linkType.ACCESS }
    ]

    const actual = linkLib.getAvailableLinkTypeDropdownOptions(value)

    expect(actual).toEqual([
      {
        value: linkType.HOMEPAGE,
        label: linkType.HOMEPAGE
      },
      {
        value: linkType.FACEBOOK,
        label: linkType.FACEBOOK
      },
      {
        value: linkType.INSTAGRAM,
        label: linkType.INSTAGRAM
      },
      {
        value: linkType.BOOKING,
        label: linkType.BOOKING
      }
    ])
  })
})

describe('validateLink', () => {
  const tests = [
    {
      it: 'should pass a homepage url',
      args: {
        linkType: linkType.HOMEPAGE,
        linkUrl: 'https://anything.at.all/'
      },
      shouldValidate: true
    },
    {
      it: 'should fail an invalid twitter url',
      args: {
        linkType: linkType.TWITTER,
        linkUrl: 'https://www.facebook.com/foo'
      },
      shouldValidate: false
    },
    {
      it: 'should pass a valid twitter url',
      args: {
        linkType: linkType.TWITTER,
        linkUrl: 'https://twitter.com/foo'
      },
      shouldValidate: true
    },
    {
      it: 'should fail an invalid facebook url',
      args: {
        linkType: linkType.FACEBOOK,
        linkUrl: 'http://test.com'
      },
      shouldValidate: false
    },
    {
      it: 'should pass a valid facebook url',
      args: {
        linkType: linkType.FACEBOOK,
        linkUrl: 'https://www.facebook.com/foo'
      },
      shouldValidate: true
    },
    {
      it: 'should fail an invalid wikipedia url',
      args: {
        linkType: linkType.WIKIPEDIA,
        linkUrl: 'https://www.facebook.com/foo'
      },
      shouldValidate: false
    },
    {
      it: 'should pass a valid wikipedia url',
      args: {
        linkType: linkType.WIKIPEDIA,
        linkUrl: 'https://en.wikipedia.org/foo'
      },
      shouldValidate: true
    },
    {
      it: 'should fail an invalid instagram url',
      args: {
        linkType: linkType.INSTAGRAM,
        linkUrl: 'https://instagram.com/foo'
      },
      shouldValidate: false
    },
    {
      it: 'should pass a valid instagram url',
      args: {
        linkType: linkType.INSTAGRAM,
        linkUrl: 'https://www.instagram.com/foo'
      },
      shouldValidate: true
    }
  ]

  tests.forEach(test => {
    it(test.it, () => {
      const errors = {}
      linkLib.validateLink(test.args, errors)
      expect(Object.keys(errors).length).toBe(test.shouldValidate ? 0 : 1)
    })
  })
})
