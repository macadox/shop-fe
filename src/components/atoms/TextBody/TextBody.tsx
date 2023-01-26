import { styled } from "styled-components";
import { TextAlignValues, CursorValues } from "../../../constants/css.types";

type Props = {
  $size: string;
  $bold: boolean;
  $color: string;
  $semiBold: boolean;
  $lineHeight: number;
  $letterSpacing: number;
  $maxWidth: string;
  $textAlign: TextAlignValues;
  $opacity: number;
  $cursor: CursorValues;
};

type HTMLParagraphProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>;

const TextBody = styled.p<HTMLParagraphProps & Partial<Props>>`
  font-size: ${({ $size }) => ($size ? $size : "16px")};
  font-weight: ${({ $bold, $semiBold }) =>
    $bold ? "700" : $semiBold ? "500" : "normal"};
  ${({ $color }) => $color && `color: ${$color};`}
  ${({ $lineHeight }) => $lineHeight && `line-height: ${$lineHeight}%;`}
  ${({ $letterSpacing }) =>
    $letterSpacing && `letter-spacing: ${$letterSpacing}px;`}
  ${({ $maxWidth }) => $maxWidth && `max-width: ${$maxWidth};`}
  ${({ $textAlign }) => $textAlign && `text-align: ${$textAlign};`}
  ${({ $opacity }) => $opacity && `opacity: ${$opacity};`}
  ${({ $cursor }) => $cursor && `cursor: ${$cursor};`}
`;

export default TextBody;
