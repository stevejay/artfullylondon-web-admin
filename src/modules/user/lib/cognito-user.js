import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js'

const USER_POOL_DATA = {
  UserPoolId: process.env.WEBSITE_COGNITO_USER_POOL_ID,
  ClientId: process.env.WEBSITE_COGNITO_USER_POOL_APP_CLIENT_ID,
  Paranoia: 7
}

export function getCurrentCognitoUser () {
  const userPool = new CognitoUserPool(USER_POOL_DATA)
  return userPool.getCurrentUser()
}

export function createCognitoUser (username) {
  const userPool = new CognitoUserPool(USER_POOL_DATA)
  const userData = { Username: username, Pool: userPool }
  return new CognitoUser(userData)
}
