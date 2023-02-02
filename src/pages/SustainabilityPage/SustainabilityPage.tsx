import React from "react";
import { useTranslation } from "react-i18next";

import Container from "../../components/atoms/Container/Container";
import ImageBanner from "../../components/organisms/ImageBanner/ImageBanner";
import Image from "../../components/atoms/Image/Image";
import TextBody from "../../components/atoms/TextBody/TextBody";
import TextTitle from "../../components/atoms/TextTitle/TextTitle";
import Teaser from "../../components/molecules/Teaser/Teaser";

import { INNER_CONTAINER_MAX_WIDTH } from "../../constants/layout";
import * as colors from "../../constants/colors";
import dandelion from "../../assets/photos/dandelion-sky.png";
import ecoProducts from "../../assets/photos/eco-products.png";
import greenGlobe from "../../assets/photos/green-globe.png";
import carbonFootprint from "../../assets/photos/carbon-footpring.png";
import metaverseModel from "../../assets/photos/metaverse-model.png";
import drillWell from "../../assets/photos/drill-well.png";

const Banner = ({
  color,
  title,
  subtitle,
  textColor,
}: {
  color: string;
  title: string;
  subtitle: string;
  textColor: string;
}) => {
  return (
    <Container
      as="section"
      $p={32}
      $my={32}
      $mx="auto"
      $maxWidth={INNER_CONTAINER_MAX_WIDTH}
      $background={color}
      $display="flex"
      $flexDirection="column"
      $gap={16}
      $alignItems="center"
    >
      <TextTitle
        $size="24px"
        as="h3"
        $color={textColor}
        $textAlign="center"
        $lineHeight={110}
        $semiBold
      >
        {title}
      </TextTitle>
      <TextBody
        $lineHeight={150}
        $size="16px"
        $color={textColor}
        $textAlign="center"
      >
        {subtitle}
      </TextBody>
    </Container>
  );
};

const SustainabilityPage = () => {
  const { t } = useTranslation(["sustainability"]);

  return (
    <Container $width="100%">
      <Container
        as="section"
        $width="100%"
        $height="calc(100vh - 104px)"
        $background={colors.LIGHTER}
        $position="relative"
      >
        <Image
          $width="100%"
          $height="100%"
          src={dandelion}
          alt="Hand holding dandelion: Image generated with DALL-E"
        />
        <Container
          $position="absolute"
          $top="0"
          $left="0"
          $right="0"
          $bottom="0"
          $background={colors.SHADOW}
          $display="flex"
          $justifyContent="center"
          $alignItems="center"
        >
          <TextTitle
            as="h2"
            $letterSpacing="4px"
            $color={colors.WHITE}
            $size="32px"
            $textAlign="center"
            $bold
            $lineHeight={110}
          >
            {t("pageTitle", { ns: ["sustainability"] })}
          </TextTitle>
        </Container>
        <Container $position="absolute" $top="0" $left="0"></Container>
      </Container>
      <Container
        as="section"
        $p={32}
        $my={32}
        $mx="auto"
        $maxWidth={INNER_CONTAINER_MAX_WIDTH}
        $background={colors.WHITE}
      >
        <ImageBanner
          slides={[
            {
              src: greenGlobe,
              alt: t("bannerFirstSlideTitle", { ns: ["sustainability"] }),
              title: t("bannerFirstSlideTitle", { ns: ["sustainability"] }),
              subtitle: t("bannerFirstSlideText", { ns: ["sustainability"] }),
              onClick: () => console.log("see more"),
            },
            {
              src: ecoProducts,
              alt: t("bannerSecondSlideTitle", { ns: ["sustainability"] }),
              title: t("bannerSecondSlideTitle", { ns: ["sustainability"] }),
              subtitle: t("bannerSecondSlideText", { ns: ["sustainability"] }),
              onClick: () => console.log("see more"),
            },
            {
              src: carbonFootprint,
              alt: t("bannerThirdSlideTitle", { ns: ["sustainability"] }),
              title: t("bannerThirdSlideTitle", { ns: ["sustainability"] }),
              subtitle: t("bannerThirdSlideText", { ns: ["sustainability"] }),
              onClick: () => console.log("see more"),
            },
          ]}
          ctaButtonLabel={t("bannerCtaButtonText", { ns: ["sustainability"] })}
        />
      </Container>
      {/* Place for banner */}
      <Banner
        title={t("factOneTitle", { ns: ["sustainability"] })}
        subtitle={t("factOneDescription", { ns: ["sustainability"] })}
        color={colors.PASTEL_BROWN}
        textColor={colors.BLACK}
      />
      {/* Place for Teaser */}
      <Container
        as="section"
        $p={32}
        $my={32}
        $mx="auto"
        $maxWidth={INNER_CONTAINER_MAX_WIDTH}
        $background={colors.WHITE}
      >
        <Teaser
          src={metaverseModel}
          alt="photo"
          description={t("teaserOneDescription", { ns: ["sustainability"] })}
          slogan={t("teaserOneTitle", { ns: ["sustainability"] })}
          buttonText={t("bannerCtaButtonText", { ns: ["sustainability"] })}
        />
      </Container>
      {/* Place for Banner */}
      <Banner
        title={t("factTwoTitle", { ns: ["sustainability"] })}
        subtitle={t("factTwoDescription", { ns: ["sustainability"] })}
        color={colors.DARK}
        textColor={colors.WHITE}
      />
      {/* Place for Teaser */}
      <Container
        as="section"
        $p={32}
        $my={32}
        $mx="auto"
        $maxWidth={INNER_CONTAINER_MAX_WIDTH}
        $background={colors.WHITE}
      >
        <Teaser
          src={drillWell}
          alt="photo"
          description={t("teaserTwoDescription", { ns: ["sustainability"] })}
          slogan={t("teaserTwoTitle", { ns: ["sustainability"] })}
          buttonText={t("bannerCtaButtonText", { ns: ["sustainability"] })}
          reverseOrder
        />
      </Container>
      {/* Place for Banner */}
      <Banner
        title={t("factThreeTitle", { ns: ["sustainability"] })}
        subtitle={t("factThreeDescription", { ns: ["sustainability"] })}
        color={colors.LIGHT}
        textColor={colors.BLACK}
      />
    </Container>
  );
};

export default SustainabilityPage;
