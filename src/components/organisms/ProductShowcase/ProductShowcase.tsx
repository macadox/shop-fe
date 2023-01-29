import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import Container from "../../atoms/Container/Container";
import TextTitle from "../../atoms/TextTitle/TextTitle";
import TextBody from "../../atoms/TextBody/TextBody";
import Button from "../../atoms/Button/Button";
import SingleSelectDropdown from "../../molecules/SingleSelectDropdown/SingleSelectDropdown";
import ProductImageViewer from "../../molecules/ProductImageViewer/ProductImageViewer";
import FormField from "../../molecules/FormField/FormField";
import { ProductShowcaseContainer } from "./ProductShowcase.style";

type Props = {
  name: string;
  images: string[];
  price: number;
  colors?: string[];
  sizes?: string[];
  onAddToCart: () => void;
};

const ProductShowcase = ({
  name,
  images,
  price,
  colors,
  sizes,
  onAddToCart,
}: Props) => {
  const { t } = useTranslation(["product", "translation"]);

  const colorOpts = useMemo(
    () =>
      colors?.map((color, index) => ({
        id: `${color}_${index}`,
        value: color,
      })),
    [colors]
  );

  const sizeOpts = useMemo(
    () =>
      sizes?.map((size, index) => ({ id: `${size}_${index}`, value: size })),
    [sizes]
  );

  return (
    <ProductShowcaseContainer>
      <div className="showcase-wrapper">
        <ProductImageViewer
          images={images.map((image) => ({ src: image, alt: name }))}
        />
        <Container className="showcase-content">
          <Container $width="100%" $mt={8}>
            <TextTitle $size="18px" $uppercase $letterSpacing="3px" as="h2">
              {name}
            </TextTitle>
          </Container>
          <Container $width="100%" $mb={8}>
            <TextBody $size="24px" $bold $letterSpacing={3}>
              ${price}
            </TextBody>
          </Container>

          {colorOpts && (
            <FormField
              label={t("colors")}
              dropdownId="product-color"
              Component={() => (
                <SingleSelectDropdown
                  options={colorOpts}
                  defaultPlaceholder="color"
                  dropdownId="product-color"
                  initialSelectedId={colorOpts?.[0]?.id || ""}
                  handleSelectCallback={() => console.log("selecting color")}
                />
              )}
            />
          )}
          {sizeOpts && (
            <FormField
              label={t("sizes")}
              dropdownId="product-size"
              Component={() => (
                <SingleSelectDropdown
                  options={sizeOpts}
                  defaultPlaceholder="size"
                  dropdownId="product-size"
                  initialSelectedId={sizeOpts?.[0]?.id || ""}
                  handleSelectCallback={() => console.log("selecting size")}
                />
              )}
            />
          )}

          <Button
            $paddingTop="18px"
            $paddingBottom="18px"
            $fontSize="16px"
            text={t("addToCartButton", "", { ns: ["translation"] }) || ""}
            $semiBold
            onClick={onAddToCart}
          />
        </Container>
      </div>
    </ProductShowcaseContainer>
  );
};

export default ProductShowcase;
