import { styled } from "styled-components";
import * as colors from "../../../constants/colors";

type Props = {
  hasFocus?: boolean;
};

const DefaultBox = styled.div<Props>`
  width: 100%;
  height: 100%;
  background: transparent;
  color: ${colors.BLACK};
  outline: none;
  font-size: 16px;

  border: 1px solid ${colors.SHADOW};
  padding: 6px 12px;

  &:focus-within {
    border-color: ${colors.BLACK};
  }
  ${({ hasFocus }) => hasFocus && `border-color: ${colors.BLACK};`}
`;

export default DefaultBox;
