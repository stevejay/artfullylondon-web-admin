import _ from 'lodash'
import { LINK_TYPE_DROPDOWN_OPTIONS } from '_src/constants/link'

export function getAvailableLinkTypeDropdownOptions (value) {
  return LINK_TYPE_DROPDOWN_OPTIONS.filter(
    x => _.findIndex(value, y => x.value === y.type) === -1
  )
}
