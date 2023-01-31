import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import Container from "../../../components/atoms/Container/Container";
import TextBody from "../../../components/atoms/TextBody/TextBody";
import TextTitle from "../../../components/atoms/TextTitle/TextTitle";
import Image from "../../../components/atoms/Image/Image";
import Button, { buttonThemes } from "../../../components/atoms/Button/Button";
import Counter from "../../../components/atoms/Counter/Counter";
import { StyledCartItemWrapper } from "./CartItem.style";

import useCart from "../../../store/cart/cart";
import { ReactComponent as TrashcanIcon } from "../../../assets/icons/trashcan.svg";
import * as colors from "../../../constants/colors";

type Props = {
  id: string;
  src: string;
  name: string;
  price: number;
  quantity: number;
  slug: string;
  color?: string;
  size?: string;
};

const CartItem = ({
  id,
  src,
  name,
  price,
  quantity,
  color,
  size,
  slug,
}: Props) => {
  const {
    addProduct,
    removeProduct,
    updateQuantity,
    updateShipping,
    clearCart,
  } = useCart();
  const { t } = useTranslation("product");

  const onTrashcanClick = useCallback(
    () => removeProduct(id),
    [id, removeProduct]
  );

  const onCounterPlusClick = useCallback(
    () => updateQuantity(id, quantity + 1),
    [id, quantity, updateQuantity]
  );

  const onCounterMinusClick = useCallback(
    () => updateQuantity(id, quantity - 1),
    [id, quantity, updateQuantity]
  );

  const onCartItemClick = useCallback(() => {
    console.log("redirect to, ", slug);
  }, [slug]);

  return (
    <StyledCartItemWrapper>
      <Container $background={colors.WHITE} $display="flex">
        <Container className="cart-item-image">
          <Image src={src} alt={name} $height="100%" $width="100%" />
        </Container>

        <div className="cart-item-main">
          <TextTitle as="h3" $bold $size="16px" $uppercase>
            {quantity} x {name}
          </TextTitle>
          <TextBody $size="14px">
            {t("size", { count: 1 })}: {size}
          </TextBody>
          <TextBody $size="14px">
            {t("color", { count: 1 })}: {color}
          </TextBody>

          <Container $mt="auto">
            <Counter
              value={quantity}
              onIncrement={onCounterPlusClick}
              onDecrement={onCounterMinusClick}
            />
          </Container>
        </div>
        <div className="cart-item-secondary">
          <Button
            $hasFill
            theme={buttonThemes.transparent}
            icon={<TrashcanIcon width={24} height={24} fill={colors.BLACK} />}
            onClick={onTrashcanClick}
          />
          <TextBody $bold $size="16px">
            ${price * quantity}
          </TextBody>
        </div>
      </Container>
    </StyledCartItemWrapper>
  );
};

export default CartItem;
