import lodashUuid from 'lodash-uuid'

export function create () {
  return lodashUuid.uuid().replace(/-/g, '')
}
