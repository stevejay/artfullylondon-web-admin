// @flow

import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withScreenshot } from "storybook-chrome-screenshot";
import ErrorContentState from "./error";
import LoadingContentState from "./loading";
import MessageContentState from "./message";
import NotFoundContentState from "./not-found";

storiesOf(`ContentState/Error`, module)
  .addDecorator(withScreenshot())
  .add("default", () => <ErrorContentState />);

storiesOf(`ContentState/Loading`, module)
  .addDecorator(withScreenshot())
  .add("default", () => <LoadingContentState />);

storiesOf(`ContentState/No Results`, module)
  .addDecorator(withScreenshot())
  .add("default", () => <MessageContentState message="Nothing Found" />);

storiesOf(`ContentState/Not Found`, module)
  .addDecorator(withScreenshot())
  .add("default", () => <NotFoundContentState />);
