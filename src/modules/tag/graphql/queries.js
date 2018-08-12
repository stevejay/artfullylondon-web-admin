// @flow

import gql from "graphql-tag";

export const GetTags = gql`
  query GetTags($tagType: TagTypeEnum!) {
    tags(tagType: $tagType) {
      nodes {
        tagType
        id
        label
      }
    }
  }
`;
