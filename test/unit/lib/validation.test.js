import { SubmissionError } from 'redux-form'
import { ensure } from 'ensure-request'

import * as validation from '_src/lib/validation'

describe('email validation', () => {
  const tests = [
    {
      arg: 'test@test.com',
      expectedValid: true
    },
    {
      arg: 'testattest.com',
      expectedValid: false
    }
  ]

  const constraint = {
    email: {
      email: true
    }
  }

  tests.map(test => {
    it(`should return as ${test.expectedValid ? 'valid' : 'invalid'} when passed ${JSON.stringify(test.arg)}`, () => {
      const errors = ensure({ email: test.arg }, constraint) || {}

      if (test.expectedValid) {
        expect(errors).toEqual({})
      } else {
        expect(errors).not.toEqual({})
      }
    })
  })
})

describe('validate with error return', () => {
  const tests = [
    {
      args: {
        values: {},
        constraints: {},
        additionalConstraints: null
      },
      failureExpected: false
    },
    {
      args: {
        values: {},
        constraints: {},
        additionalConstraints: () => {}
      },
      failureExpected: false
    },
    {
      args: {
        values: {},
        constraints: {},
        additionalConstraints: (_, errors) => (errors.fail = 'fail')
      },
      failureExpected: true
    },
    {
      args: {
        values: { name: 'foo' },
        constraints: { address: { length: { maximum: 10 } } },
        additionalConstraints: null
      },
      failureExpected: false
    },
    {
      args: {
        values: { name: 'foo' },
        constraints: { name: { presence: true } },
        additionalConstraints: null
      },
      failureExpected: false
    },
    {
      args: {
        values: { name: null },
        constraints: { name: { presence: true } },
        additionalConstraints: null
      },
      failureExpected: true
    }
  ]

  tests.map(test => {
    it(`should ${test.failureExpected ? '' : 'not'} return errors when passed ${JSON.stringify(test.args)}`, function (
      done
    ) {
      validation
        .validate(
          test.args.values,
          test.args.constraints,
          test.args.additionalConstraints,
          true
        )
        .then(values => {
          if (test.failureExpected) {
            if (values === null) {
              done(new Error('Should have returned errors'))
            } else {
              done()
            }
          } else {
            if (values === null) {
              done()
            } else {
              done(new Error('Should not have returned errors'))
            }
          }
        })
        .catch(err => {
          done(err)
        })
    })
  })
})

describe('validate', () => {
  const tests = [
    {
      args: {
        values: {},
        constraints: {},
        additionalConstraints: null
      },
      failureExpected: false
    },
    {
      args: {
        values: {},
        constraints: {},
        additionalConstraints: () => {}
      },
      failureExpected: false
    },
    {
      args: {
        values: {},
        constraints: {},
        additionalConstraints: (_, errors) => (errors.fail = 'fail')
      },
      failureExpected: true
    },
    {
      args: {
        values: { name: 'foo' },
        constraints: { address: { length: { maximum: 10 } } },
        additionalConstraints: null
      },
      failureExpected: false
    },
    {
      args: {
        values: { name: 'foo' },
        constraints: { name: { presence: true } },
        additionalConstraints: null
      },
      failureExpected: false
    },
    {
      args: {
        values: { name: null },
        constraints: { name: { presence: true } },
        additionalConstraints: null
      },
      failureExpected: true
    }
  ]

  tests.map(test => {
    it(`should ${test.failureExpected ? 'throw' : 'not throw'} when passed ${JSON.stringify(test.args)}`, function (
      done
    ) {
      validation
        .validate(
          test.args.values,
          test.args.constraints,
          test.args.additionalConstraints
        )
        .then(values => {
          if (test.failureExpected) {
            done(new Error('Should have thrown SubmissionError'))
          } else if (values !== test.args.values) {
            done(new Error('Incorrect values returned'))
          } else {
            done()
          }
        })
        .catch(err => {
          if (!test.failureExpected) {
            done(err)
          } else if (!(err instanceof SubmissionError)) {
            done(new Error('Incorrect error type thrown'))
          } else {
            done()
          }
        })
    })
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
      validation.validateLink(test.args, errors)
      expect(Object.keys(errors).length).toBe(test.shouldValidate ? 0 : 1)
    })
  })
})
