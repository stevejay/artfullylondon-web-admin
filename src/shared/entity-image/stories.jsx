// @flow

import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withScreenshot } from "storybook-chrome-screenshot";
import * as entityType from "../types/entity-type";
import { getEntityTypeDisplayName } from "../utils/entity";
import EntityImage from ".";

[
  entityType.TALENT,
  entityType.VENUE,
  entityType.EVENT_SERIES,
  entityType.EVENT
].forEach(type => {
  storiesOf(`EntityImage/${getEntityTypeDisplayName(type)}`, module)
    .addDecorator((story, context) => (
      <div style={{ width: 300, height: 300 }}>{story(context)}</div>
    ))
    .add(
      "placeholder",
      withScreenshot()(() => (
        <EntityImage
          entityType={type}
          a11yTitle="The Image"
          imageSrc={null}
          backgroundColor={null}
        />
      ))
    )
    .add("image", () => (
      <EntityImage
        entityType={type}
        a11yTitle="The Image"
        imageSrc="https://images.artfully.london/9c/5f/9c5f6ba1e500481a97434374089b0539/500x500.jpg"
        backgroundColor="#0FF"
      />
    ))
    .add("failed image", () => (
      <EntityImage
        entityType={type}
        a11yTitle="The Image"
        imageSrc="https://images.artfully.london/9c/5f/does-not-exist/500x500.jpg"
        backgroundColor="#0FF"
      />
    ));
});
