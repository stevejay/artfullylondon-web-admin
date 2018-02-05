import _ from 'lodash'

function addElement (array, newElement) {
  if (_.find(array, x => (x.key || x) === (newElement.key || newElement))) {
    return null
  }

  const newArray = array.slice()
  newArray.push(newElement)
  return newArray
}

function updateElementByKey (array, key, newValues) {
  const index = _.findIndex(array, x => x.key === key)

  if (index === -1) {
    return array
  }

  const element = array[index]
  const newArray = array.slice()

  newArray.splice(index, 1, { ...element, ...newValues })
  return newArray
}

function removeElementByKey (array, key) {
  return array.filter(x => (x.key || x) !== key)
}

export default {
  addElement: addElement,
  updateElementByKey: updateElementByKey,
  removeElementByKey: removeElementByKey
}
