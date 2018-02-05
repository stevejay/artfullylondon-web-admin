import _ from 'lodash'

import * as linkConstants from '_src/constants/link'

export function getAvailableLinkTypeDropdownOptions (value) {
  return linkConstants.LINK_TYPE_DROPDOWN_OPTIONS.filter(
    x => _.findIndex(value, y => x.value === y.type) === -1
  )
}
