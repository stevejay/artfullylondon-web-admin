// @flow

import type { HOC } from "recompose";

import * as React from "react";
import { withStateHandlers, pure, compose, defaultProps } from "recompose";
import LazyLoad from "react-lazyload";
import { Box } from "grommet";
import Placeholder from "./placeholder";
import Image from "./image";

type Props = {
  +entityType: string,
  +a11yTitle: string,
  +imageSrc: ?string,
  +backgroundColor: ?string,
  +lazyLoad?: ?boolean,
  +lazyLoadOffset?: ?number
};

type EnhancedProps = {
  // TODO I had to duplicate Props here rather than use the spread operator.
  // It has something to do with the default props.
  +entityType: string,
  +a11yTitle: string,
  +imageSrc: ?string,
  +backgroundColor: ?string,
  +lazyLoad: ?boolean,
  +lazyLoadOffset: ?number,
  +loadFailed: boolean,
  +setLoadFailed: void => mixed
};

const EntityImage = ({
  entityType,
  a11yTitle,
  imageSrc,
  backgroundColor,
  lazyLoad,
  lazyLoadOffset,
  loadFailed,
  setLoadFailed
}: EnhancedProps) => (
  <Box
    tag="section"
    fill
    background={backgroundColor || "light-4"}
    a11yTitle={a11yTitle}
  >
    {(!imageSrc || loadFailed) && <Placeholder entityType={entityType} />}
    {imageSrc &&
      !loadFailed &&
      (lazyLoad ? (
        <LazyLoad once height="100%" offset={lazyLoadOffset || 100}>
          <Image imageSrc={imageSrc} onError={setLoadFailed} />
        </LazyLoad>
      ) : (
        <Image imageSrc={imageSrc} onError={setLoadFailed} />
      ))}
  </Box>
);

const enhancer: HOC<*, Props> = compose(
  defaultProps({ lazyLoad: true, lazyLoadOffset: 100 }),
  withStateHandlers(
    { loadFailed: false },
    { setLoadFailed: () => () => ({ loadFailed: true }) }
  ),
  pure
);

export default enhancer(EntityImage);
