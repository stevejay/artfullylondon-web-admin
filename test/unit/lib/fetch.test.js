import * as fetchImpl from '_src/lib/fetch-impl'
import * as fetch from '_src/lib/fetch'

const SOME_URL = 'http://test.com'

describe('get', () => {
  it('should form a valid request without authorization', () => {
    fetchImpl.fetch = jest.fn().mockReturnValue(createResponse(200, {}))

    return fetch.get(SOME_URL).then(() => {
      expect(fetchImpl.fetch).toHaveBeenCalled()

      expect(fetchImpl.fetch.mock.calls[0]).toEqual([
        SOME_URL,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json'
          }
        }
      ])
    })
  })

  it('should form a valid request with authorization', () => {
    fetchImpl.fetch = jest.fn().mockReturnValue(createResponse(200, {}))

    return fetch.get(SOME_URL, 'auth1').then(() => {
      expect(fetchImpl.fetch).toHaveBeenCalled()

      expect(fetchImpl.fetch.mock.calls[0]).toEqual([
        SOME_URL,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: 'auth1'
          }
        }
      ])
    })
  })

  it('should throw an error for a 200 response with an error message', () => {
    fetchImpl.fetch = jest
      .fn()
      .mockReturnValue(createResponse(200, { errorMessage: 'error' }))

    return fetch
      .get(SOME_URL)
      .then(() => new Error('should have thrown'))
      .catch(err => {
        expect(err.statusCode).toEqual(400)
        return Promise.resolve()
      })
      .then(throwOnErr)
  })

  it('should throw an error for a CORS error', () => {
    fetchImpl.fetch = jest.fn().mockReturnValue(createResponse(0, {}))

    return fetch
      .get(SOME_URL)
      .then(() => new Error('should have thrown'))
      .catch(err => {
        expect(err.statusCode).toEqual(500)
        return Promise.resolve()
      })
      .then(throwOnErr)
  })

  it('should throw an error for a 400 already exists error', () => {
    fetchImpl.fetch = jest
      .fn()
      .mockReturnValue(
        createResponse(400, { errorMessage: 'foo already exists' })
      )

    return fetch
      .get(SOME_URL)
      .then(() => new Error('should have thrown'))
      .catch(err => {
        expect(err.statusCode).toEqual(400)
        return Promise.resolve()
      })
      .then(throwOnErr)
  })

  it('should throw an error for a 400 bad request error', () => {
    fetchImpl.fetch = jest
      .fn()
      .mockReturnValue(createResponse(400, { errorMessage: 'some error' }))

    return fetch
      .get(SOME_URL)
      .then(() => new Error('should have thrown'))
      .catch(err => {
        expect(err.statusCode).toEqual(400)
        return Promise.resolve()
      })
      .then(throwOnErr)
  })

  it('should throw an error for a 401 unauthorized error', () => {
    fetchImpl.fetch = jest.fn().mockReturnValue(createResponse(401, {}))

    return fetch
      .get(SOME_URL)
      .then(() => new Error('should have thrown'))
      .catch(err => {
        expect(err.statusCode).toEqual(401)
        return Promise.resolve()
      })
      .then(throwOnErr)
  })

  it('should throw an error for a 500 error', () => {
    fetchImpl.fetch = jest.fn().mockReturnValue(createResponse(500, {}))

    return fetch
      .get(SOME_URL)
      .then(() => new Error('should have thrown'))
      .catch(err => {
        expect(err.statusCode).toEqual(500)
        return Promise.resolve()
      })
      .then(throwOnErr)
  })
})

describe('httpDelete', () => {
  it('should form a valid request without authorization', () => {
    fetchImpl.fetch = jest.fn().mockReturnValue(createResponse(200, {}))

    return fetch.httpDelete(SOME_URL).then(() => {
      expect(fetchImpl.fetch).toHaveBeenCalled()

      expect(fetchImpl.fetch.mock.calls[0]).toEqual([
        SOME_URL,
        {
          method: 'DELETE',
          headers: {
            Accept: 'application/json'
          }
        }
      ])
    })
  })

  it('should form a valid request with authorization', () => {
    fetchImpl.fetch = jest.fn().mockReturnValue(createResponse(200, {}))

    return fetch.httpDelete(SOME_URL, 'auth1').then(() => {
      expect(fetchImpl.fetch).toHaveBeenCalled()

      expect(fetchImpl.fetch.mock.calls[0]).toEqual([
        SOME_URL,
        {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            Authorization: 'auth1'
          }
        }
      ])
    })
  })

  it('should not throw an error for a 200 response', () => {
    fetchImpl.fetch = jest.fn().mockReturnValue(createResponse(200, {}))

    return fetch.httpDelete(SOME_URL).then(() => {
      expect(fetchImpl.fetch).toHaveBeenCalled()

      expect(fetchImpl.fetch.mock.calls[0]).toEqual([
        SOME_URL,
        {
          method: 'DELETE',
          headers: {
            Accept: 'application/json'
          }
        }
      ])
    })
  })

  it('should throw an error for a 200 response with an error message', () => {
    fetchImpl.fetch = jest
      .fn()
      .mockReturnValue(createResponse(200, { errorMessage: 'some error' }))

    return fetch
      .httpDelete(SOME_URL)
      .then(() => new Error('should have thrown'))
      .catch(err => {
        expect(err.statusCode).toEqual(400)
        return Promise.resolve()
      })
      .then(throwOnErr)
  })

  it('should throw an error for a CORS error', () => {
    fetchImpl.fetch = jest.fn().mockReturnValue(createResponse(0, {}))

    return fetch
      .httpDelete(SOME_URL)
      .then(() => new Error('should have thrown'))
      .catch(err => {
        expect(err.statusCode).toEqual(500)
        return Promise.resolve()
      })
      .then(throwOnErr)
  })

  it('should throw an error for a 400 already exists error', () => {
    fetchImpl.fetch = jest
      .fn()
      .mockReturnValue(
        createResponse(400, { errorMessage: 'foo already exists' })
      )

    return fetch
      .httpDelete(SOME_URL)
      .then(() => new Error('should have thrown'))
      .catch(err => {
        expect(err.statusCode).toEqual(400)
        return Promise.resolve()
      })
      .then(throwOnErr)
  })

  it('should throw an error for a 400 bad request error', () => {
    fetchImpl.fetch = jest
      .fn()
      .mockReturnValue(createResponse(400, { errorMessage: 'some error' }))

    return fetch
      .httpDelete(SOME_URL)
      .then(() => new Error('should have thrown'))
      .catch(err => {
        expect(err.statusCode).toEqual(400)
        return Promise.resolve()
      })
      .then(throwOnErr)
  })

  it('should throw an error for a 401 unauthorized error', () => {
    fetchImpl.fetch = jest.fn().mockReturnValue(createResponse(401, {}))

    return fetch
      .httpDelete(SOME_URL)
      .then(() => new Error('should have thrown'))
      .catch(err => {
        expect(err.statusCode).toEqual(401)
        return Promise.resolve()
      })
      .then(throwOnErr)
  })

  it('should throw an error for a 500 error', () => {
    fetchImpl.fetch = jest.fn().mockReturnValue(createResponse(500, {}))

    return fetch
      .httpDelete(SOME_URL)
      .then(() => new Error('should have thrown'))
      .catch(err => {
        expect(err.statusCode).toEqual(500)
        return Promise.resolve()
      })
      .then(throwOnErr)
  })
})

describe('put', () => {
  it('should form a valid request without authorization', () => {
    fetchImpl.fetch = jest.fn().mockReturnValue(createResponse(200, {}))

    return fetch.put(SOME_URL, { key: 'value' }).then(() => {
      expect(fetchImpl.fetch).toHaveBeenCalled()

      expect(fetchImpl.fetch.mock.calls[0]).toEqual([
        SOME_URL,
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: '{"key":"value"}'
        }
      ])
    })
  })

  it('should form a valid request with authorization', () => {
    fetchImpl.fetch = jest.fn().mockReturnValue(createResponse(200, {}))

    return fetch.put(SOME_URL, { key: 'value' }, 'auth1').then(() => {
      expect(fetchImpl.fetch).toHaveBeenCalled()

      expect(fetchImpl.fetch.mock.calls[0]).toEqual([
        SOME_URL,
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'auth1'
          },
          body: '{"key":"value"}'
        }
      ])
    })
  })

  it('should throw an error for a 200 response with an error message', () => {
    fetchImpl.fetch = jest
      .fn()
      .mockReturnValue(createResponse(200, { errorMessage: 'some error' }))

    return fetch
      .put(SOME_URL, { key: 'value' })
      .then(() => new Error('should have thrown'))
      .catch(err => {
        expect(err.statusCode).toEqual(400)
        return Promise.resolve()
      })
      .then(throwOnErr)
  })

  it('should throw an error for a CORS error', () => {
    fetchImpl.fetch = jest.fn().mockReturnValue(createResponse(0, {}))

    return fetch
      .put(SOME_URL, { key: 'value' })
      .then(() => new Error('should have thrown'))
      .catch(err => {
        expect(err.statusCode).toEqual(500)
        return Promise.resolve()
      })
      .then(throwOnErr)
  })

  it('should throw an error for a 400 already exists error', () => {
    fetchImpl.fetch = jest
      .fn()
      .mockReturnValue(
        createResponse(400, { errorMessage: 'foo already exists' })
      )

    return fetch
      .put(SOME_URL, { key: 'value' })
      .then(() => new Error('should have thrown'))
      .catch(err => {
        expect(err.statusCode).toEqual(400)
        return Promise.resolve()
      })
      .then(throwOnErr)
  })

  it('should throw an error for a 400 bad request error', () => {
    fetchImpl.fetch = jest
      .fn()
      .mockReturnValue(createResponse(400, { errorMessage: 'some error' }))

    return fetch
      .put(SOME_URL, { key: 'value' })
      .then(() => new Error('should have thrown'))
      .catch(err => {
        expect(err.statusCode).toEqual(400)
        return Promise.resolve()
      })
      .then(throwOnErr)
  })

  it('should throw an error for a 401 unauthorized error', () => {
    fetchImpl.fetch = jest.fn().mockReturnValue(createResponse(401, {}))

    return fetch
      .put(SOME_URL, { key: 'value' })
      .then(() => new Error('should have thrown'))
      .catch(err => {
        expect(err.statusCode).toEqual(401)
        return Promise.resolve()
      })
      .then(throwOnErr)
  })

  it('should throw an error for a 500 error', () => {
    fetchImpl.fetch = jest.fn().mockReturnValue(createResponse(500, {}))

    return fetch
      .put(SOME_URL, { key: 'value' })
      .then(() => new Error('should have thrown'))
      .catch(err => {
        expect(err.statusCode).toEqual(500)
        return Promise.resolve()
      })
      .then(throwOnErr)
  })
})

describe('post', () => {
  it('should form a valid request without authorization', () => {
    fetchImpl.fetch = jest.fn().mockReturnValue(createResponse(200, {}))

    return fetch.post(SOME_URL, { key: 'value' }).then(() => {
      expect(fetchImpl.fetch).toHaveBeenCalled()

      expect(fetchImpl.fetch.mock.calls[0]).toEqual([
        SOME_URL,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: '{"key":"value"}'
        }
      ])
    })
  })

  it('should form a valid request with authorization', () => {
    fetchImpl.fetch = jest.fn().mockReturnValue(createResponse(200, {}))

    return fetch.post(SOME_URL, { key: 'value' }, 'auth1').then(() => {
      expect(fetchImpl.fetch).toHaveBeenCalled()

      expect(fetchImpl.fetch.mock.calls[0]).toEqual([
        SOME_URL,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'auth1'
          },
          body: '{"key":"value"}'
        }
      ])
    })
  })

  it('should throw an error for a 200 response with an error message', () => {
    fetchImpl.fetch = jest
      .fn()
      .mockReturnValue(createResponse(200, { errorMessage: 'some error' }))

    return fetch
      .post(SOME_URL, { key: 'value' })
      .then(() => new Error('should have thrown'))
      .catch(err => {
        expect(err.statusCode).toEqual(400)
        return Promise.resolve()
      })
      .then(throwOnErr)
  })

  it('should throw an error for a CORS error', () => {
    fetchImpl.fetch = jest.fn().mockReturnValue(createResponse(0, {}))

    return fetch
      .post(SOME_URL, { key: 'value' })
      .then(() => new Error('should have thrown'))
      .catch(err => {
        expect(err.statusCode).toEqual(500)
        return Promise.resolve()
      })
      .then(throwOnErr)
  })

  it('should throw an error for a 400 already exists error', () => {
    fetchImpl.fetch = jest
      .fn()
      .mockReturnValue(
        createResponse(400, { errorMessage: 'foo already exists' })
      )

    return fetch
      .post(SOME_URL, { key: 'value' })
      .then(() => new Error('should have thrown'))
      .catch(err => {
        expect(err.statusCode).toEqual(400)
        return Promise.resolve()
      })
      .then(throwOnErr)
  })

  it('should throw an error for a 400 bad request error', () => {
    fetchImpl.fetch = jest
      .fn()
      .mockReturnValue(createResponse(400, { errorMessage: 'some error' }))

    return fetch
      .post(SOME_URL, { key: 'value' })
      .then(() => new Error('should have thrown'))
      .catch(err => {
        expect(err.statusCode).toEqual(400)
        return Promise.resolve()
      })
      .then(throwOnErr)
  })

  it('should throw an error for a 401 unauthorized error', () => {
    fetchImpl.fetch = jest.fn().mockReturnValue(createResponse(401, {}))

    return fetch
      .post(SOME_URL, { key: 'value' })
      .then(() => new Error('should have thrown'))
      .catch(err => {
        expect(err.statusCode).toEqual(401)
        return Promise.resolve()
      })
      .then(throwOnErr)
  })

  it('should throw an error for a 500 error', () => {
    fetchImpl.fetch = jest.fn().mockReturnValue(createResponse(500, {}))

    return fetch
      .post(SOME_URL, { key: 'value' })
      .then(() => new Error('should have thrown'))
      .catch(err => {
        expect(err.statusCode).toEqual(500)
        return Promise.resolve()
      })
      .then(throwOnErr)
  })
})

function createResponse (status, body) {
  return Promise.resolve({
    status: status,
    json: () => Promise.resolve(body)
  })
}

function throwOnErr (err) {
  if (err) {
    throw err
  }
}
