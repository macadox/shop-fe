import React from "react";
import { SpinnerHead, StyledSpinner } from "./Spinner.style";
import * as colors from "../../../constants/colors";

export const sizes = {
  xl: 1,
  l: 0.75,
  m: 0.4,
  s: 0.25,
  xs: 0.125,
} as const;

type Size = keyof typeof sizes;

const Spinner = ({
  size = "m",
  color = colors.BLACK,
}: {
  size?: Size;
  color?: string;
}) => {
  return (
    <StyledSpinner aria-label="loading" size={sizes[size]} color={color}>
      <SpinnerHead size={sizes[size]} color={color} />
    </StyledSpinner>
  );
};

export default Spinner;
