// @flow

import * as authUtils from "./auth-utils";

describe("translateAuthErrorMessage", () => {
  it("should handle an incorrect username or password", () => {
    const result = authUtils.translateAuthErrorMessage(
      new Error("Error: incorrect username or password")
    );
    expect(result).toEqual("Incorrect username or password");
  });

  it("should handle a user that does not exist", () => {
    const result = authUtils.translateAuthErrorMessage(
      new Error("Error: user does not exist")
    );
    expect(result).toEqual("Incorrect username or password");
  });

  it("should handle a general error", () => {
    const result = authUtils.translateAuthErrorMessage(
      new Error("Some general error")
    );
    expect(result).toEqual("Some general error");
  });
});
