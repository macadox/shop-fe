import { styled } from "styled-components";
import * as colors from "../../../constants/colors";

export const StyledMenu = styled.ul<{ $active: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;

  display: flex;
  flex-direction: column;
  align-items: center;

  background: ${colors.WHITE};
  padding-top: 30px;
  padding-bottom: 30px;
  list-style: none;
  box-shadow: 0px 4px 12px ${colors.SHADOW};
`;

export const StyledMenuItem = styled.li`
  &:not(:first-of-type) {
    margin-top: 16px;
  }
`;

export const StyledNav = styled.nav`
  container-type: inline-size;
  container-name: navbar;
  position: sticky;
  background: ${colors.WHITE};
  top: 0px;
  left: 0px;
  z-index: 100;
  padding: 24px;
  box-shadow: 0px 4px 12px ${colors.SHADOW};

  @media (min-width: 768px) and (orientation: landscape) {
    position: static;
    padding: 36px;
  }

  @container navbar (width > 640px) {
    & #burger {
      display: none;
    }

    ${StyledMenu} {
      position: static;
      padding: 0;
      box-shadow: none;
      flex-direction: row;
      gap: 16px;
    }

    ${StyledMenuItem} {
      margin: 0;
    }
  }
`;
