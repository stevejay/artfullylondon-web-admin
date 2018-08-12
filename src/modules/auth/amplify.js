// @flow

import type { LoginFormValues, AmplifyAuth, Session } from "./flow-types";

import Amplify from "aws-amplify";
import log from "loglevel";

Amplify.configure({
  Auth: {
    identityPoolId: process.env.REACT_APP_COGNITO_IDENTITY_POOL_ID,
    region: process.env.REACT_APP_COGNITO_REGION,
    userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_COGNITO_USER_POOL_APP_CLIENT_ID,
    mandatorySignIn: true
  }
});

const auth: AmplifyAuth = {
  attemptAutoLogin: () => Amplify.Auth.currentSession().catch(() => null),
  logIn: (values: LoginFormValues) =>
    Amplify.Auth.signIn(values.username, values.password),
  logOut: () => Amplify.Auth.signOut(),
  getAuthToken: async (): Promise<?string> => {
    try {
      const session: ?Session = await Amplify.Auth.currentSession();
      if (!session || !session.idToken || !session.idToken.jwtToken) {
        return null;
      }
      return "Bearer " + session.idToken.jwtToken;
    } catch (err) {
      if (err !== "No current user") {
        log.error(`Error getting id token: ${err.message}`);
      }
      return null;
    }
  }
};

export { auth };
