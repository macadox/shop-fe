import React, { useState } from "react";
import PropTypes from "prop-types";
import Container from "../../atoms/Container/Container";
import TextBody from "../../atoms/TextBody/TextBody";
import TextTitle from "../../atoms/TextTitle/TextTitle";
import Image from "../../atoms/Image/Image";
import { StyledProductWidget, LikeButton } from "./ProductWidget.style";

import { ReactComponent as HeartEmpty } from "../../../assets/icons/heart.svg";
import { ReactComponent as HeartFull } from "../../../assets/icons/heart-full.svg";
import { PRODUCT_WIDGET_PHOTO_SIZE } from "../../../constants/layout";
import { ProductWidgetType, ProductIdType } from "../../../constants/types";
import * as colors from "../../../constants/colors";

type Props = ProductWidgetType & {
  onWidgetClick: (slug: string) => void;
  onHeartClick: (id: ProductIdType, favorited: boolean) => void;
};

const HeartIcon = ({
  isFavorited,
  name,
}: {
  isFavorited: boolean;
  name: string;
}) => {
  const label = `${isFavorited ? "unlike" : "like"} ${name}`;
  const Icon = () => {
    return isFavorited ? (
      <HeartFull aria-label={label} width="33.3%" />
    ) : (
      <HeartEmpty aria-label={label} width="33.3%" fill={colors.BLACK} />
    );
  };

  return <Icon />;
};

const ProductWidget = ({
  id,
  slug,
  name,
  price,
  favorited = false,
  src,
  onWidgetClick,
  onHeartClick,
}: Props) => {
  const [isFavorited, setIsFavorited] = useState(favorited);

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextFavoritedValue = !isFavorited;

    setIsFavorited(nextFavoritedValue);
    onHeartClick(id, nextFavoritedValue);
  };

  const handleWidgetClick = () => {
    onWidgetClick(slug);
  };

  return (
    <StyledProductWidget
      data-testid="product-widget-container"
      tabIndex={0}
      onClick={handleWidgetClick}
    >
      <Image
        $width={PRODUCT_WIDGET_PHOTO_SIZE}
        $height={PRODUCT_WIDGET_PHOTO_SIZE}
        alt={name}
        src={src}
        spinnerSize="m"
      />
      <LikeButton onClick={handleHeartClick}>
        <HeartIcon isFavorited={isFavorited} name={name} />
      </LikeButton>
      <Container $p={8} $display="flex" $flexDirection="column" $gap="4px">
        <TextBody $size="18px">${price}</TextBody>
        <TextTitle as="h3" $size="16px" $uppercase $bold>
          {name}
        </TextTitle>
      </Container>
    </StyledProductWidget>
  );
};

ProductWidget.propTypes = {
  name: PropTypes.string,
  price: PropTypes.number,
  favorited: PropTypes.bool,
  src: PropTypes.string,
  onWidgetClick: PropTypes.func,
  onHeartClick: PropTypes.func,
};

export default ProductWidget;
