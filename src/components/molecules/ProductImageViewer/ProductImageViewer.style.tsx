import { styled } from "styled-components";
import * as colors from "../../../constants/colors";

export const SelectImageButton = styled.button<{ $isActive: boolean }>`
  background: ${({ $isActive }) => ($isActive ? colors.BLACK : "transparent")};
  width: 10px;
  height: 10px;
  border: 1px solid ${colors.BLACK};
`;
