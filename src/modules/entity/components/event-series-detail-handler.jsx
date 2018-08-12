// @flow

import type { RouterHistory } from "react-router-dom";
import type { QueryRenderProps } from "react-apollo";
import type { EventSeriesForEdit } from "../flow-types";

import * as React from "react";
import { Query } from "react-apollo";
import { withRouter } from "react-router-dom";
import ErrorContentState from "shared/content-state/error";
import LoadingContentState from "shared/content-state/loading";
import NotFoundContentState from "shared/content-state/not-found";
import EventSeriesDetail from "./event-series-detail";
import { EventSeriesForEditQuery } from "../graphql/queries";

type Props = {
  +id: string,
  +history: RouterHistory
};

type QueryData = {
  +eventSeriesForEdit: {
    +node: EventSeriesForEdit
  }
};

export class EventSeriesDetailHandler extends React.Component<Props> {
  handleEdit = () => {
    this.props.history.push(`/edit/${this.props.id}`);
  };
  render() {
    return (
      <Query query={EventSeriesForEditQuery} variables={{ id: this.props.id }}>
        {({ loading, error, data }: QueryRenderProps<QueryData>) => {
          if (error) {
            return <ErrorContentState />;
          } else if (loading || !data) {
            return <LoadingContentState />;
          } else if (
            !data.eventSeriesForEdit ||
            !data.eventSeriesForEdit.node
          ) {
            return <NotFoundContentState />;
          } else {
            return (
              <EventSeriesDetail
                key={data.eventSeriesForEdit.node.id}
                eventSeries={data.eventSeriesForEdit.node}
                onEdit={this.handleEdit}
              />
            );
          }
        }}
      </Query>
    );
  }
}

export default withRouter(EventSeriesDetailHandler);
