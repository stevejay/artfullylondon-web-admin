// @flow

import * as React from "react";
import { shouldUpdate } from "recompose";
import { User } from "grommet-icons";
import PageHeader from "shared/page-header";
import ResetScroll from "shared/scroll/reset-scroll";
import UserSummarySectionHandler from "./user-summary-section-handler";

const AccountPage = () => (
  <React.Fragment>
    <ResetScroll />
    <PageHeader icon={User} title="Account" subTitle="User information" />
    <UserSummarySectionHandler />
  </React.Fragment>
);

export default shouldUpdate(() => false)(AccountPage);
