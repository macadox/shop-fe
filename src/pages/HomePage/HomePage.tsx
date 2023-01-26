import React, { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import TextBody from "../../components/atoms/TextBody/TextBody";
import Container from "../../components/atoms/Container/Container";
import ProductGrid from "../../components/organisms/ProductGrid/ProductGrid";
import Banner from "../../components/organisms/Banner/Banner";

import { APIProducts } from "../../services/api";
import { joinRoute } from "../../utils/urlUtils";
import { ROUTES } from "../../constants/routes";
import { GetAllProductsResponse } from "../../constants/types";
import { INNER_CONTAINER_MAX_WIDTH } from "../../constants/layout";
import * as colors from "../../constants/colors";

const HomePage = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(["home"]);

  const onClickLanguageChange = (e: any) => {
    const language = e.target.value;
    i18n.changeLanguage(language);
  };

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
        <Banner
          slides={[
            {
              src: "https://picsum.photos/900/600",
              alt: t("bannerSlideTitle1", { ns: ["home"] }),
              title: t("bannerSlideTitle1", { ns: ["home"] }),
              subtitle: t("bannerSlideText1", { ns: ["home"] }),
              onClick: () => console.log("see more"),
            },
            {
              src: "https://picsum.photos/900/601",
              alt: t("bannerSlideTitle2", { ns: ["home"] }),
              title: t("bannerSlideTitle2", { ns: ["home"] }),
              subtitle: t("bannerSlideText2", { ns: ["home"] }),
              onClick: () => console.log("see more"),
            },
            {
              src: "https://picsum.photos/900/602",
              alt: t("bannerSlideTitle3", { ns: ["home"] }),
              title: t("bannerSlideTitle3", { ns: ["home"] }),
              subtitle: t("bannerSlideText3", { ns: ["home"] }),
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
        <select onChange={onClickLanguageChange}>
          <option value="en">English</option>
          <option value="de">German</option>
          <option value="pl">Polish</option>
        </select>

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
