// @flow

import _ from "lodash";

export function getErrorMessage(err: Error, conditionalFailureMessage: string) {
  return _.includes(err.message, "conditional request failed")
    ? conditionalFailureMessage
    : err.message;
}
