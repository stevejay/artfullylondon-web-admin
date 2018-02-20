import { put, call, select } from 'redux-saga/effects'
import { cloneableGenerator } from 'redux-saga/utils'
import log from 'loglevel'
import {
  change,
  startSubmit,
  stopSubmit,
  reset,
  getFormValues
} from 'redux-form'

import normalise from '_src/shared/lib/normalise'
import * as validationLib from '_src/shared/lib/validation'
import * as sagaLib from '_src/shared/lib/saga'
import * as sagas from './index'
import * as linkActions from '../actions'
import * as linkConstants from '../constants'
import * as linkLib from '../lib/link'

describe('deleteLinkFromLinksFormValue', () => {
  it('should delete the link', () => {
    const generator = sagas.deleteLinkFromLinksFormValue(
      'ParentFormName',
      'some-key'
    )

    let result = generator.next()
    expect(result.value).toEqual(select(getFormValues, 'ParentFormName'))

    result = generator.next({
      links: [{ key: 'some-key' }, { key: 'some-other-key' }]
    })
    expect(result.value).toEqual([{ key: 'some-other-key' }])

    expect(result.done).toEqual(true)
  })
})

describe('deleteLink', () => {
  const generator = cloneableGenerator(sagas.deleteLink)(
    linkActions.deleteLink('2', 'ParentFormName')
  )

  it('should prepare to delete the link', () => {
    let result = generator.next()

    expect(result.value).toEqual(
      call(sagas.deleteLinkFromLinksFormValue, 'ParentFormName', '2')
    )
  })

  it('should successfully delete the link', () => {
    const generatorClone = generator.clone()

    let result = generatorClone.next([{ key: '1', url: '/url/1' }])
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

describe('addLinkToLinksFormValue', () => {
  it('should add the link', () => {
    const generator = sagas.addLinkToLinksFormValue('ParentFormName', {
      linkType: 'Wikipedia',
      linkUrl: '/some/url'
    })

    let result = generator.next()
    expect(result.value).toEqual(select(getFormValues, 'ParentFormName'))

    result = generator.next({ links: [{ id: 1 }] })
    expect(result.value).toEqual([
      { id: 1 },
      {
        key: 'Wikipedia',
        type: 'Wikipedia',
        url: '/some/url'
      }
    ])

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
    expect(result.value).toEqual(
      call(sagas.addLinkToLinksFormValue, 'ParentFormName', {
        linkType: 'Facebook',
        linkUrl: '/some/normalised/url'
      })
    )

    const links = [
      { key: 'Instagram', type: 'Instagram', url: '/url/1' },
      { key: 'Facebook', type: 'Facebook', url: '/some/normalised/url' }
    ]

    result = generatorClone.next(links)
    expect(result.value).toEqual(put(change('ParentFormName', 'links', links)))

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
