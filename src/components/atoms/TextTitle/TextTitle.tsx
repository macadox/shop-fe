import styled from "styled-components";
import { TextAlignValues, HeadingTypes } from "../../../constants/css.types";

type Props = {
  color: string;
  size: string;
  textAlign: TextAlignValues;
  letterSpacing: string;
  lineHeight: number;
  semiBold: boolean;
  bold: boolean;
  italic: boolean;
  uppercase: boolean;
  truncate: boolean;
};

type RequiredProps = {
  as: HeadingTypes;
};

type HTMLHeadingProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>;

const TextTitle = styled.div<HTMLHeadingProps & RequiredProps & Partial<Props>>`
  ${({ color }) => color && `color: ${color};`}
  font-size: ${({ size }) => (size ? size : "16px")};
  font-weight: ${({ bold, semiBold }) =>
    bold ? "700" : semiBold ? "500" : "normal"};
  ${({ textAlign }) => textAlign && `text-align: ${textAlign};`}
  ${({ letterSpacing }) => letterSpacing && `letter-spacing: ${letterSpacing};`}
  ${({ lineHeight }) => lineHeight && `line-height: ${lineHeight};`}
  /* Style */
  ${({ italic }) => italic && `font-style: italic;`}
  ${({ uppercase }) => uppercase && `text-transform: uppercase;`} 
  ${({ truncate }) =>
    truncate &&
    `
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `}

  margin-block-start: 0;
  margin-block-end: 0;
`;

export default TextTitle;
