import { css, styled } from "styled-components";
import {
  FlexDirections,
  Displays,
  JustifyContents,
  AlignItems,
  Positions,
  CursorValues,
  FlexWrapValues,
} from "../../../constants/css.types";
import { HTMLDivProps } from "../../../constants/htmlProps.types";
import { addSuffix } from "../../../utils/styleUtils";

type Props = {
  $background: string;
  $borderRadius: string;
  $width: string;
  $maxWidth: string;
  $minWidth: string;
  $height: string;
  $maxHeight: string;
  $minHeight: string;
  $p: string | number;
  $px: string | number;
  $py: string | number;
  $pl: string | number;
  $pt: string | number;
  $pr: string | number;
  $pb: string | number;
  $m: string | number;
  $mx: string | number;
  $my: string | number;
  $ml: string | number;
  $mr: string | number;
  $mt: string | number;
  $mb: string | number;
  $display: Displays;
  $flexDirection: FlexDirections;
  $justifyContent: JustifyContents;
  $flexBasis: string;
  $flexGrow: number;
  $flexWrap: FlexWrapValues;
  $alignItems: AlignItems;
  $alignSelf: AlignItems;
  $gap: string | number;
  $position: Positions;
  $top: string;
  $right: string;
  $bottom: string;
  $left: string;
  $boxShadow: string;
  $cursor: CursorValues;
  $zIndex: number;
  $transform: string;
};

const Container = styled.div<HTMLDivProps & Partial<Props>>`
  ${({ $background }) => $background && `background: ${$background};`}
  ${({ $borderRadius }) => $borderRadius && `border-radius: ${$borderRadius};`}
  ${({ $width }) => $width && `width: ${$width};`}
  ${({ $maxWidth }) => $maxWidth && `max-width: ${$maxWidth};`}
  ${({ $minWidth }) => $minWidth && `min-width: ${$minWidth};`}
  ${({ $height }) => $height && `height: ${$height};`}
  ${({ $maxHeight }) => $maxHeight && `max-height: ${$maxHeight};`}
  ${({ $minHeight }) => $minHeight && `min-height: ${$minHeight};`}
  ${({ $p }) => $p && `padding: ${$p}${addSuffix($p)};`}
  ${({ $px }) =>
    $px &&
    css`
      padding-left: ${$px}${addSuffix($px)};
      padding-right: ${$px}${addSuffix($px)};
    `}
  ${({ $py }) =>
    $py &&
    css`
      padding-top: ${$py}${addSuffix($py)};
      padding-bottom: ${$py}${addSuffix($py)};
    `}
  ${({ $pl }) => $pl && `padding-left: ${$pl}${addSuffix($pl)};`}
  ${({ $pt }) => $pt && `padding-top: ${$pt}${addSuffix($pt)};`}
  ${({ $pr }) => $pr && `padding-right: ${$pr}${addSuffix($pr)};`}
  ${({ $pb }) => $pb && `padding-bottom: ${$pb}${addSuffix($pb)};`}
  ${({ $m }) => $m && `margin: ${$m}${addSuffix($m)};`}
  ${({ $mx }) =>
    $mx &&
    css`
      margin-left: ${$mx}${addSuffix($mx)};
      margin-right: ${$mx}${addSuffix($mx)};
    `}
  ${({ $my }) =>
    $my &&
    css`
      margin-top: ${$my}${addSuffix($my)};
      margin-bottom: ${$my}${addSuffix($my)};
    `}
  ${({ $ml }) => $ml && `margin-left: ${$ml}${addSuffix($ml)};`}
  ${({ $mr }) => $mr && `margin-right: ${$mr}${addSuffix($mr)};`}
  ${({ $mt }) => $mt && `margin-top: ${$mt}${addSuffix($mt)};`}
  ${({ $mb }) => $mb && `margin-bottom: ${$mb}${addSuffix($mb)};`}
      
  ${({ $display }) => $display && `display: ${$display};`}
  ${({ $flexDirection }) =>
    $flexDirection && `flex-direction: ${$flexDirection};`}
  ${({ $justifyContent }) =>
    $justifyContent && `justify-content: ${$justifyContent};`}
  ${({ $flexBasis }) => $flexBasis && `flex-basis: ${$flexBasis};`}
  ${({ $flexGrow }) => $flexGrow && `flex-grow: ${$flexGrow};`}
  ${({ $flexWrap }) => $flexWrap && `flex-wrap: ${$flexWrap};`}
  ${({ $alignItems }) => $alignItems && `align-items: ${$alignItems};`}
  ${({ $alignSelf }) => $alignSelf && `align-self: ${$alignSelf};`}
  ${({ $gap }) => $gap && `gap: ${$gap}${addSuffix($gap)};`}
  ${({ $position }) => $position && `position: ${$position};`}
  ${({ $top }) => $top && `top: ${$top};`}
  ${({ $right }) => $right && `right: ${$right};`}
  ${({ $bottom }) => $bottom && `bottom: ${$bottom};`}
  ${({ $left }) => $left && `left: ${$left};`}

  ${({ $boxShadow }) => $boxShadow && `box-shadow: ${$boxShadow};`}
  ${({ $cursor }) => $cursor && `cursor: ${$cursor};`}
  ${({ $zIndex }) => $zIndex && `z-index: ${$zIndex};`}
  ${({ $transform }) => $transform && `transform: ${$transform};`}
`;

export default Container;
