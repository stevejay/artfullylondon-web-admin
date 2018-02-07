import { put, call } from 'redux-saga/effects'
import { cloneableGenerator } from 'redux-saga/utils'
import log from 'loglevel'
import { change, startSubmit, stopSubmit, reset } from 'redux-form'

import normalise from '_src/lib/normalise'
import * as validationLib from '_src/lib/validation'
import * as linkLib from '_src/modules/link/lib/link'
import * as sagaLib from '_src/lib/saga'
import * as sagas from './index'
import * as linkActions from '_src/modules/link/actions'
import * as linkConstants from '_src/modules/link/constants'

describe('deleteLink', () => {
  const generator = cloneableGenerator(sagas.deleteLink)(
    linkActions.deleteLink('2', 'ParentFormName')
  )

  it('should prepare to delete the link', () => {
    let result = generator.next()

    expect(result.value).toEqual(call(sagas.getLinks, 'ParentFormName'))
  })

  it('should successfully delete the link', () => {
    const generatorClone = generator.clone()

    let result = generatorClone.next([
      { key: '1', url: '/url/1' },
      { key: '2', url: '/url/2' }
    ])

    expect(result.value).toEqual(
      put(change('ParentFormName', 'links', [{ key: '1', url: '/url/1' }]))
    )

    result = generatorClone.next()

    expect(result.done).toEqual(true)
  })

  it('should handle an error being thrown', () => {
    const generatorClone = generator.clone()

    const error = new Error('deliberately thrown')
    let result = generatorClone.throw(error)

    expect(result.value).toEqual(call(log.error, error))

    result = generatorClone.next()

    expect(result.done).toEqual(true)
  })
})

describe('getLinks', () => {
  it('should get the links', () => {
    const generator = sagas.getLinks('ParentFormName')

    let result = generator.next()

    result = generator.next({ links: [{ id: 1 }] })

    expect(result.value).toEqual([{ id: 1 }])

    result = generator.next()

    expect(result.done).toEqual(true)
  })
})

describe('addLink', () => {
  const generator = cloneableGenerator(sagas.addLink)(
    linkActions.addLink(
      { linkType: 'Facebook', linkUrl: '/some/url' },
      'ParentFormName'
    )
  )

  it('should prepare to add the link', () => {
    let result = generator.next()

    expect(result.value).toEqual(
      put(startSubmit(linkConstants.LINK_EDITOR_FORM_NAME))
    )

    result = generator.next()

    expect(result.value).toEqual(
      call(
        normalise,
        { linkType: 'Facebook', linkUrl: '/some/url' },
        linkConstants.LINK_NORMALISER
      )
    )

    result = generator.next({
      linkType: 'Facebook',
      linkUrl: '/some/normalised/url'
    })

    expect(result.value).toEqual(
      call(
        validationLib.validate,
        { linkType: 'Facebook', linkUrl: '/some/normalised/url' },
        linkConstants.LINK_CONSTRAINT,
        linkLib.validateLink
      )
    )
  })

  it('should successfully add the link', () => {
    const generatorClone = generator.clone()

    let result = generatorClone.next()

    expect(result.value).toEqual(call(sagas.getLinks, 'ParentFormName'))

    result = generatorClone.next([
      { key: 'Instagram', type: 'Instagram', url: '/url/1' }
    ])

    expect(result.value).toEqual(
      put(
        change('ParentFormName', 'links', [
          { key: 'Instagram', type: 'Instagram', url: '/url/1' },
          { key: 'Facebook', type: 'Facebook', url: '/some/normalised/url' }
        ])
      )
    )

    result = generatorClone.next()

    expect(result.value).toEqual(
      put(reset(linkConstants.LINK_EDITOR_FORM_NAME))
    )

    result = generatorClone.next()

    expect(result.value).toEqual(
      put(stopSubmit(linkConstants.LINK_EDITOR_FORM_NAME))
    )

    result = generatorClone.next()

    expect(result.done).toEqual(true)
  })

  it('should handle an error being thrown', () => {
    const generatorClone = generator.clone()

    const error = new Error('deliberately thrown')
    let result = generatorClone.throw(error)

    expect(result.value).toEqual(call(log.error, error))

    result = generatorClone.next()

    expect(result.value).toEqual(
      call(
        sagaLib.submitErrorHandler,
        error,
        linkConstants.LINK_EDITOR_FORM_NAME
      )
    )

    result = generatorClone.next()

    expect(result.done).toEqual(true)
  })
})
