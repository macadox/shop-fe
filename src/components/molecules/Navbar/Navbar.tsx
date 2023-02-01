import React, { useState, useLayoutEffect, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import Container from "../../atoms/Container/Container";
import TextBody from "../../atoms/TextBody/TextBody";
import Burger from "../../atoms/Burger/Burger";
import Button, { ButtonTheme, buttonThemes } from "../../atoms/Button/Button";
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import { StyledNav, StyledMenu, StyledMenuItem } from "./Navbar.style";
import useScreenOrientation, {
  ORIENTATIONS,
} from "../../../hooks/useScreenOrientation";
import useCart from "../../../store/cart/cart";

import { valueof } from "../../../utils/typeUtils";
import { ROUTES } from "../../../constants/routes";
import { INNER_CONTAINER_MAX_WIDTH } from "../../../constants/layout";
import * as colors from "../../../constants/colors";

import { ReactComponent as BagIcon } from "../../../assets/icons/shopping-bag.svg";
import { ReactComponent as HeartIcon } from "../../../assets/icons/heart.svg";

const defaults = {
  HOME: "HOME",
  SUSTAINABILITY: "SUSTAINABILITY",
  FAVORITES: "FAVORITES",
  CART: "CART",
};

const isLandscape = (orientation: keyof typeof ORIENTATIONS) => {
  return [
    ORIENTATIONS["landscape-primary"],
    ORIENTATIONS["landscape-secondary"],
  ].includes(orientation);
};

const MenuButton = ({
  theme = buttonThemes.transparent,
  text,
  icon,
  $hasFill,
  $hasStroke,
  $isDisabled,
  to,
}: {
  theme?: ButtonTheme;
  text?: string;
  icon?: React.ReactNode;
  $hasFill?: boolean;
  $hasStroke?: boolean;
  $isDisabled?: boolean;
  to: valueof<typeof ROUTES>;
}) =>
  !$isDisabled ? (
    <Link to={to}>
      <Button
        theme={theme}
        text={text}
        icon={icon}
        $hasFill={$hasFill}
        $hasStroke={$hasStroke}
        $fontSize="20px"
      />
    </Link>
  ) : (
    <Button
      theme={theme}
      text={text}
      icon={icon}
      $hasFill={$hasFill}
      $hasStroke={$hasStroke}
      $fontSize="20px"
    />
  );

const Logo = () => {
  return (
    <TextBody $bold={true} $size="20px" $letterSpacing={4}>
      ALPHASHOP
    </TextBody>
  );
};

const Menu = ({ $active }: { $active: boolean }) => {
  const { t } = useTranslation();
  const totalProducts = useCart((cart) => cart.cartData.products.length);

  return (
    <StyledMenu $active={$active} role="menu">
      <StyledMenuItem role="menuitem">
        <MenuButton to={ROUTES.HOME} text={t("home", defaults.HOME) || ""} />
      </StyledMenuItem>
      <StyledMenuItem role="menuitem">
        <MenuButton
          to={ROUTES.SUSTAINABILITY}
          text={t("sustainability", defaults.SUSTAINABILITY) || ""}
        />
      </StyledMenuItem>
      <StyledMenuItem role="menuitem">
        <MenuButton
          to={ROUTES.FAVORITES}
          $hasFill
          icon={<HeartIcon fill={colors.BLACK} width={24} height={24} />}
          aria-label={t("favorites", defaults.FAVORITES) || ""}
          $isDisabled
        />
      </StyledMenuItem>
      <StyledMenuItem role="menuitem">
        <MenuButton
          to={ROUTES.CART}
          $hasFill
          icon={<BagIcon fill={colors.BLACK} width={24} height={24} />}
          aria-label={t("cart", defaults.CART) || ""}
          text={totalProducts ? totalProducts.toString() : ""}
        />
      </StyledMenuItem>
      <StyledMenuItem role="menuitem">
        <LanguageSelector />
      </StyledMenuItem>
    </StyledMenu>
  );
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const orientation = useScreenOrientation();
  const location = useLocation();

  useEffect(() => {
    if (!isLandscape(orientation)) {
      setOpen(false);
    }
  }, [location, orientation]);

  useLayoutEffect(() => {
    const shouldOpen = isLandscape(orientation) ? true : false;

    setOpen(shouldOpen);
  }, [orientation]);

  return (
    <StyledNav $active={open}>
      <Container
        $display="flex"
        $justifyContent="space-between"
        $alignItems="center"
        $maxWidth={INNER_CONTAINER_MAX_WIDTH}
        $mx="auto"
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
