// @flow

import each from "jest-each";
import * as errorUtils from "./error";

describe("getErrorMessage", () => {
  each([
    ["some error", "Already exists", "some error"],
    ["Foo: conditional request failed", "Already exists", "Already exists"],
    [
      "Foo: conditional request failed",
      null,
      "Foo: conditional request failed"
    ],
    [
      "GraphQL error: [401] User not authorized for requested action",
      "Already exists",
      "You are not authorized to perform this action"
    ]
  ]).test(
    "%o with conditional message %s should return %s",
    (errorMessage, conditionalFailureMessage, expected) => {
      const actual = errorUtils.getErrorMessage(
        new Error(errorMessage),
        conditionalFailureMessage
      );
      expect(actual).toEqual(expected);
    }
  );
});
