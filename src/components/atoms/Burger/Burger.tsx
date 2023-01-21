import React from "react";
import { StyledBurger } from "./Burger.style";
import { HTMLButtonProps } from "../../../constants/htmlProps.types";

export type BurgerProps = HTMLButtonProps & {
  isOpen: boolean;
  onClickHandler: () => void;
};

const Burger = ({ isOpen, onClickHandler }: BurgerProps) => {
  return (
    <StyledBurger
      aria-label={`${isOpen ? "hide" : "open"} navigation`}
      isOpen={isOpen}
      onClick={onClickHandler}
    >
      <span />
    </StyledBurger>
  );
};

export default Burger;
