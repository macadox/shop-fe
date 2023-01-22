import React, { useMemo, useCallback, useState } from "react";
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
  onWidgetClick: (id: ProductIdType) => void;
  onHeartClick: (id: ProductIdType, favorited: boolean) => void;
};

const ProductWidget = ({
  id,
  name,
  price,
  favorited = false,
  src,
  onWidgetClick,
  onHeartClick,
}: Props) => {
  const [isFavorited, setIsFavorited] = useState(favorited);

  const HeartIcon = useMemo(() => {
    const label = `${isFavorited ? "unlike" : "like"} ${name}`;
    const Icon = () => {
      return isFavorited ? (
        <HeartFull aria-label={label} width="33.3%" />
      ) : (
        <HeartEmpty aria-label={label} width="33.3%" fill={colors.BLACK} />
      );
    };

    return Icon;
  }, [isFavorited, name]);

  const handleHeartClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      const nextFavoritedValue = !isFavorited;

      setIsFavorited(nextFavoritedValue);
      onHeartClick(id, nextFavoritedValue);
    },
    [id, isFavorited, onHeartClick]
  );

  return (
    <StyledProductWidget
      data-testid="product-widget-container"
      tabIndex={0}
      onClick={() => onWidgetClick(id)}
    >
      <Image
        $width={PRODUCT_WIDGET_PHOTO_SIZE}
        $height={PRODUCT_WIDGET_PHOTO_SIZE}
        alt={name}
        src={src}
        spinnerSize="m"
      />
      <LikeButton onClick={handleHeartClick}>
        <HeartIcon />
      </LikeButton>
      <Container $pt={16} $display="flex" $flexDirection="column" $gap="4px">
        <TextBody $size="18px">{price}zł</TextBody>
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
