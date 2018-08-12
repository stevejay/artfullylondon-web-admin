// @flow

export function translateAuthErrorMessage(err: Error) {
  let message = err.message;
  if (
    /user does not exist/i.test(message) ||
    /incorrect username or password/i.test(message)
  ) {
    message = "Incorrect username or password";
  }
  return message;
}
