// @flow

export type Auth = {|
  +authenticated: boolean,
  +username: ?string,
  +groups: ?Array<string>
|};

export type AuthState = {|
  +auth: Auth
|};

export type Session = {|
  signInUserSession?: { idToken: any },
  idToken?: { +jwtToken: string }
|};

export type LoginFormValues = {|
  +username: string,
  +password: string
|};
