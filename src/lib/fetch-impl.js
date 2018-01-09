import fetchPonyfill from 'fetch-ponyfill'
const { fetch: fetchImpl } = fetchPonyfill()

export function fetch (url, params) {
  return fetchImpl(url, params)
}
