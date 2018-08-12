import Amplify from "aws-amplify";

Amplify.configure({
  Auth: {
    identityPoolId: Cypress.env("REACT_APP_COGNITO_IDENTITY_POOL_ID"),
    region: Cypress.env("REACT_APP_COGNITO_REGION"),
    userPoolId: Cypress.env("REACT_APP_COGNITO_USER_POOL_ID"),
    userPoolWebClientId: Cypress.env(
      "REACT_APP_COGNITO_USER_POOL_APP_CLIENT_ID"
    )
  }
});

export default {
  signIn(username, password) {
    return Amplify.Auth.signIn(username, password);
  }
};
