// @flow

import type { HOC } from "recompose";
import type { MutationUpdaterFn } from "react-apollo";
import type { Tag as TagType, TagArray } from "../flow-types";

import * as React from "react";
import { Mutation } from "react-apollo";
import makeCancelable from "makecancelable";
import { withStateHandlers, compose, pure } from "recompose";
import _ from "lodash";
import { DeleteTag } from "../graphql/mutations";
import { GetTags } from "../graphql/queries";
import Tag from "./tag";

type Props = TagType;

type EnhancedProps = {
  ...$Exact<Props>, // TODO this might be a flow bug that Exact is required here
  deleting: boolean,
  setDeleting: boolean => void
};

type QueryData = {
  +tags: {
    +nodes: TagArray
  }
};

export class TagHandler extends React.Component<EnhancedProps> {
  _cancelDelete: ?(void) => mixed = null;

  componentWillUnmount() {
    this._cancelDelete && this._cancelDelete();
  }

  handleDelete = (deleteTag: any => Promise<any>) => {
    if (this.props.deleting) {
      return;
    }
    this.props.setDeleting(true);
    this._cancelDelete = makeCancelable(
      deleteTag({ variables: { ...this.props } }),
      null,
      () => this.props.setDeleting(false)
    );
  };

  handleUpdate: MutationUpdaterFn<> = (cache, result) => {
    const { tagType, id } = this.props;
    const existing: ?QueryData = cache.readQuery({
      query: GetTags,
      variables: { tagType }
    });
    if (!existing) {
      return;
    }
    cache.writeQuery({
      query: GetTags,
      variables: { tagType },
      data: {
        tags: {
          ...existing.tags,
          nodes: _.filter(existing.tags.nodes, x => x.id !== id)
        }
      }
    });
  };

  render() {
    const { tagType, label, deleting } = this.props;
    return (
      <Mutation mutation={DeleteTag} update={this.handleUpdate}>
        {deleteTag => (
          <Tag
            tagType={tagType}
            label={label}
            onClick={
              deleting ? null : _.bind(this.handleDelete, this, deleteTag)
            }
          />
        )}
      </Mutation>
    );
  }
}

const enhancer: HOC<*, Props> = compose(
  withStateHandlers(
    { deleting: false },
    { setDeleting: () => value => ({ deleting: value }) }
  ),
  pure
);

export default enhancer(TagHandler);
