// @flow

import gql from "graphql-tag";

export const CreateTag = gql`
  mutation CreateTag($tagType: TagTypeEnum!, $label: String!) {
    createTag(input: { tagType: $tagType, label: $label }) {
      node {
        tagType
        id
        label
      }
    }
  }
`;

export const DeleteTag = gql`
  mutation DeleteTag($tagType: TagTypeEnum!, $id: ID!) {
    deleteTag(input: { tagType: $tagType, id: $id }) {
      ok
    }
  }
`;
