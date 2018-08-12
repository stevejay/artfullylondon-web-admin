// @flow

import type { MutationUpdaterFn } from "react-apollo";
import type { FormikActions } from "formik";
import type { AddTagFormValues, TagArray } from "../flow-types";

import * as React from "react";
import { Mutation } from "react-apollo";
import _ from "lodash";
import { Formik } from "formik";
import AddTagForm from "./add-tag-form";
import { CreateTag } from "../graphql/mutations";
import { GetTags } from "../graphql/queries";
import { getErrorMessage } from "shared/utils/error";

export const INITIAL_VALUES = { label: "" };

type Props = {
  +tagType: string
};

type QueryData = {
  +tags: {
    +nodes: TagArray
  }
};

class AddTagFormHandler extends React.PureComponent<Props> {
  handleSubmit = (
    createTag: any => Promise<any>,
    values: AddTagFormValues,
    formik: FormikActions<AddTagFormValues>
  ) => {
    createTag({
      variables: {
        tagType: this.props.tagType,
        label: values.label
      }
    })
      .then(res => {
        formik.resetForm(INITIAL_VALUES);
      })
      .catch(err => {
        formik.setFieldError(
          "label",
          getErrorMessage(err, "This tag already exists")
        );
      })
      .then(() => {
        formik.setSubmitting(false);
      });
  };

  handleUpdate: MutationUpdaterFn<> = (cache, result) => {
    const { tagType } = this.props;

    const existing: ?QueryData = cache.readQuery({
      query: GetTags,
      variables: { tagType }
    });

    if (!existing) {
      return;
    }

    const tag = result && result.data ? result.data.createTag.node : null;
    if (!tag) {
      return;
    }

    cache.writeQuery({
      query: GetTags,
      variables: { tagType },
      data: {
        tags: {
          ...existing.tags,
          nodes: _.sortBy(existing.tags.nodes.concat(tag), x => x.id)
        }
      }
    });
  };

  render() {
    return (
      <Mutation mutation={CreateTag} update={this.handleUpdate}>
        {createTag => (
          <Formik
            initialValues={INITIAL_VALUES}
            enableReinitialize
            onSubmit={_.bind(this.handleSubmit, this, createTag)}
            component={AddTagForm}
          />
        )}
      </Mutation>
    );
  }
}

export default AddTagFormHandler;
