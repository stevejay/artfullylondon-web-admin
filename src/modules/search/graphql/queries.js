// @flow

import gql from "graphql-tag";
import { PAGE_SIZE } from "../constants";

export const Autocomplete = gql`
  query Autocomplete($term: String!) {
    autocompleteSearch(term: $term) {
      results {
        id
        entityType
        status
        name
      }
    }
  }
`;

export const BasicSearch = gql`
  query BasicSearch(
    $term: String
    $entityType: EntityTypeEnum
    $first: Int = ${PAGE_SIZE}
    $after: String
  ) {
    basicSearch(
      term: $term
      entityType: $entityType
      first: $first
      after: $after
    ) {
      edges {
        node {
          id
          entityType
          status
          name
          image
          imageCopyright
          imageRatio
          imageColor
          ... on SearchEvent {
            venueName
          }
        }
        cursor
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;

export const SearchParams = gql`
  query SearchParams {
    searchParams @client {
      term
      entityType
    }
  }
`;
