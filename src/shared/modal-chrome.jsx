// @flow

import * as React from "react";
import { pure } from "recompose";
import { Box } from "grommet";
import { Button } from "grommet";
import { FormClose } from "grommet-icons";

const CloseIcon = <FormClose size="large" />;
const CONTENT_BOX_PADDING = { horizontal: "medium", bottom: "medium" };

type Props = {
  +a11yTitle: string,
  +children: React.Node,
  onClose(): mixed
};

// TODO the dialog disappears instantly instead of fading away nicely.
// I might need to use react-overlays to create a smoother effect.

const ModalChrome = ({ a11yTitle, children, onClose }: Props) => (
  <Box
    tag="section"
    flex="grow"
    fill
    background="light-1"
    direction="column"
    responsive
    role="dialog"
    a11yTitle={a11yTitle}
    data-test="modal"
  >
    <Box align="end" flex={false}>
      <Button
        a11yTitle="Close the dialog"
        icon={CloseIcon}
        onClick={onClose}
        data-test="close dialog"
      />
    </Box>
    <Box pad={CONTENT_BOX_PADDING} flex="grow" basis="xsmall">
      {children}
    </Box>
  </Box>
);

export default pure(ModalChrome);
