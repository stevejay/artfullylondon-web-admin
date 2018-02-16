import TagsTypePage from './pages/tags-type'
import Tag from './components/tag'
import TagCollection from './components/tag-collection'
import { moduleName, reducer, selectors } from './reducers'
import sagas from './sagas'
import * as actions from './actions'
// TODO could just export the used ones:
import * as constants from './constants'

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
