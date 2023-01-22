import { styled } from "styled-components";
import * as colors from "../../../constants/colors";
import { PRODUCT_WIDGET_PHOTO_SIZE } from "../../../constants/layout";

export const StyledProductWidget = styled.div`
  position: relative;
  background: ${colors.WHITE};
  height: calc(${PRODUCT_WIDGET_PHOTO_SIZE} + "100px");
  width: ${PRODUCT_WIDGET_PHOTO_SIZE};
  box-shadow: 0px 4px 12px 0px ${colors.SHADOW};
  transition: box-shadow 0.2s 0.1s ease-in-out, transform 0.2s ease-in-out;

  button {
    opacity: 0;
  }

  &:hover,
  &:focus-within {
    transform: translateY(-1.5px);
    box-shadow: 0px 4px 12px 8px ${colors.SHADOW};
    outline: none;
    button {
      opacity: 1;
    }
  }
`;

export const LikeButton = styled.button`
  width: 50px;
  height: 50px;
  background: ${colors.WHITE};
  position: absolute;
  top: 0;
  right: 0;

  display: flex;
  justify-content: center;
  align-items: center;
`;
