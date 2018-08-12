// @flow

import type { MutationOperation } from "apollo-client";
import type { FormikActions } from "formik";
import type { BasicSearchFormValues } from "../flow-types";

import * as React from "react";
import log from "loglevel";
import { graphql } from "react-apollo";
import _ from "lodash";
import { Formik } from "formik";
import BasicSearchForm from "./basic-search-form";
import { ENTITY_TYPE_OPTIONS } from "../constants";
import { UpdateSearchParams } from "../graphql/mutations";

type Props = {
  +term: string,
  +entityType: string,
  +mutate: MutationOperation<>
};

export class BasicSearchFormHandler extends React.PureComponent<Props> {
  handleSubmit = (
    values: BasicSearchFormValues,
    { setErrors, setSubmitting }: FormikActions<BasicSearchFormValues>
  ) => {
    this.props
      .mutate({
        variables: { term: values.term, entityType: values.entityType.id }
      })
      .catch(log.error)
      .then(() => setSubmitting(false))
      .catch(log.error);
  };

  render() {
    return (
      <Formik
        initialValues={{
          term: this.props.term,
          entityType: _.find(
            ENTITY_TYPE_OPTIONS,
            x => x.id === this.props.entityType
          )
        }}
        enableReinitialize
        onSubmit={this.handleSubmit}
        component={BasicSearchForm}
      />
    );
  }
}

export default graphql(UpdateSearchParams)(BasicSearchFormHandler);
