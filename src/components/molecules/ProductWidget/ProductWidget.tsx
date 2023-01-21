import React, { useMemo } from "react";
import PropTypes from "prop-types";
import Container from "../../atoms/Container/Container";
import TextBody from "../../atoms/TextBody/TextBody";
import TextTitle from "../../atoms/TextTitle/TextTitle";
import { StyledProductWidget, LikeButton } from "./ProductWidget.style";

import { ReactComponent as HeartEmpty } from "../../../assets/icons/heart.svg";
import { ReactComponent as HeartFull } from "../../../assets/icons/heart-full.svg";
import { PRODUCT_WIDGET_SIZE } from "../../../constants/layout";
import * as colors from "../../../constants/colors";

type Props = {
  id: number | string;
  name: string;
  price: number;
  favorited: boolean;
  src: string;
  onWidgetClick: () => void;
  onHeartClick: () => void;
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
  const HeartIcon = useMemo(() => {
    const label = `${favorited ? "unlike" : "like"} ${name}`;
    const Icon = () => {
      return favorited ? (
        <HeartFull aria-label={label} width="33.3%" />
      ) : (
        <HeartEmpty aria-label={label} width="33.3%" fill={colors.BLACK} />
      );
    };
    return Icon;
  }, [favorited, name]);

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onHeartClick();
  };

  return (
    <StyledProductWidget tabIndex={0} onClick={onWidgetClick}>
      <img
        src={src}
        width={PRODUCT_WIDGET_SIZE}
        height={PRODUCT_WIDGET_SIZE}
        alt={name}
      />
      <LikeButton onClick={handleHeartClick}>
        <HeartIcon />
      </LikeButton>
      <Container pt={16} display="flex" flexDirection="column" gap="4px">
        <TextBody size="18px">{price}zł</TextBody>
        <TextTitle as="h3" size="16px" uppercase bold>
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
