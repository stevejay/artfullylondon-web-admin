export const returnAsPromise = (payload, meta) => ({
  type: 'app/RETURN_AS_PROMISE',
  meta,
  payload
})
