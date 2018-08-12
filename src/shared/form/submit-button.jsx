// @flow

import * as React from "react";
import { Button } from "grommet";

type Props = {
  +isSubmitting: boolean,
  +label: string
};

const SubmitButton = ({ isSubmitting, label, ...rest }: Props) => (
  <Button
    {...rest}
    type={isSubmitting ? null : "submit"}
    label={label}
    primary
    data-test="submit"
  />
);

export default SubmitButton;
