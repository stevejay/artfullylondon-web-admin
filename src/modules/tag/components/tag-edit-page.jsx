// @flow

import type { Match } from "react-router-dom";

import * as React from "react";
import { Tag as TagIcon } from "grommet-icons";
import _ from "lodash";
import { Box } from "grommet";
import PageHeader from "shared/page-header";
import ResetScroll from "shared/scroll/reset-scroll";
import AddTagFormHandler from "./add-tag-form-handler";
import TagListHandler from "./tag-list-handler";

const TAG_SECTION_PAD = { horizontal: "medium", bottom: "medium" };

type Props = {
  +match: Match
};

const TagEditPage = (props: Props) => {
  const tagType: string = (props.match.params.tagType || "").toUpperCase();
  return (
    <React.Fragment>
      <ResetScroll />
      <PageHeader
        icon={TagIcon}
        title={`${_.capitalize(tagType)} Tags`}
        subTitle="Add or delete"
      />
      <Box
        tag="section"
        margin="medium"
        pad="medium"
        responsive
        background="light-3"
        round="xsmall"
      >
        <AddTagFormHandler tagType={tagType} />
      </Box>
      <Box
        tag="section"
        a11yTitle={`Current ${tagType} tags`}
        responsive
        flex="grow"
        pad={TAG_SECTION_PAD}
        data-test="tag list"
      >
        <TagListHandler tagType={tagType} />
      </Box>
    </React.Fragment>
  );
};

export default TagEditPage;
