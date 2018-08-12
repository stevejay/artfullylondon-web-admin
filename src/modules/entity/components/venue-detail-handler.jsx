// @flow

import type { RouterHistory } from "react-router-dom";
import type { QueryRenderProps } from "react-apollo";
import type { VenueForEdit } from "../flow-types";

import * as React from "react";
import { Query } from "react-apollo";
import { withRouter } from "react-router-dom";
import ErrorContentState from "shared/content-state/error";
import LoadingContentState from "shared/content-state/loading";
import NotFoundContentState from "shared/content-state/not-found";
import VenueDetail from "./venue-detail";
import { VenueForEditQuery } from "../graphql/queries";

type Props = {
  +id: string,
  +history: RouterHistory
};

type QueryData = {
  +venueForEdit: {
    +node: VenueForEdit
  }
};

class VenueDetailHandler extends React.Component<Props> {
  handleEdit = () => {
    this.props.history.push(`/edit/${this.props.id}`);
  };
  render() {
    return (
      <Query query={VenueForEditQuery} variables={{ id: this.props.id }}>
        {({ loading, error, data }: QueryRenderProps<QueryData>) => {
          if (error) {
            return <ErrorContentState />;
          } else if (loading || !data) {
            return <LoadingContentState />;
          } else if (!data.venueForEdit || !data.venueForEdit.node) {
            return <NotFoundContentState />;
          } else {
            return (
              <VenueDetail
                key={data.venueForEdit.node.id}
                venue={data.venueForEdit.node}
                onEdit={this.handleEdit}
              />
            );
          }
        }}
      </Query>
    );
  }
}

export default withRouter(VenueDetailHandler);
