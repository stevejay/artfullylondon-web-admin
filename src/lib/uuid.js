import lodashUuid from 'lodash-uuid'

export default function create () {
  return lodashUuid.uuid().replace(/-/g, '')
}
