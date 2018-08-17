// @flow

import type { MutationUpdaterFn } from "react-apollo";
import type { AddTagFormValues, TagArray } from "../flow-types";
import type { FormApi } from "final-form";

import * as React from "react";
import { Mutation } from "react-apollo";
import _ from "lodash";
import { Form } from "react-final-form";
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
    form: FormApi
  ) =>
    createTag({
      variables: {
        tagType: this.props.tagType,
        label: values.label
      }
    })
      .then(res => form.reset())
      .catch(err => ({
        FORM_ERROR: getErrorMessage(err, "This tag already exists")
      }));

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
          <Form
            initialValues={INITIAL_VALUES}
            onSubmit={_.bind(this.handleSubmit, this, createTag)}
            component={AddTagForm}
            subscription={{ submitting: true, submitErrors: true }}
          />
        )}
      </Mutation>
    );
  }
}

export default AddTagFormHandler;
