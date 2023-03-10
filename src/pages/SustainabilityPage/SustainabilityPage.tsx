import React from "react";
import { useTranslation } from "react-i18next";

import Container from "../../components/atoms/Container/Container";
import ImageBanner from "../../components/organisms/ImageBanner/ImageBanner";
import Image from "../../components/atoms/Image/Image";
import TextBody from "../../components/atoms/TextBody/TextBody";
import TextTitle from "../../components/atoms/TextTitle/TextTitle";
import Teaser from "../../components/molecules/Teaser/Teaser";

import { INNER_CONTAINER_MAX_WIDTH } from "../../constants/layout";
import photos from "../../constants/assets";
import * as colors from "../../constants/colors";

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
          src={photos.dandelion}
          alt={t("heroAlt", { ns: ["sustainability"] })}
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
              src: photos.greenGlobe,
              alt: t("bannerFirstSlideAlt", { ns: ["sustainability"] }),
              title: t("bannerFirstSlideTitle", { ns: ["sustainability"] }),
              subtitle: t("bannerFirstSlideText", { ns: ["sustainability"] }),
              onClick: () => console.log("see more"),
            },
            {
              src: photos.ecoProducts,
              alt: t("bannerSecondSlideAlt", { ns: ["sustainability"] }),
              title: t("bannerSecondSlideTitle", { ns: ["sustainability"] }),
              subtitle: t("bannerSecondSlideText", { ns: ["sustainability"] }),
              onClick: () => console.log("see more"),
            },
            {
              src: photos.carbonFootprint,
              alt: t("bannerThirdSlideAlt", { ns: ["sustainability"] }),
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
          src={photos.metaverseModel}
          alt={t("teaserOneAlt", { ns: ["sustainability"] })}
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
          src={photos.drillWell}
          alt={t("teaserTwoAlt", { ns: ["sustainability"] })}
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
