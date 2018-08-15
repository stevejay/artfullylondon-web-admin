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
      <DefinitionList>
        <DefinitionList.Definition term="User" description={username} />
        <DefinitionList.Definition
          term="Groups"
          description={
            !groups || _.isEmpty(groups) ? "None" : groups.join(", ")
          }
        />
        <DefinitionList.Definition
          term="App Version"
          description={(process.env.REACT_APP_CIRCLE_SHA1 || "Local").substring(
            0,
            7
          )}
        />
      </DefinitionList>
    </Column>
  </Column.Container>
);

export default UserSummarySection;
