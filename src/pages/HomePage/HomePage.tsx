import React, { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Container from "../../components/atoms/Container/Container";
import ProductGrid from "../../components/organisms/ProductGrid/ProductGrid";
import ImageBanner from "../../components/organisms/ImageBanner/ImageBanner";

import { APIProducts } from "../../services/api";
import { joinRoute } from "../../utils/urlUtils";
import { ROUTES } from "../../constants/routes";
import { GetAllProductsResponse } from "../../constants/types";
import { INNER_CONTAINER_MAX_WIDTH } from "../../constants/layout";
import * as colors from "../../constants/colors";
import cryptoAccessories from "../../assets/photos/crypto-accessories.png";
import ecoSocks from "../../assets/photos/eco-socks.png";
import organicHoodies from "../../assets/photos/organic-hoodies.png";

const HomePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(["home"]);

  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
    refetchOnMount: true,
  });

  async function getAllProducts() {
    try {
      return (await APIProducts.getAllProducts(true)) as GetAllProductsResponse;
    } catch (e) {
      console.error(e);
    }
  }

  const goToProduct = useCallback(
    (slug: string) => {
      navigate(joinRoute(ROUTES.PRODUCT, slug));
    },
    [navigate]
  );

  return (
    <Container $width="100%">
      <Container as="section">
        <ImageBanner
          slides={[
            {
              src: ecoSocks,
              alt: t("bannerFirstSlideAlt", { ns: ["home"] }),
              title: t("bannerFirstSlideTitle", { ns: ["home"] }),
              subtitle: t("bannerFirstSlideText", { ns: ["home"] }),
              onClick: () => console.log("see more"),
            },
            {
              src: cryptoAccessories,
              alt: t("bannerSecondSlideAlt", { ns: ["home"] }),
              title: t("bannerSecondSlideTitle", { ns: ["home"] }),
              subtitle: t("bannerSecondSlideText", { ns: ["home"] }),
              onClick: () => console.log("see more"),
            },
            {
              src: organicHoodies,
              alt: t("bannerThirdSlideAlt", { ns: ["home"] }),
              title: t("bannerThirdSlideTitle", { ns: ["home"] }),
              subtitle: t("bannerThirdSlideText", { ns: ["home"] }),
              onClick: () => console.log("see more"),
            },
          ]}
          ctaButtonLabel={t("bannerCtaButtonText", { ns: ["home"] })}
        />
      </Container>

      <Container
        as="section"
        $p={32}
        $my={32}
        $mx="auto"
        $maxWidth={INNER_CONTAINER_MAX_WIDTH}
        $background={colors.WHITE}
      >
        <ProductGrid
          list={data || []}
          isLoading={isLoading || isFetching}
          onHeartClick={() => console.log("Implement on like")}
          onWidgetClick={goToProduct}
        />
      </Container>
    </Container>
  );
};

export default HomePage;
