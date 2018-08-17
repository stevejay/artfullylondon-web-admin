// @flow

import type { HOC } from "recompose";
import type { MutationOperation } from "apollo-client";
import type { QueryRenderProps } from "react-apollo";
import type { Location, RouterHistory } from "react-router-dom";
import type { AutocompleteNode } from "../../flow-types";

import * as React from "react";
import log from "loglevel";
import _ from "lodash";
import { Layer } from "grommet";
import { Query, graphql, withApollo } from "react-apollo";
import { withRouter } from "react-router-dom";
import { withStateHandlers, compose } from "recompose";
import ModalChrome from "shared/modal-chrome";
import * as entityType from "shared/types/entity-type";
import { UpdateSearchParams } from "../../graphql/mutations";
import { Autocomplete } from "../../graphql/queries";
import AutocompleteSearchHandler from "./autocomplete-search-handler";
import { NONE_SELECTED } from "../../constants";

type Props = {
  +open: boolean,
  +onClose: void => void
};

type EnhancedProps = {
  ...$Exact<Props>, // TODO this might be a flow bug that Exact is required here
  +client: any, // TODO fix any
  +location: Location,
  +history: RouterHistory,
  +mutate: MutationOperation<>,
  +autocompleteTerm: string,
  +autocompleteIndex: number,
  +setAutocompleteTerm: string => void,
  +resetAutocompleteIndex: () => void,
  +setAutocompleteIndex: number => void
};

type QueryData = {
  +autocompleteSearch: {
    +results: ?Array<AutocompleteNode>
  }
};

class SearchModalHandler extends React.Component<EnhancedProps> {
  // TODO do debounce directly on setAutocompleteTerm func?
  handleAutocomplete = _.debounce((value: string) => {
    this.props.setAutocompleteTerm(value);
  }, 250);

  handleSearch = (value: string) => {
    const { onClose, location, history } = this.props;
    this.props
      .mutate({
        variables: { term: value.trim(), entityType: entityType.ALL }
      })
      .then(() => {
        onClose();
        location.pathname !== "/search" &&
          history.push({ pathname: "/search" });
      })
      .catch(log.error);
  };

  handleClose = () => {
    this.props.resetAutocompleteIndex();
    this.props.setAutocompleteTerm("");
    this.props.onClose();
  };

  render() {
    const {
      open,
      autocompleteIndex,
      autocompleteTerm,
      resetAutocompleteIndex,
      setAutocompleteIndex
    } = this.props;
    return open ? (
      <Query
        query={Autocomplete}
        fetchPolicy="no-cache"
        variables={{ term: autocompleteTerm }}
        onCompleted={resetAutocompleteIndex}
      >
        {({ data }: QueryRenderProps<QueryData>) => (
          <Layer
            modal
            full
            plain
            onClickOutside={this.handleClose}
            onEsc={this.handleClose}
          >
            <ModalChrome a11yTitle="search dialog" onClose={this.handleClose}>
              <AutocompleteSearchHandler
                autocompleteItems={
                  !data || !data.autocompleteSearch
                    ? null
                    : data.autocompleteSearch.results
                }
                autocompleteIndex={autocompleteIndex}
                onClose={this.handleClose}
                onAutocomplete={this.handleAutocomplete}
                onAutocompleteItemSelect={setAutocompleteIndex}
                onSearch={this.handleSearch}
              />
            </ModalChrome>
          </Layer>
        )}
      </Query>
    ) : null;
  }
}

const enhancer: HOC<*, Props> = compose(
  withRouter,
  withApollo,
  withStateHandlers(
    { autocompleteTerm: "", autocompleteIndex: NONE_SELECTED },
    {
      setAutocompleteTerm: () => value => ({
        autocompleteTerm: value,
        autocompleteIndex: NONE_SELECTED
      }),
      resetAutocompleteIndex: state => () => ({
        ...state,
        autocompleteIndex: NONE_SELECTED
      }),
      setAutocompleteIndex: state => value => ({
        ...state,
        autocompleteIndex: value
      })
    }
  ),
  graphql(UpdateSearchParams)
);

export default enhancer(SearchModalHandler);
