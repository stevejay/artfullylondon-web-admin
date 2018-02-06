import { call, put } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import log from 'loglevel'
import { initialize } from 'redux-form'
import { cloneableGenerator } from 'redux-saga/utils'

import normalise from '_src/lib/normalise'
import history from '_src/history'
import * as sagaLib from '_src/lib/saga'
import * as fetchLib from '_src/lib/fetch'
import * as validationLib from '_src/lib/validation'
import * as sagas from './index'
import * as searchActions from '_src/modules/search/actions'
import * as searchConstants from '_src/modules/search/constants'
import * as searchLib from '_src/modules/search/lib/search'
import * as formConstants from '_src/constants/form'

describe('pushBasicSearchToUrl', () => {
  it('should create the url and push it', () => {
    const generator = sagas.pushBasicSearchToUrl(
      searchActions.pushBasicSearchToUrl({
        query: { term: 'foo' },
        skip: 10,
        take: 20
      })
    )

    let result = generator.next()

    expect(result.value).toEqual(
      call(
        normalise,
        { term: 'foo' },
        searchConstants.BASIC_SEARCH_QUERY_NORMALISER
      )
    )

    result = generator.next({ term: 'normalised foo' })

    expect(result.value).toEqual(
      call(
        validationLib.validate,
        { term: 'normalised foo' },
        searchConstants.BASIC_SEARCH_QUERY_CONSTRAINT,
        null
      )
    )

    result = generator.next()

    expect(result.value).toEqual(
      call(
        searchLib.createSearchPageUrl,
        '/search',
        { term: 'normalised foo' },
        10,
        20
      )
    )

    result = generator.next('/some/request/url')

    expect(result.value).toEqual(call(history.push, '/some/request/url'))

    result = generator.next()

    expect(result.done).toEqual(true)
  })

  it('should handle an error', () => {
    const generator = sagas.pushBasicSearchToUrl(
      searchActions.pushBasicSearchToUrl({
        query: { term: 'foo' },
        skip: 10,
        take: 20
      })
    )

    let result = generator.next()

    expect(result.value).toEqual(
      call(
        normalise,
        { term: 'foo' },
        searchConstants.BASIC_SEARCH_QUERY_NORMALISER
      )
    )

    const error = new Error('deliberately thrown')
    result = generator.throw(error)

    expect(result.value).toEqual(call(log.error, error))

    result = generator.next()

    expect(result.done).toEqual(true)
  })
})

describe('navigateToEntity', () => {
  it('should navigate to the entity', () => {
    const generator = sagas.navigateToEntity(
      searchActions.navigateToEntity({
        entityType: 'event',
        id: 'some-event-id'
      })
    )

    let result = generator.next()

    expect(result.value).toEqual(call(history.push, '/event/some-event-id'))

    result = generator.next()

    expect(result.done).toEqual(true)
  })
})

describe('search', () => {
  it('should handle an autocomplete search', () => {
    const action = searchActions.autocompleteSearch('some term', 'event')
    const generator = sagas.search(action)

    let result = generator.next()

    expect(result.value).toEqual(call(sagas.autocompleteSearch, action))

    result = generator.next()

    expect(result.done).toEqual(true)
  })

  it('should handle a basic search', () => {
    const action = searchActions.search({
      term: 'some term',
      searchType: searchConstants.SEARCH_TYPE_BASIC
    })

    const generator = sagas.search(action)

    let result = generator.next()

    expect(result.value).toEqual(call(sagas.basicSearch, action))

    result = generator.next()

    expect(result.done).toEqual(true)
  })

  it('should handle an error', () => {
    const action = searchActions.autocompleteSearch('some term', 'event')
    const generator = sagas.search(action)

    let result = generator.next()

    expect(result.value).toEqual(call(sagas.autocompleteSearch, action))

    const error = new Error('deliberately thrown')
    result = generator.throw(error)

    expect(result.value).toEqual(call(log.error, error))

    result = generator.next()

    expect(result.done).toEqual(true)
  })
})

describe('basicSearch', () => {
  const action = searchActions.search({
    query: { term: 'some term' },
    searchType: searchConstants.SEARCH_TYPE_BASIC
  })

  const generator = cloneableGenerator(sagas.basicSearch)(action)

  it('should handle normalising and validating the query', () => {
    let result = generator.next()

    expect(result.value).toEqual(
      call(
        normalise,
        { term: 'some term' },
        searchConstants.BASIC_SEARCH_QUERY_NORMALISER
      )
    )

    result = generator.next({ term: 'normalised term' })

    expect(result.value).toEqual(
      call(
        validationLib.validate,
        { term: 'normalised term' },
        searchConstants.BASIC_SEARCH_QUERY_CONSTRAINT,
        null,
        true
      )
    )
  })

  it('should handle a query that passes validation', () => {
    const generatorClone = generator.clone()

    let result = generatorClone.next(null)

    expect(result.value).toEqual(
      call(searchLib.createBasicSearchRequestUrl, { term: 'normalised term' })
    )

    result = generatorClone.next('https://some/request/url')

    expect(result.value).toEqual(put(searchActions.startingBasicSearch()))

    result = generatorClone.next()

    expect(result.value).toEqual(
      put(searchActions.setBasicSearchParams({ term: 'normalised term' }))
    )

    result = generatorClone.next()

    expect(result.value).toEqual(
      put(
        initialize(formConstants.BASIC_SEARCH_FORM_NAME, {
          term: 'normalised term'
        })
      )
    )

    result = generatorClone.next()

    expect(result.value).toEqual(call(fetchLib.get, 'https://some/request/url'))

    result = generatorClone.next({ the: 'json' })

    expect(result.value).toEqual(
      put(searchActions.basicSearchSucceeded({ the: 'json' }))
    )

    result = generatorClone.next()

    expect(result.done).toEqual(true)
  })

  it('should handle a query that fails validation', () => {
    const generatorClone = generator.clone()

    const errors = ['some error']
    let result = generatorClone.next(errors)

    expect(result.value).toEqual(
      call(log.error, 'basicSearch validation errors', errors)
    )

    result = generatorClone.next()

    expect(result.done).toEqual(true)
  })

  it('should handle an error being raised', () => {
    const generatorClone = generator.clone()

    const error = new Error('deliberately thrown')
    let result = generatorClone.throw(error)

    expect(result.value).toEqual(call(log.error, error))

    result = generatorClone.next()

    expect(result.value).toEqual(
      call(
        sagaLib.submitErrorHandler,
        error,
        formConstants.BASIC_SEARCH_FORM_NAME
      )
    )

    result = generatorClone.next()

    expect(result.value).toEqual(put(searchActions.basicSearchFailed()))

    result = generatorClone.next()

    expect(result.done).toEqual(true)
  })
})

describe('autocompleteSearch', () => {
  const action = searchActions.autocompleteSearch('some term', 'event')
  const meta = { some: 'meta' }

  const generator = cloneableGenerator(sagas.autocompleteSearch)({
    ...action,
    meta
  })

  it('should handle normalising and validating the query', () => {
    let result = generator.next()

    expect(result.value).toEqual(call(delay, 300))

    result = generator.next()

    expect(result.value).toEqual(
      call(
        normalise,
        { term: 'some term', entityType: 'event' },
        searchConstants.AUTO_SEARCH_QUERY_NORMALISER
      )
    )

    result = generator.next({ term: 'normalised term' })

    expect(result.value).toEqual(
      call(
        validationLib.validate,
        { term: 'normalised term' },
        searchConstants.AUTO_SEARCH_QUERY_CONSTRAINT,
        null
      )
    )
  })

  it('should handle a query that passes validation', () => {
    const generatorClone = generator.clone()

    let result = generatorClone.next()

    expect(result.value).toEqual(
      call(searchLib.createAutocompleteSearchRequestUrl, {
        term: 'normalised term'
      })
    )

    result = generatorClone.next('https://some/request/url')

    expect(result.value).toEqual(call(fetchLib.get, 'https://some/request/url'))

    result = generatorClone.next({ items: [{ id: 1 }] })

    expect(result.value).toEqual(
      put(
        sagaLib.returnAsPromise(
          [
            {
              id: 1,
              autocompleteItemType: searchConstants.AUTOCOMPLETE_ITEM_TYPE_ENTITY
            }
          ],
          meta
        )
      )
    )

    result = generatorClone.next()

    expect(result.done).toEqual(true)
  })

  it('should handle a query that fails validation', () => {
    const generatorClone = generator.clone()

    const error = new Error('deliberately thrown')
    let result = generatorClone.throw(error)

    expect(result.value).toEqual(call(log.error, error))

    result = generatorClone.next()

    expect(result.value).toEqual(put(sagaLib.returnAsPromise([], meta)))

    result = generatorClone.next()

    expect(result.done).toEqual(true)
  })
})
