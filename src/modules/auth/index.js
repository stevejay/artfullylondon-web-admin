// @flow

import AuthHandler from "./components/auth-handler";
import LogoutMenuOptionHandler from "./components/logout-menu-option-handler";
import * as amplify from "./amplify";
import resolvers from "./graphql/resolvers";
const getAuthToken = amplify.auth.getAuthToken;
export { AuthHandler, LogoutMenuOptionHandler, getAuthToken, resolvers };
