// @flow

import type { HOC } from "recompose";

import * as React from "react";
import { withStateHandlers, compose, pure } from "recompose";
import SearchInput from "./search-input";

type Props = {
  +onAutocomplete: string => void,
  +onSearch: string => void,
  +onArrowUp: void => void,
  +onArrowDown: void => void
};

type EnhancedProps = {
  ...$Exact<Props>, // TODO this might be a flow bug that Exact is required here
  +value: string,
  +setValue: string => void
};

export class SearchInputHandler extends React.Component<EnhancedProps> {
  handleChange = (event: SyntheticEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    this.props.setValue(value);
    const normalisedValue = value.trim();
    this.props.onAutocomplete(
      normalisedValue.length > 1 ? normalisedValue : ""
    );
  };

  handleKeyPress = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      this.handleSearchClick();
    }
  };

  handleKeyDown = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowUp") {
      this.props.onArrowUp();
      event.preventDefault();
    } else if (event.key === "ArrowDown") {
      this.props.onArrowDown();
      event.preventDefault();
    }
  };

  handleSearchClick = () => {
    this.props.onSearch(this.props.value.trim());
  };

  render() {
    return (
      <SearchInput
        value={this.props.value}
        onSearchClick={this.handleSearchClick}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
        onKeyPress={this.handleKeyPress}
      />
    );
  }
}

const enhancer: HOC<*, Props> = compose(
  withStateHandlers({ value: "" }, { setValue: () => value => ({ value }) }),
  pure
);

export default enhancer(SearchInputHandler);
