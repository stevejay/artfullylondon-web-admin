// @flow

import type { QueryRenderProps } from "react-apollo";
import type { TagArray } from "../flow-types";

import * as React from "react";
import isEmpty from "lodash/isEmpty";
import { Query } from "react-apollo";
import ErrorContentState from "shared/content-state/error";
import LoadingContentState from "shared/content-state/loading";
import MessageContentState from "shared/content-state/message";
import TagList from "./tag-list";
import { GetTags } from "../graphql/queries";

type Props = {
  +tagType: string
};

type QueryData = {
  +tags: {
    +nodes: TagArray
  }
};

const TagListHandler = ({ tagType }: Props) => (
  <Query query={GetTags} variables={{ tagType }}>
    {({ loading, error, data, fetchMore }: QueryRenderProps<QueryData>) => {
      if (error) {
        return <ErrorContentState />;
      } else if (loading) {
        return <LoadingContentState />;
      } else if (!data || !data.tags || isEmpty(data.tags.nodes)) {
        return <MessageContentState message="Nothing Found" />;
      } else {
        return <TagList tags={data.tags.nodes} />;
      }
    }}
  </Query>
);

export default TagListHandler;
