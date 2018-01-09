export function hasQuery (location) {
  return (
    !!location && !!location.query && Object.keys(location.query).length > 0
  )
}
