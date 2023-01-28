import React from "react";
import { useTranslation } from "react-i18next";
import Container from "../../atoms/Container/Container";
import TextBody from "../../atoms/TextBody/TextBody";

import * as colors from "../../../constants/colors";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <Container as="footer" $p={32} $background={colors.BLACK}>
      <TextBody $color={colors.WHITE} $textAlign="center">
        {t("footer")}
      </TextBody>
    </Container>
  );
};

export default Footer;
