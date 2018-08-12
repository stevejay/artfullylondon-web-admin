// @flow

import type { SearchNode } from "../flow-types";

import * as React from "react";
import { Box } from "grommet";
import ReactScrollUp from "react-scroll-up";
import InfiniteScroll from "shared/scroll/infinite-scroll";
import ScrollToTopButton from "shared/scroll/scroll-to-top-button";
import SearchResult from "./search-result";
import { PAGE_SIZE } from "../constants";

type Props = {
  +edges: Array<any>,
  +hasNextPage: boolean,
  +onMore: void => void
};

const renderItem = (item: { node: SearchNode }) => (
  <SearchResult key={item.node.id} {...item.node} />
);

const SearchResultList = ({ edges, hasNextPage, onMore }: Props) => (
  <Box
    wrap
    direction="row-responsive"
    pad="small"
    tag="section"
    a11yTitle="Search results"
    data-test="search results"
  >
    <InfiniteScroll
      items={edges}
      step={PAGE_SIZE}
      onMore={hasNextPage ? onMore : null}
    >
      {renderItem}
    </InfiniteScroll>
    <ReactScrollUp showUnder={160}>
      <ScrollToTopButton />
    </ReactScrollUp>
  </Box>
);

export default SearchResultList;
