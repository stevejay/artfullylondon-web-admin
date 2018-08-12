// @flow

import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withScreenshot } from "storybook-chrome-screenshot";
import * as entityType from "shared/types/entity-type";
import AutocompleteResult from "./autocomplete-result";
import AutocompleteResultList from "./autocomplete-result-list";
import SearchInput from "./search-input";

storiesOf("Search/SearchMenuOptionHandler/AutocompleteResult", module)
  .addDecorator(withScreenshot())
  .add("default", () => (
    <AutocompleteResult
      id="talent/foo"
      entityType={entityType.TALENT}
      name="Talent Name"
      selected={false}
      onClick={action("clicked")}
    />
  ));

storiesOf("Search/SearchMenuOptionHandler/AutocompleteResultList", module)
  .addDecorator(withScreenshot())
  .add("no selected result", () => (
    <AutocompleteResultList
      autocompleteItems={[
        { id: "talent/foo", name: "The Foo", entityType: entityType.TALENT },
        { id: "talent/bar", name: "The Bar", entityType: entityType.VENUE }
      ]}
      autocompleteIndex={-1}
      onClick={action("onClick")}
    />
  ))
  .add("first result selected", () => (
    <AutocompleteResultList
      autocompleteItems={[
        { id: "talent/foo", name: "The Foo", entityType: entityType.TALENT },
        { id: "talent/bar", name: "The Bar", entityType: entityType.VENUE }
      ]}
      autocompleteIndex={0}
      onClick={action("onClick")}
    />
  ));

storiesOf("Search/SearchMenuOptionHandler/SearchInput", module)
  .addDecorator(withScreenshot())
  .add("default", () => (
    <SearchInput
      value="thevalue"
      onSearchClick={action("onSearchClick")}
      onChange={action("onChange")}
      onKeyPress={action("onKeyPress")}
      onKeyDown={action("onKeyDown")}
    />
  ));
