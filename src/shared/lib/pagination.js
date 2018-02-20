import _ from 'lodash'

const MAX_PAGES_IN_LINE = 6

export function showGoToFirstPageLink (
  totalPages,
  pageNumber,
  currentPageNumber
) {
  return (
    totalPages > MAX_PAGES_IN_LINE && pageNumber === 1 && currentPageNumber >= 4
  )
}

export function showGoToLastPageLink (
  totalPages,
  pageNumber,
  currentPageNumber
) {
  return (
    totalPages > MAX_PAGES_IN_LINE &&
    pageNumber === totalPages &&
    currentPageNumber <= totalPages - 3
  )
}

export function getPaginationRange (totalPages, currentPageNumber) {
  if (totalPages <= MAX_PAGES_IN_LINE) {
    return _.range(1, totalPages + 1)
  }

  if (currentPageNumber <= 2) {
    return [1, 2, 3, totalPages]
  } else if (currentPageNumber >= totalPages - 1) {
    return [1, totalPages - 2, totalPages - 1, totalPages]
  } else {
    return [
      1,
      currentPageNumber - 1,
      currentPageNumber,
      currentPageNumber + 1,
      totalPages
    ]
  }
}
