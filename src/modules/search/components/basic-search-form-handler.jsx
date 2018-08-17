// @flow

import type { MutationOperation } from "apollo-client";
import type { BasicSearchFormValues } from "../flow-types";

import * as React from "react";
import log from "loglevel";
import { graphql } from "react-apollo";
import _ from "lodash";
import { Form } from "react-final-form";
import BasicSearchForm from "./basic-search-form";
import { ENTITY_TYPE_OPTIONS } from "../constants";
import { UpdateSearchParams } from "../graphql/mutations";

type Props = {
  +term: string,
  +entityType: string,
  +mutate: MutationOperation<>
};

class BasicSearchFormHandler extends React.PureComponent<Props> {
  handleSubmit = (values: BasicSearchFormValues) =>
    this.props
      .mutate({
        variables: { term: values.term, entityType: values.entityType.id }
      })
      .catch(log.error);

  render() {
    return (
      <Form
        initialValues={{
          term: this.props.term,
          entityType: _.find(
            ENTITY_TYPE_OPTIONS,
            x => x.id === this.props.entityType
          )
        }}
        onSubmit={this.handleSubmit}
        component={BasicSearchForm}
        subscription={{}}
      />
    );
  }
}

export default graphql(UpdateSearchParams)(BasicSearchFormHandler);
