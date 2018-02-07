import * as linkLib from './link'
import * as linkConstants from '_src/constants/link'

describe('getAvailableLinkTypeDropdownOptions', () => {
  it('should filter out link types in value', () => {
    const value = [
      { type: linkConstants.LINK_TYPE_WIKIPEDIA },
      { type: linkConstants.LINK_TYPE_TWITTER },
      { type: linkConstants.LINK_TYPE_ACCESS }
    ]

    const actual = linkLib.getAvailableLinkTypeDropdownOptions(value)

    expect(actual).toEqual([
      {
        value: linkConstants.LINK_TYPE_HOMEPAGE,
        label: linkConstants.LINK_TYPE_HOMEPAGE
      },
      {
        value: linkConstants.LINK_TYPE_FACEBOOK,
        label: linkConstants.LINK_TYPE_FACEBOOK
      },
      {
        value: linkConstants.LINK_TYPE_INSTAGRAM,
        label: linkConstants.LINK_TYPE_INSTAGRAM
      },
      {
        value: linkConstants.LINK_TYPE_BOOKING,
        label: linkConstants.LINK_TYPE_BOOKING
      }
    ])
  })
})

describe('validateLink', () => {
  const tests = [
    {
      it: 'should pass a homepage url',
      args: {
        linkType: 'Homepage',
        linkUrl: 'https://anything.at.all/'
      },
      shouldValidate: true
    },
    {
      it: 'should fail an invalid twitter url',
      args: {
        linkType: 'Twitter',
        linkUrl: 'https://www.facebook.com/foo'
      },
      shouldValidate: false
    },
    {
      it: 'should pass a valid twitter url',
      args: {
        linkType: 'Twitter',
        linkUrl: 'https://twitter.com/foo'
      },
      shouldValidate: true
    },
    {
      it: 'should fail an invalid facebook url',
      args: {
        linkType: 'Facebook',
        linkUrl: 'http://test.com'
      },
      shouldValidate: false
    },
    {
      it: 'should pass a valid facebook url',
      args: {
        linkType: 'Facebook',
        linkUrl: 'https://www.facebook.com/foo'
      },
      shouldValidate: true
    },
    {
      it: 'should fail an invalid wikipedia url',
      args: {
        linkType: 'Wikipedia',
        linkUrl: 'https://www.facebook.com/foo'
      },
      shouldValidate: false
    },
    {
      it: 'should pass a valid wikipedia url',
      args: {
        linkType: 'Wikipedia',
        linkUrl: 'https://en.wikipedia.org/foo'
      },
      shouldValidate: true
    },
    {
      it: 'should fail an invalid instagram url',
      args: {
        linkType: 'Instagram',
        linkUrl: 'https://instagram.com/foo'
      },
      shouldValidate: false
    },
    {
      it: 'should pass a valid instagram url',
      args: {
        linkType: 'Instagram',
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
