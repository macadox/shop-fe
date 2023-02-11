import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useCart from "../../store/cart/cart";
import TextBody from "../../components/atoms/TextBody/TextBody";
import Button from "../../components/atoms/Button/Button";
import Container from "../../components/atoms/Container/Container";
import CartItem from "./CartItem/CartItem";
import Image from "../../components/atoms/Image/Image";
import { StyledCartPageWrapper } from "./CartPage.style";

import { ROUTES } from "../../constants/routes";
import photos from "../../constants/assets";
import * as colors from "../../constants/colors";

const EmptyCart = () => {
  const { t } = useTranslation();

  return (
    <Container $width="100%">
      <Container $maxWidth="360px" $mx="auto" $mt={-64}>
        <Image
          $height="100%"
          $width="100%"
          src={photos.cartEmpty}
          alt="no items in cart"
        />
      </Container>
      <Container
        $display="flex"
        $flexDirection="column"
        $alignItems="center"
        $gap="16px"
        $mt={-32}
        $px={8}
      >
        <TextBody $textAlign="center" $size="24px" $semiBold>
          {t("emptyCart")}
        </TextBody>
        <TextBody $textAlign="center">{t("emptyCartSubtitle")}</TextBody>
        <Link to={ROUTES.HOME}>
          <Button text={t("emptyCartButton") || ""} />
        </Link>
      </Container>
    </Container>
  );
};

const CartPage = () => {
  const { t } = useTranslation();
  const cartData = useCart((cart) => cart.cartData);

  return (
    <StyledCartPageWrapper>
      <Container $width="100%" $flexBasis="67%" $background={colors.WHITE}>
        <div className="cart-items-wrapper">
          {cartData.products.length > 0 ? (
            <Container
              $background={colors.LIGHTER}
              $display="flex"
              $flexDirection="column"
              $gap="2px"
            >
              {cartData.products.map((product) => (
                <CartItem key={product.uniqueId} {...product} />
              ))}
            </Container>
          ) : (
            <EmptyCart />
          )}
        </div>
      </Container>
      <Container $width="100%" $flexBasis="33%" $background={colors.LIGHTER}>
        <div className="cart-summary-wrapper">
          <Container $display="flex" $gap={16}>
            <TextBody>{t("cartSubtotal")}:</TextBody>
            <TextBody>${cartData.totals.subtotal}</TextBody>
          </Container>
          <Container $display="flex" $gap={16} $mt={8}>
            <TextBody>{t("cartShipping")}:</TextBody>
            <TextBody>${cartData.totals.shipping}</TextBody>
          </Container>
          <Container $display="flex" $gap={16} $mt={16} $alignItems="flex-end">
            <TextBody $size="16px">{t("cartTotal")}:</TextBody>
            <TextBody $size="18px" $bold>
              ${cartData.totals.total}
            </TextBody>
          </Container>
        </div>
      </Container>
    </StyledCartPageWrapper>
  );
};

export default CartPage;
