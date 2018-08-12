// @flow

import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withScreenshot } from "storybook-chrome-screenshot";
import * as entityType from "shared/types/entity-type";
import { allWidths } from "testing/screenshot-options";
import SearchResult from ".";

// TODO work out how to support screenshotting of images.

storiesOf("Search/SearchResult", module)
  .add(
    "Talent with no image",
    withScreenshot(allWidths)(() => (
      <SearchResult
        id="talent/foo"
        entityType={entityType.TALENT}
        name="Talent Name"
      />
    ))
  )
  .add("Talent with image", () => (
    <SearchResult
      id="talent/foo"
      entityType={entityType.TALENT}
      name="Talent Name"
      image="9c5f6ba1e500481a97434374089b0539"
      imageColor="00FFFF"
    />
  ))
  .add("Talent with non-existent image", () => (
    <SearchResult
      id="talent/foo"
      entityType={entityType.TALENT}
      name="Talent Name"
      image="11111111111111111111111111111111"
      imageColor="00FFFF"
    />
  ))
  .add(
    "Event with no image",
    withScreenshot(allWidths)(() => (
      <SearchResult
        id="venue/foo"
        entityType={entityType.EVENT}
        name="Event Name"
        venueName="Venue Name"
      />
    ))
  );
