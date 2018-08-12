// @flow

export type AuthState = {
  +auth: {
    +authenticated: boolean
  }
};

export type LoginFormValues = {|
  +username: string,
  +password: string
|};

export type Session = {
  +idToken: { +jwtToken: string },
  +refreshToken: string,
  +accessToken: string
};

export type AmplifyAuth = {|
  attemptAutoLogin: () => Promise<?{}>,
  logIn: LoginFormValues => Promise<?{}>,
  logOut: () => Promise<?{}>,
  getAuthToken: () => Promise<?string>
|};
