// @flow

import * as React from "react";
import { shouldUpdate } from "recompose";

const ICON_OFFSET = "-5%";

type Props = {
  +icon: React.ElementType,
  +size: string,
  +color: string,
  +alignment: "left" | "right"
};

const Icon = ({ icon, size, color, alignment }: Props) =>
  React.createElement(icon, {
    color,
    size,
    "aria-hidden": true,
    role: "presentation",
    style: {
      position: "absolute",
      left: alignment === "left" ? ICON_OFFSET : "auto",
      right: alignment === "left" ? "auto" : ICON_OFFSET,
      bottom: ICON_OFFSET,
      zIndex: -1
    }
  });

export default shouldUpdate(() => false)(Icon);
