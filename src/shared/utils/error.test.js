// @flow

import each from "jest-each";
import * as errorUtils from "./error";

describe("getErrorMessage", () => {
  each([
    [new Error("some error"), "Already exists", "some error"],
    [
      new Error("Foo: conditional request failed"),
      "Already exists",
      "Already exists"
    ]
  ]).test(
    "%o with conditional message %s should return %s",
    (error, message, expected) => {
      const result = errorUtils.getErrorMessage(error, message);
      expect(result).toEqual(expected);
    }
  );
});
