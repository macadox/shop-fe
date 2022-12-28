import styled, { css } from "styled-components";
import {
  FlexDirections,
  Displays,
  JustifyContents,
  AlignItems,
  Positions,
  CursorValues,
} from "../../../constants/css.types";
import { addSuffix } from "../../../utils/styleUtils";

type Props = {
  background: string;
  borderRadius: string;
  width: string;
  height: string;
  minHeight: string;
  p: string | number;
  px: string | number;
  py: string | number;
  m: string | number;
  mx: string | number;
  my: string | number;
  ml: string | number;
  mr: string | number;
  mt: string | number;
  mb: string | number;
  display: Displays;
  flexDirection: FlexDirections;
  justifyContent: JustifyContents;
  flexBasis: string;
  alignItems: AlignItems;
  alignSelf: AlignItems;
  gap: string | number;
  position: Positions;
  top: string;
  right: string;
  bottom: string;
  left: string;
  cursor: CursorValues;
};
type HTMLDivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const Container = styled.div<HTMLDivProps & Partial<Props>>`
  ${({ background }) => background && `background: ${background};`}
  ${({ borderRadius }) => borderRadius && `border-radius: ${borderRadius};`}
  ${({ width }) => width && `width: ${width};`}
  ${({ height }) => height && `height: ${height};`}
  ${({ minHeight }) => minHeight && `min-height: ${minHeight};`}
  ${({ p }) => p && `padding: ${p}${addSuffix(p)};`}
  ${({ px }) =>
    px &&
    css`
      padding-left: ${px}${addSuffix(px)};
      padding-right: ${px}${addSuffix(px)};
    `}
  ${({ py }) =>
    py &&
    css`
      padding-top: ${py}${addSuffix(py)};
      padding-bottom: ${py}${addSuffix(py)};
    `}
  ${({ m }) => m && `margin: ${m}${addSuffix(m)};`}
  ${({ mx }) =>
    mx &&
    css`
      margin-left: ${mx}${addSuffix(mx)};
      margin-right: ${mx}${addSuffix(mx)};
    `}
  ${({ my }) =>
    my &&
    css`
      margin-top: ${my}${addSuffix(my)};
      margin-bottom: ${my}${addSuffix(my)};
    `}
  ${({ ml }) => ml && `margin-left: ${ml}${addSuffix(ml)};`}
  ${({ mr }) => mr && `margin-right: ${mr}${addSuffix(mr)};`}
  ${({ mt }) => mt && `margin-top: ${mt}${addSuffix(mt)};`}
  ${({ mb }) => mb && `margin-bottom: ${mb}${addSuffix(mb)};`}
      
  ${({ display }) => display && `display: ${display};`}
  ${({ flexDirection }) => flexDirection && `flex-direction: ${flexDirection};`}
  ${({ justifyContent }) =>
    justifyContent && `justify-content: ${justifyContent};`}
  ${({ flexBasis }) => flexBasis && `flex-basis: ${flexBasis};`}
  ${({ alignItems }) => alignItems && `align-items: ${alignItems};`}
  ${({ alignSelf }) => alignSelf && `align-self: ${alignSelf};`}
  ${({ gap }) => gap && `gap: ${gap}${addSuffix(gap)};`}
  ${({ position }) => position && `position: ${position};`}
  ${({ top }) => top && `top: ${top};`}
  ${({ right }) => right && `right: ${right};`}
  ${({ bottom }) => bottom && `bottom: ${bottom};`}
  ${({ left }) => left && `left: ${left};`}

  ${({ cursor }) => cursor && `cursor: ${cursor};`}
`;

export default Container;
