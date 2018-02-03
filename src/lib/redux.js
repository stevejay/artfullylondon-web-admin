import _ from 'lodash'

// Wraps each selector such that the first arg (state) is turned into state[module]
// i.e., state.someModuleName
export const mapSelectors = (selectors, module) =>
  _.mapValues(selectors, value => _.overArgs(value, [state => state[module]]))

// Combines objects of selectors into a single object of selectors,
// checking in the process that there are no duplicate keys
export const combineSelectors = (...selectors) =>
  _.assignWith({}, ...selectors, (objValue, srcValue, key) => {
    if (!_.isNil(objValue)) {
      throw new Error(`Duplicate selector found for key '${key}'`)
    }

    return srcValue
  })
