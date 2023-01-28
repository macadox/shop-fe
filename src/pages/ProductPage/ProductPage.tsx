import React, { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Container from "../../components/atoms/Container/Container";
import TextBody from "../../components/atoms/TextBody/TextBody";
import TextTitle from "../../components/atoms/TextTitle/TextTitle";
import ProductGrid from "../../components/organisms/ProductGrid/ProductGrid";
import ProductShowcase from "../../components/organisms/ProductShowcase/ProductShowcase";

import type {
  GetAllProductsResponse,
  ProductIdType,
} from "../../constants/types";
import { APIProducts } from "../../services/api";
import { PRODUCT_SUBROUTES, ROUTES } from "../../constants/routes";
import { INNER_CONTAINER_MAX_WIDTH } from "../../constants/layout";
import { joinRoute } from "../../utils/urlUtils";
import * as colors from "../../constants/colors";

const ProductSectionTitle = ({ text }: { text: string }) => (
  <TextTitle as="h3" $size="16px" $uppercase $letterSpacing="2px" $semiBold>
    {text}
  </TextTitle>
);

function addToCart(id: ProductIdType) {
  console.log("adding to cart", id);
}

type GetProductResponse = {
  id: ProductIdType;
  name: string;
  price: number;
  images: string[];
  category: string;
  colors?: string[];
  sizes?: string[];
  description: string;
  materialDescription: string;
  suggestions: GetAllProductsResponse;
};

const ProductPage = () => {
  const navigate = useNavigate();
  const { [PRODUCT_SUBROUTES.slug]: slug } = useParams();
  const { isLoading, error, data } = useQuery(["product", slug], getProduct);
  const { t } = useTranslation("product");

  async function getProduct({
    queryKey,
  }: {
    queryKey: (string | undefined)[];
  }) {
    const [_, slug] = queryKey;
    if (slug) {
      try {
        return (await APIProducts.getProduct(slug, true)) as GetProductResponse;
      } catch (e) {
        console.error(e);
      }
    }
  }

  const goToProduct = useCallback(
    (slug: string) => {
      navigate(joinRoute(ROUTES.PRODUCT, slug));
    },
    [navigate]
  );

  return (
    <Container $display="flex" $flexDirection="column" $flexGrow={1}>
      <Container $width="100%" $background={colors.LIGHTER} $p={32}>
        <Container $maxWidth={INNER_CONTAINER_MAX_WIDTH} $mx="auto">
          {data && (
            <ProductShowcase
              images={data.images}
              name={data.name}
              price={data.price}
              colors={data.colors || []}
              sizes={data.sizes || []}
              onAddToCart={() => addToCart(data.id)}
            />
          )}
        </Container>
      </Container>

      <Container $p={80} $px={32} $background={colors.WHITE} $flexGrow={1}>
        <Container
          $display="flex"
          $flexDirection="column"
          $gap="48px"
          $maxWidth={INNER_CONTAINER_MAX_WIDTH}
          $mx="auto"
        >
          {/* SECTION: Product Description */}
          <Container $display="flex" $flexDirection="column" $gap="16px">
            <ProductSectionTitle text={t("description") || ""} />
            <TextBody $lineHeight={170} $size="14px">
              {data?.description}
            </TextBody>
          </Container>
          {/* SECTION: MATERIAL */}
          <Container $display="flex" $flexDirection="column" $gap="16px">
            <ProductSectionTitle text={t("materialDescription") || ""} />
            <TextBody $lineHeight={170} $size="14px">
              {data?.materialDescription}
            </TextBody>
          </Container>
        </Container>
        {/* SECTION: You may also like */}
        <Container
          $width="100%"
          $mt={48}
          $mx="auto"
          $maxWidth={INNER_CONTAINER_MAX_WIDTH}
          $display="flex"
          $flexDirection="column"
          $gap="16px"
        >
          <TextTitle as="h3" $size="20px" $uppercase $bold $letterSpacing="3px">
            {t("suggestions")}
          </TextTitle>
          <ProductGrid
            list={data?.suggestions || []}
            isLoading={isLoading}
            onHeartClick={() => console.log("Implement on like")}
            onWidgetClick={goToProduct}
            hasFilter={false}
            hasPagination={false}
          />
        </Container>
      </Container>
    </Container>
  );
};

export default ProductPage;
