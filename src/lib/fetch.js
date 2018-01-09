import { fetch } from './fetch-impl'

export function ServerError (message, statusCode) {
  this.message = message
  this.statusCode = statusCode
}

ServerError.prototype = Object.create(Error.prototype)
ServerError.prototype.constructor = ServerError

export function put (url, values, authorization) {
  const params = {
    method: 'PUT',
    headers: createHeaders('application/json', authorization),
    body: JSON.stringify(values)
  }

  return doFetch(url, params)
}

export function post (url, values, authorization) {
  const params = {
    method: 'POST',
    headers: createHeaders('application/json', authorization),
    body: JSON.stringify(values)
  }

  return doFetch(url, params)
}

export function get (url, authorization) {
  const headers = createHeaders(null, authorization)
  return doFetch(url, { method: 'GET', headers })
}

export function httpDelete (url, authorization) {
  const headers = createHeaders(null, authorization)
  return doFetch(url, { method: 'DELETE', headers })
}

function checkStatus (response, body) {
  const errorMessage = (!!body && body.error) || 'Unknown server error'

  if (response.status >= 200 && response.status < 300) {
    if (body && body.errorMessage) {
      // AWS Lambda gives a 200 error response
      // if all expected params were not found
      throw new ServerError(errorMessage, 400)
    }

    return body
  }

  if (response.status === 0) {
    throw new ServerError('CORS error', 500)
  }

  throw new ServerError(errorMessage, response.status)
}

function parseJSON (response) {
  return response.json()
}

function doFetch (url, params) {
  const fetchPromise = fetch(url, params)
  const parsePromise = fetchPromise.then(parseJSON)

  return Promise.all([fetchPromise, parsePromise]).then(values =>
    checkStatus(values[0], values[1])
  )
}

function createHeaders (contentType, authorization) {
  const headers = {
    Accept: 'application/json'
  }

  if (contentType) {
    headers['Content-Type'] = contentType
  }

  if (authorization) {
    headers.Authorization = authorization
  }

  return headers
}
