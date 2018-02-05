import _ from 'lodash'

export function addElement (array, newElement) {
  if (_.find(array, x => (x.key || x) === (newElement.key || newElement))) {
    return null
  }

  const newArray = array.slice()
  newArray.push(newElement)
  return newArray
}

export function updateElementByKey (array, key, newValues) {
  const index = _.findIndex(array, x => x.key === key)

  if (index === -1) {
    return array
  }

  const element = array[index]
  const newArray = array.slice()

  newArray.splice(index, 1, { ...element, ...newValues })
  return newArray
}

export function removeElementByKey (array, key) {
  return array.filter(x => (x.key || x) !== key)
}
