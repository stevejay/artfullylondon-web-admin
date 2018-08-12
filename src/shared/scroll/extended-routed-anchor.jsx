// @flow

import type { RouterHistory } from "react-router-dom";

import * as React from "react";
import { withRouter } from "react-router-dom";
import window from "global/window";
import withTheme from "shared/with-theme";
import ExtendedAnchor from "shared/extended-anchor";

type Props = {
  +path: string,
  +method: string,
  +plain?: boolean,
  +color?: string,
  +onClick: any => mixed,
  +history: RouterHistory
};

class ExtendedRoutedAnchor extends React.Component<Props> {
  static defaultProps = { method: "push" };

  // TODO fix the uses of any in the arg list
  handleClick = (event: any, ...args: any) => {
    const { path, method, onClick, history } = this.props;
    if (event) {
      const modifierKey = event.ctrlKey || event.metaKey;
      // ignore clicks with modifiers
      if (modifierKey) {
        return;
      }
    }
    event.preventDefault();
    if (window) {
      const scrollY = window.scrollY;
      if (scrollY > 0) {
        history.replace({ state: { scrollY } });
      }
    }
    history[method](path);
    onClick && onClick(event, ...args);
  };

  render() {
    const { path, method, ...rest } = this.props;
    return <ExtendedAnchor {...rest} href={path} onClick={this.handleClick} />;
  }
}

export default withTheme(withRouter(ExtendedRoutedAnchor));
