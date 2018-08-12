// @flow

import type { RouterHistory } from "react-router-dom";
import type { QueryRenderProps } from "react-apollo";
import type { TalentForEdit } from "../flow-types";

import * as React from "react";
import { Query } from "react-apollo";
import { withRouter } from "react-router-dom";
import ErrorContentState from "shared/content-state/error";
import LoadingContentState from "shared/content-state/loading";
import NotFoundContentState from "shared/content-state/not-found";
import { TalentForEditQuery } from "../graphql/queries";
import TalentDetail from "./talent-detail";

type Props = {
  +id: string,
  +history: RouterHistory
};

type QueryData = {
  +talentForEdit: {
    +node: TalentForEdit
  }
};

class TalentDetailHandler extends React.Component<Props> {
  handleEdit = () => {
    this.props.history.push(`/edit/${this.props.id}`);
  };
  render() {
    return (
      <Query query={TalentForEditQuery} variables={{ id: this.props.id }}>
        {({ loading, error, data }: QueryRenderProps<QueryData>) => {
          if (error) {
            return <ErrorContentState />;
          } else if (loading || !data) {
            return <LoadingContentState />;
          } else if (!data.talentForEdit || !data.talentForEdit.node) {
            return <NotFoundContentState />;
          } else {
            return (
              <TalentDetail
                key={data.talentForEdit.node.id}
                talent={data.talentForEdit.node}
                onEdit={this.handleEdit}
              />
            );
          }
        }}
      </Query>
    );
  }
}

export default withRouter(TalentDetailHandler);
