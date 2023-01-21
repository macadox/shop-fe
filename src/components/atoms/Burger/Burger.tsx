import React from "react";
import { StyledBurger, StyledHam } from "./Burger.style";
import { HTMLButtonProps } from "../../../constants/htmlProps.types";

export type BurgerProps = HTMLButtonProps & {
  $active: boolean;
  onClickHandler: () => void;
};

const Burger = ({ $active, onClickHandler }: BurgerProps) => {
  return (
    <StyledBurger
      aria-label={`${$active ? "hide" : "open"} navigation`}
      $active={$active}
      onClick={onClickHandler}
      id="burger"
    >
      <StyledHam />
    </StyledBurger>
  );
};

export default Burger;
