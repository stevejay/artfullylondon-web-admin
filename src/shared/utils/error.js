// @flow

import _ from "lodash";

export function getErrorMessage(
  err: Error,
  conditionalFailureMessage?: string
) {
  if (_.includes(err.message, "User not authorized")) {
    return "You are not authorized to perform this action";
  }
  if (
    conditionalFailureMessage &&
    _.includes(err.message, "conditional request failed")
  ) {
    return conditionalFailureMessage;
  }
  return err.message;
}
