// @flow

import type { QueryRenderProps, ApolloQueryResult } from "react-apollo";

import * as React from "react";
import _ from "lodash";
import isEmpty from "lodash/isEmpty";
import { Query } from "react-apollo";
import ErrorContentState from "shared/content-state/error";
import LoadingContentState from "shared/content-state/loading";
import MessageContentState from "shared/content-state/message";
import * as entityType from "shared/types/entity-type";
import { BasicSearch } from "../graphql/queries";
import SearchResultList from "./search-result-list";

type Props = {
  +term: string,
  +entityType: string
};

type QueryData = {
  +basicSearch: {
    +edges: Array<any>,
    +pageInfo: {
      +hasNextPage: boolean
    }
  }
};

class SearchResultListHandler extends React.Component<Props> {
  handleMore = (
    data: QueryData,
    fetchMore: ({ [key: string]: any }) => Promise<ApolloQueryResult<QueryData>>
  ) => {
    fetchMore({
      variables: {
        after: _.last(data.basicSearch.edges).cursor
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return prev;
        }

        return {
          ...prev,
          basicSearch: {
            ...prev.basicSearch,
            edges: [
              ...prev.basicSearch.edges,
              ...fetchMoreResult.basicSearch.edges
            ],
            pageInfo: fetchMoreResult.basicSearch.pageInfo
          }
        };
      }
    });
  };

  render() {
    if (!this.props.term || !this.props.term.trim()) {
      return <MessageContentState message="Search to see results" />;
    }

    return (
      <Query
        query={BasicSearch}
        variables={{
          term: this.props.term,
          entityType:
            this.props.entityType === entityType.ALL
              ? undefined
              : this.props.entityType
        }}
      >
        {({ loading, error, data, fetchMore }: QueryRenderProps<QueryData>) => {
          if (error) {
            return <ErrorContentState />;
          } else if (loading || !data) {
            return <LoadingContentState />;
          } else if (!data.basicSearch || isEmpty(data.basicSearch.edges)) {
            return <MessageContentState message="Nothing Found" />;
          } else {
            return (
              <SearchResultList
                edges={data.basicSearch.edges}
                hasNextPage={data.basicSearch.pageInfo.hasNextPage}
                onMore={() => this.handleMore(data, fetchMore)}
              />
            );
          }
        }}
      </Query>
    );
  }
}

export default SearchResultListHandler;
