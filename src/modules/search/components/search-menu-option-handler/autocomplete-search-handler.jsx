// @flow

import type { RouterHistory } from "react-router-dom";
import type { AutocompleteNode } from "../../flow-types";

import * as React from "react";
import _ from "lodash";
import isEmpty from "lodash/isEmpty";
import { withRouter } from "react-router-dom";
import SearchInputHandler from "./search-input-handler";
import AutocompleteResultList from "./autocomplete-result-list";
import { NONE_SELECTED } from "../../constants";

type Props = {
  +autocompleteItems: ?Array<AutocompleteNode>,
  +autocompleteIndex: number,
  +onAutocomplete: string => void,
  +onSearch: string => void,
  +onClose: void => void,
  +onAutocompleteItemSelect: number => void,
  +history: RouterHistory
};

export class AutocompleteSearchHandler extends React.Component<Props> {
  handleArrowUp = () => {
    this._updateAutocompleteIndex(this.props.autocompleteIndex - 1);
  };

  handleArrowDown = () => {
    this._updateAutocompleteIndex(this.props.autocompleteIndex + 1);
  };

  _updateAutocompleteIndex(value: number) {
    const { autocompleteItems, onAutocompleteItemSelect } = this.props;
    if (isEmpty(autocompleteItems)) {
      return;
    }
    onAutocompleteItemSelect(
      _.clamp(value, NONE_SELECTED, autocompleteItems.length - 1)
    );
  }

  handleSearch = (value: string) => {
    const {
      autocompleteIndex,
      autocompleteItems,
      onSearch,
      onClose,
      history
    } = this.props;
    if (
      autocompleteItems &&
      autocompleteIndex !== NONE_SELECTED &&
      autocompleteIndex < autocompleteItems.length
    ) {
      onClose();
      const item = autocompleteItems[autocompleteIndex];
      history.push({ pathname: "/" + item.id });
    } else if (!isEmpty(value)) {
      onSearch(value);
    }
  };

  render() {
    const {
      autocompleteIndex,
      autocompleteItems,
      onAutocomplete,
      onClose
    } = this.props;
    return (
      <React.Fragment>
        <SearchInputHandler
          onAutocomplete={onAutocomplete}
          onSearch={this.handleSearch}
          onArrowUp={this.handleArrowUp}
          onArrowDown={this.handleArrowDown}
        />
        <AutocompleteResultList
          autocompleteItems={autocompleteItems}
          autocompleteIndex={autocompleteIndex}
          onClick={onClose}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(AutocompleteSearchHandler);
