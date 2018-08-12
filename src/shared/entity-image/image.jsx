// @flow

import type { HOC } from "recompose";

import * as React from "react";
import { withStateHandlers, pure, compose } from "recompose";
import BackgroundImageBox from "./background-image-box";

type Props = {
  imageSrc: string,
  onError?: void => mixed
};

type EnhancedProps = {
  ...$Exact<Props>, // TODO this might be a flow bug that Exact is required here
  imageLoaded: boolean,
  setImageLoaded: void => void
};

export class ImageComponent extends React.Component<EnhancedProps> {
  _image: HTMLImageElement;

  constructor(props: EnhancedProps) {
    super(props);
    this._image = new Image();
    this._image.onload = this.handleImageLoad;
    this._image.onerror = this.handleImageError;
    this._image.src = props.imageSrc;
  }

  componentWillUnmount() {
    this._image.onload = null;
    this._image.onerror = null;
  }

  handleImageLoad = () => {
    this._image.onload && this.props.setImageLoaded();
  };

  handleImageError = () => {
    this._image.onerror && this.props.onError && this.props.onError();
  };

  render() {
    const { imageSrc, imageLoaded } = this.props;
    return imageLoaded ? (
      <BackgroundImageBox
        flex
        imageSrc={imageSrc}
        animation="fadeIn"
        data-test="image"
      />
    ) : null;
  }
}

const enhancer: HOC<*, Props> = compose(
  withStateHandlers(
    { imageLoaded: false },
    { setImageLoaded: () => () => ({ imageLoaded: true }) }
  ),
  pure
);

export default enhancer(ImageComponent);
