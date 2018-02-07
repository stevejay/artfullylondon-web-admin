import TagsTypePage from '_src/modules/tag/pages/tags-type'
import Tag from '_src/modules/tag/components/tag'
import TagCollection from '_src/modules/tag/components/tag-collection'
import { moduleName, reducer, selectors } from '_src/modules/tag/reducers'
import sagas from '_src/modules/tag/sagas'
import * as actions from '_src/modules/tag/actions'
// TODO could just export the used ones:
import * as constants from '_src/modules/tag/constants'

export {
  TagsTypePage,
  Tag,
  TagCollection,
  moduleName,
  reducer,
  selectors,
  sagas,
  actions,
  constants
}
