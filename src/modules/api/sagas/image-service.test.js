import { call } from 'redux-saga/effects'

import * as sagas from './image-service'
import * as fetchLib from '_src/shared/lib/fetch'
import { getAuthTokenForCurrentUser } from '_src/modules/user'
import entityType from '_src/domain/types/entity-type'

describe('addImage', () => {
  it('should add an image', () => {
    const generator = sagas.addImage(
      entityType.TALENT,
      'some-id',
      '/some/url',
      'Some copyright',
      true
    )

    let result = generator.next()
    expect(result.value).toEqual(call(getAuthTokenForCurrentUser))

    result = generator.next('some-token')
    expect(result.value).toEqual(
      call(
        fetchLib.put,
        'https://api.test.com/image-service/image/some-id',
        { url: '/some/url', type: entityType.TALENT },
        'some-token'
      )
    )

    result = generator.next({ image: { ratio: 3, dominantColor: 'AAAAAA' } })
    expect(result.value).toEqual({
      key: 'some-id',
      id: 'some-id',
      copyright: 'Some copyright',
      isMain: true,
      ratio: 3,
      dominantColor: 'AAAAAA'
    })

    expect(result.done).toEqual(true)
  })
})
