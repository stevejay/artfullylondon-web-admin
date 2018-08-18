// @flow

import * as React from "react";
import { Box } from "grommet";
import { ThemeContext } from "grommet-icons";
import { ApolloProvider } from "react-apollo";
import { Route, Switch, withRouter } from "react-router-dom";
import {
  AuthHandler,
  LogoutMenuOptionHandler,
  AccountPage
} from "./modules/auth";
import { SearchMenuOptionHandler, SearchResultPage } from "./modules/search";
import { Menu } from "./modules/menu";
import { DashboardPage } from "./modules/dashboard";
import { EntityPage } from "./modules/entity";
import { TagEditPage } from "./modules/tag";
import { NotFoundPage } from "./modules/error";
import { UpdateHandler } from "./modules/updater";
import apolloClient from "./apollo-client";
import withTheme from "shared/with-theme";

console.log("remove this line");
console.log("and this line");

const App = ({ theme }: any) => (
  <ThemeContext.Provider value={theme.icon}>
    <ApolloProvider client={apolloClient}>
      <React.Fragment>
        <UpdateHandler />
        <AuthHandler>
          <Menu
            logoutMenuOptionHandler={LogoutMenuOptionHandler}
            searchMenuOptionHandler={SearchMenuOptionHandler}
          >
            <Box tag="main" flex>
              <Box tag="article" flex>
                <Switch>
                  <Route exact path="/" component={DashboardPage} />
                  <Route exact path="/account" component={AccountPage} />
                  <Route exact path="/search" component={SearchResultPage} />
                  <Route
                    exact
                    path="/:entityType(talent|venue|event|event-series)/(.*)"
                    component={EntityPage}
                  />
                  <Route
                    exact
                    path="/tag/:tagType(medium|style|audience|geo)"
                    component={TagEditPage}
                  />
                  <Route component={NotFoundPage} />
                </Switch>
              </Box>
            </Box>
          </Menu>
        </AuthHandler>
      </React.Fragment>
    </ApolloProvider>
  </ThemeContext.Provider>
);

export default withTheme(withRouter(App));
