import React from "react";
import styled, { css } from "styled-components";
import {
  Displays,
  JustifyContents,
  AlignItems,
} from "../../../constants/css.types";
import { HTMLButtonProps } from "../../../constants/htmlProps.types";
import * as colors from "../../../constants/colors";

type OverridableStyles = {
  width: string;
  height: string;
  paddingTop: string;
  paddingBottom: string;
  paddingLeft: string;
  paddingRight: string;
};

type ButtonTheme = {
  background: string;
  bold: boolean;
  width?: string;
  height?: string;
  border: string;
  color: string;
  fontSize: string;
  uppercase?: boolean;
  paddingTop: string;
  paddingBottom: string;
  paddingLeft: string;
  paddingRight: string;
  display?: Displays;
  justifyContent?: JustifyContents;
  alignItems?: AlignItems;
  gap?: string;
  hover?: {
    background?: string;
    color?: string;
    borderColor?: string;
  };
  press?: {
    background?: string;
    color?: string;
    borderColor?: string;
  };
};

const defaultTheme: ButtonTheme = {
  background: colors.BLACK,
  bold: true,
  border: `2px solid ${colors.BLACK}`,
  color: colors.WHITE,
  fontSize: "18px",
  gap: "12px",
  paddingBottom: "6px",
  paddingLeft: "12px",
  paddingRight: "12px",
  paddingTop: "6px",
  uppercase: true,
  hover: {
    background: colors.WHITE,
    color: colors.BLACK,
  },
  press: {
    background: colors.WHITE,
    color: colors.BLACK,
  },
};

export const buttonThemes: { [key: string]: ButtonTheme } = {
  default: defaultTheme,
  inverseDefault: {
    ...defaultTheme,
    background: colors.WHITE,
    border: `3px solid ${colors.WHITE}`,
    color: colors.BLACK,
    hover: {
      background: colors.BLACK,
      color: colors.WHITE,
    },
    press: {
      background: colors.BLACK,
      color: colors.WHITE,
    },
  },
  light: {
    background: colors.WHITE,
    bold: true,
    border: `1px solid ${colors.SHADOW}`,
    color: colors.BLACK,
    fontSize: "18px",
    gap: "12px",
    paddingBottom: "6px",
    paddingLeft: "12px",
    paddingRight: "12px",
    paddingTop: "6px",
    hover: {
      background: colors.LIGHTER,
      borderColor: colors.LIGHT,
    },
    press: {
      background: colors.LIGHTER,
    },
  },
  transparent: {
    background: "transparent",
    bold: false,
    border: "none",
    color: colors.GRAY,
    fontSize: "16px",
    gap: "8px",
    paddingTop: "0px",
    paddingBottom: "0px",
    paddingLeft: "0px",
    paddingRight: "0px",
    uppercase: true,
    hover: {
      color: colors.BLACK,
    },
  },
};

type Props = Partial<OverridableStyles> & {
  theme?: ButtonTheme;
  onClick: () => void;
  isActive?: boolean;
  hasFill?: boolean;
  hasStroke?: boolean;
} & (
    | {
        icon: React.ReactNode;
        text?: string;
      }
    | {
        icon?: React.ReactNode;
        text: string;
      }
  );

const StyledButton = styled.button<HTMLButtonProps & Props>`
  /* THEME */
  background: ${({ theme }) => theme.background};

  border: ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.color};
  font-size: ${({ theme }) => theme.fontSize};
  /* THEME, OVERRIDABLE */
  width: ${({ theme, width }) => (width ? width : theme.width)};
  height: ${({ theme, height }) => (height ? height : theme.height)};
  padding-top: ${({ theme, paddingTop }) =>
    paddingTop ? paddingTop : theme.paddingTop};
  padding-bottom: ${({ theme, paddingBottom }) =>
    paddingBottom ? paddingBottom : theme.paddingBottom};
  padding-left: ${({ theme, paddingLeft }) =>
    paddingLeft ? paddingLeft : theme.paddingLeft};
  padding-right: ${({ theme, paddingRight }) =>
    paddingRight ? paddingRight : theme.paddingRight};
  /* OPTIONAL */
  ${({ theme }) => theme.display && `display: ${theme.display};`}
  ${({ theme }) =>
    theme.justifyContent && `justify-content: ${theme.justifyContent};`}
  ${({ theme }) => theme.alignItems && `align-items: ${theme.alignItems};`}
  ${({ theme }) => theme.gap && `gap: ${theme.gap};`}

  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  & svg {
    margin-top: 3px;
  }

  /* STATES  */
  &:hover:enabled {
    ${({ theme }: { theme: ButtonTheme }) =>
      theme?.hover?.background && `background: ${theme.hover.background};`}
    ${({ theme }: { theme: ButtonTheme }) =>
      theme?.hover?.color && `color: ${theme.hover.color};`}
    ${({ theme }: { theme: ButtonTheme }) =>
      theme?.hover?.borderColor && `border-color: ${theme.hover.borderColor};`}

    & svg {
      ${({ hasFill, theme }: { hasFill?: boolean; theme: ButtonTheme }) =>
        hasFill && theme?.hover?.color && `fill: ${theme.hover.color};`}
      ${({ hasStroke, theme }: { hasStroke?: boolean; theme: ButtonTheme }) =>
        hasStroke && theme?.hover?.color && `stroke: ${theme.hover.color};`}
    }
  }

  &:active:enabled {
    ${({ theme }: { theme: ButtonTheme }) =>
      theme?.press?.background && `background: ${theme.press.background};`}
    ${({ theme }: { theme: ButtonTheme }) =>
      theme?.press?.color && `color: ${theme.press.color};`}
    ${({ theme }: { theme: ButtonTheme }) =>
      theme?.press?.borderColor && `border-color: ${theme.press.borderColor};`}

    & svg {
      ${({ hasFill, theme }: { hasFill?: boolean; theme: ButtonTheme }) =>
        hasFill && theme?.press?.color && `fill: ${theme.press.color};`}
      ${({ hasStroke, theme }: { hasStroke?: boolean; theme: ButtonTheme }) =>
        hasStroke && theme?.press?.color && `stroke: ${theme.press.color};`}
    }
  }

  ${({ isActive, theme }) =>
    isActive &&
    theme?.press?.background &&
    css`
      background: ${theme.press.background};
      color: ${theme.press.color};
    `}

  &:disabled {
    opacity: 0.7;
  }
`;

const Button: React.FC<Props> = (props) => (
  <StyledButton {...props}>
    {props.icon && <span>{props.icon}</span>}
    {props.text && <span>{props.text}</span>}
  </StyledButton>
);

Button.defaultProps = {
  theme: buttonThemes.default,
};

export default Button;
