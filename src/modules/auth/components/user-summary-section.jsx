// @flow

import * as React from "react";
import _ from "lodash";
import Column from "shared/column";
import DefinitionList from "shared/definition-list";

type Props = {
  +username: ?string,
  +groups: ?Array<string>
};

const UserSummarySection = ({ username, groups }: Props) => (
  <Column.Container>
    <Column basis="full">
      <DefinitionList a11yTitle="User details list">
        <DefinitionList.Definition
          term="User"
          description={username}
          data-test="username"
        />
        <DefinitionList.Definition
          term="Groups"
          description={
            !groups || _.isEmpty(groups) ? "None" : groups.join(", ")
          }
          data-test="groups"
        />
        <DefinitionList.Definition
          term="App Version"
          description={process.env.REACT_APP_BUILD_ID || "Local"}
        />
      </DefinitionList>
    </Column>
  </Column.Container>
);

export default UserSummarySection;
