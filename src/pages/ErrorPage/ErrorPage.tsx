import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Container from "../../components/atoms/Container/Container";
import TextTitle from "../../components/atoms/TextTitle/TextTitle";
import TextBody from "../../components/atoms/TextBody/TextBody";
import Button from "../../components/atoms/Button/Button";
import Image from "../../components/atoms/Image/Image";

import notFound from "../../assets/photos/not-found.svg";
import { ROUTES } from "../../constants/routes";

const ErrorPage = () => {
  const { t } = useTranslation();

  return (
    <Container $width="100%">
      <Container $maxWidth="500px" $mx="auto">
        <Image
          $height="100%"
          $width="100%"
          src={notFound}
          alt="portal to another dimension"
        />
      </Container>
      <Container
        $display="flex"
        $flexDirection="column"
        $alignItems="center"
        $gap="16px"
        $p={32}
      >
        <TextTitle as="h2" $textAlign="center" $size="24px" $semiBold>
          {t("pageNotFound")}
        </TextTitle>
        <TextBody $textAlign="center">{t("pageNotFoundSubtitle")}</TextBody>
        <Link to={ROUTES.HOME}>
          <Button text={t("pageNotFoundButton") || ""} />
        </Link>
      </Container>
    </Container>
  );
};

export default ErrorPage;
