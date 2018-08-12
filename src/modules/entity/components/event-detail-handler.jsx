// @flow

import type { RouterHistory } from "react-router-dom";
import type { QueryRenderProps } from "react-apollo";
import type { EventForEdit } from "../flow-types";

import * as React from "react";
import { Query } from "react-apollo";
import { withRouter } from "react-router-dom";
import ErrorContentState from "shared/content-state/error";
import LoadingContentState from "shared/content-state/loading";
import NotFoundContentState from "shared/content-state/not-found";
import EventDetail from "./event-detail";
import { EventForEditQuery } from "../graphql/queries";

type Props = {
  +id: string,
  +history: RouterHistory
};

type QueryData = {
  +eventForEdit: {
    +node: EventForEdit
  }
};

class EventDetailHandler extends React.Component<Props> {
  handleEdit = () => {
    this.props.history.push(`/edit/${this.props.id}`);
  };
  render() {
    return (
      <Query query={EventForEditQuery} variables={{ id: this.props.id }}>
        {({ loading, error, data }: QueryRenderProps<QueryData>) => {
          if (error) {
            return <ErrorContentState />;
          } else if (loading || !data) {
            return <LoadingContentState />;
          } else if (!data.eventForEdit || !data.eventForEdit.node) {
            return <NotFoundContentState />;
          } else {
            return (
              <EventDetail
                key={data.eventForEdit.node.id}
                event={data.eventForEdit.node}
                onEdit={this.handleEdit}
              />
            );
          }
        }}
      </Query>
    );
  }
}

export default withRouter(EventDetailHandler);
