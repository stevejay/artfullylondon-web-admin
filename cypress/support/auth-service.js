import Auth from "@aws-amplify/auth";

Auth.configure({
  identityPoolId: Cypress.env("COGNITO_IDENTITY_POOL_ID"),
  region: Cypress.env("COGNITO_REGION"),
  userPoolId: Cypress.env("COGNITO_USER_POOL_ID"),
  userPoolWebClientId: Cypress.env("COGNITO_USER_POOL_APP_CLIENT_ID")
});

export function signIn(username, password) {
  return Auth.signIn(username, password);
}
