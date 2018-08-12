// @flow

import * as React from "react";
import Waypoint from "react-waypoint";

// Fixes an issue with Grommet's InfiniteScroll component
// where it does not play well with Apollo Client paging.

// TODO convert this to use recompose.

type Props = {
  +items: Array<any>,
  +step: number,
  +children: Function,
  +renderMarker: ?any,
  +scrollableAncestor: ?any,
  onMore: ?(void) => mixed
};

type State = {
  count: number
};

export default class InfiniteScroll extends React.Component<Props, State> {
  static defaultProps = {
    items: [],
    step: 50,
    renderMarker: null,
    scrollableAncestor: null
  };

  constructor(props: Props) {
    super(props);
    this.state = { count: Math.ceil(props.items.length / props.step) };
  }

  increaseOffset = () => {
    const { items, onMore, step } = this.props;
    const { count } = this.state;
    this.setState(
      { count: count + 1 },
      // call onMore if we've reached the end of the items
      () => onMore && (count + 1) * step >= items.length && onMore()
    );
  };

  render() {
    const {
      children,
      items,
      renderMarker,
      scrollableAncestor,
      step
    } = this.props;
    const { count } = this.state;
    const displayCount = step * count;
    const waypointAt = displayCount - step / 2;

    let marker = (
      <Waypoint
        key="marker"
        onEnter={this.increaseOffset}
        bottomOffsetX="-96px"
        scrollableAncestor={scrollableAncestor}
      />
    );

    if (renderMarker) {
      // need to give it a key
      marker = React.cloneElement(renderMarker(marker), { key: "marker" });
    }

    return items
      .slice(0, displayCount)
      .map((item, index) => [
        children(item, index),
        index === waypointAt && marker
      ]);
  }
}
