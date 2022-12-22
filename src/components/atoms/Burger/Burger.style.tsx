import styled, { css } from "styled-components";
import * as colors from "../../../constants/colors";
import { HTMLButtonProps } from "./Burger";

export const StyledBurger = styled.button<
  HTMLButtonProps & { isOpen: boolean }
>`
  width: 40px;
  height: 36px;
  border-radius: 3px;
  position: relative;
  transition: 0.15s ease-in-out;
  cursor: pointer;

  & > span {
    position: absolute;
    top: calc(50% - 2px);
    left: calc(50% - 17px);
    width: 34px;
    height: 2px;
    border-radius: 2px;
    background: ${colors.BLACK};
    transition: 0.15s ease-in-out;

    ${({ isOpen }) => isOpen && `opacity: 0;`}
  }

  &::after,
  &::before {
    content: "";
    position: absolute;
    left: calc(50% - 17px);
    width: 34px;
    height: 2px;
    border-radius: 2px;
    background: ${colors.BLACK};
    transition: 0.15s ease-in-out;
  }

  &::before {
    top: calc(50% - 14px);
  }

  &::after {
    top: calc(50% + 10px);
  }

  ${({ isOpen }) =>
    isOpen &&
    css`
      transform: rotate(90deg);

      & > span {
        opacity: 0;
      }

      &::before {
        top: calc(50% - 2px);
        transform: rotate(45deg);
      }

      &::after {
        top: calc(50% - 2px);
        transform: rotate(-45deg);
      }
    `}
`;
