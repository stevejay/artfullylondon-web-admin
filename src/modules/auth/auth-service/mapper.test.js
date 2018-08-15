// @flow

import each from "jest-each";
import * as mapper from "./mapper";

describe("mapSessionToAuthToken", () => {
  each([
    [null, null],
    [{}, null],
    [{ idToken: {} }, null],
    [{ idToken: { jwtToken: null } }, null],
    [{ idToken: { jwtToken: "the-token" } }, "Bearer the-token"]
  ]).test("%o returns %o", (session, expected) => {
    const actual = mapper.mapSessionToAuthToken(session);
    expect(actual).toEqual(expected);
  });
});

describe("mapSessionToAuthData", () => {
  each([
    [null, null],
    [
      {},
      {
        authenticated: false,
        username: null,
        groups: []
      }
    ],
    [
      {
        idToken: {
          jwtToken: "...",
          payload: {
            "cognito:groups": ["editors"],
            "cognito:username": "steve"
          }
        }
      },
      {
        authenticated: true,
        username: "steve",
        groups: ["editors"]
      }
    ],
    [
      {
        idToken: {
          jwtToken: "...",
          payload: {
            "cognito:username": "steve"
          }
        }
      },
      {
        authenticated: true,
        username: "steve",
        groups: []
      }
    ],
    [
      {
        signInUserSession: {
          idToken: {
            jwtToken: "...",
            payload: {
              "cognito:groups": ["editors"],
              "cognito:username": "readonly"
            }
          }
        }
      },
      {
        authenticated: true,
        username: "readonly",
        groups: ["editors"]
      }
    ]
  ]).test("%o returns %o", (session, expected) => {
    const actual = mapper.mapSessionToAuthData(session);
    expect(actual).toEqual(expected);
  });
});
