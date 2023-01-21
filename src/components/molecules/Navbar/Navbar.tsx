import React, { useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import Container from "../../atoms/Container/Container";
import TextBody from "../../atoms/TextBody/TextBody";
import Burger from "../../atoms/Burger/Burger";
import Button, { ButtonTheme, buttonThemes } from "../../atoms/Button/Button";
import { StyledNav, StyledMenu, StyledMenuItem } from "./Navbar.style";
import useScreenOrientation from "../../../hooks/useScreenOrientation";

import { valueof } from "../../../utils/typeUtils";
import { ROUTES } from "../../../constants/routes";
import * as colors from "../../../constants/colors";
import { ReactComponent as BagIcon } from "../../../assets/icons/shopping-bag.svg";
import { ReactComponent as HeartIcon } from "../../../assets/icons/heart.svg";

const MenuButton = ({
  theme = buttonThemes.transparent,
  text,
  icon,
  hasFill,
  hasStroke,
  to,
}: {
  theme?: ButtonTheme;
  text?: string;
  icon?: React.ReactNode;
  hasFill?: boolean;
  hasStroke?: boolean;
  to: valueof<typeof ROUTES>;
}) => (
  <Link to={to}>
    <Button
      theme={theme}
      text={text}
      icon={icon}
      hasFill={hasFill}
      hasStroke={hasStroke}
      fontSize="20px"
    />
  </Link>
);

const Logo = () => {
  return (
    <TextBody $bold={true} size="20px" letterSpacing={4}>
      ALPHASHOP
    </TextBody>
  );
};

const Menu = ({ $active }: { $active: boolean }) => {
  return (
    <StyledMenu $active={$active} role="menu">
      <StyledMenuItem role="menuitem">
        <MenuButton to={ROUTES.HOME} text="HOME" />
      </StyledMenuItem>
      <StyledMenuItem role="menuitem">
        <MenuButton to={ROUTES.CATEGORIES} text="CATEGORIES" />
      </StyledMenuItem>
      <StyledMenuItem role="menuitem">
        <MenuButton
          to={ROUTES.FAVORITES}
          hasFill
          icon={<HeartIcon fill={colors.BLACK} width={24} height={24} />}
        />
      </StyledMenuItem>
      <StyledMenuItem role="menuitem">
        <MenuButton
          to={ROUTES.CART}
          hasFill
          icon={<BagIcon fill={colors.BLACK} width={24} height={24} />}
        />
      </StyledMenuItem>
    </StyledMenu>
  );
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const orientation = useScreenOrientation();

  useLayoutEffect(() => {
    const shouldOpen =
      orientation === "landscape-primary" ||
      orientation === "landscape-secondary"
        ? true
        : false;

    setOpen(shouldOpen);
  }, [orientation]);

  return (
    <StyledNav $active={open}>
      <Container
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        $maxWidth="1280px"
        mx="auto"
      >
        <Logo />
        <Burger
          $active={open}
          onClickHandler={() => setOpen((prev) => !prev)}
        />
        {open && <Menu $active={open} />}
      </Container>
    </StyledNav>
  );
};

export default Navbar;
