import styled from "styled-components";
import { TextAlignValues } from "../../../constants/css.types";

type Props = {
  background: string;
  size: string;
  bold: boolean;
  semiBold: boolean;
  lineHeight: number;
  maxWidth: string;
  textAlign: TextAlignValues;
};

type HTMLParagraphProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>;

const TextBody = styled.p<HTMLParagraphProps & Partial<Props>>`
  font-size: ${({ size }) => (size ? size : "16px")};
  font-weight: ${({ bold, semiBold }) =>
    bold ? "700" : semiBold ? "500" : "normal"};
  ${({ color }) => color && `color: ${color};`}
  ${({ lineHeight }) => lineHeight && `line-height: ${lineHeight}%;`}
  ${({ maxWidth }) => maxWidth && `max-width: ${maxWidth};`}
  ${({ textAlign }) => textAlign && `text-align: ${textAlign};`}
`;

export default TextBody;
