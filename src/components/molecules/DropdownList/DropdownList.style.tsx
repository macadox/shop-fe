import { styled } from "styled-components";
import * as colors from "../../../constants/colors";
import { HTMLLiProps, HTMLUlProps } from "../../../constants/htmlProps.types";

export const StyledList = styled.ul<HTMLUlProps>`
  position: absolute;
  top: calc(100% + 4px);
  min-width: min-content;
  width: 100%;
  right: 0;
  background: ${colors.WHITE};
  box-shadow: 0px 4px 12px 0px ${colors.SHADOW};
  z-index: 100;
  max-height: 150px;
  overflow-y: scroll;
`;

export const StyledListItem = styled.li<HTMLLiProps & { $isSelected: boolean }>`
  width: 100%;
  height: 100%;
  background: transparent;
  color: ${colors.BLACK};
  outline: none;

  padding: 6px 12px;

  &:hover {
    background: ${colors.LIGHTER};
  }

  ${({ $isSelected }) =>
    $isSelected && `background: ${colors.SHADOW} !important;`}

  cursor: pointer;
`;
