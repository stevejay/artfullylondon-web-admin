// @flow

import * as React from "react";
import PatternedBox from "./patterned-box";
import Icon from "./icon";

type Props = {
  +pattern?: ?string
};

const HeroBox = ({ pattern, ...rest }: Props) => (
  <PatternedBox {...rest} pattern={pattern} />
);

HeroBox.Icon = Icon;
export default HeroBox;
