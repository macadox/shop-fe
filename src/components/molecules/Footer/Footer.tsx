import React from "react";
import Container from "../../atoms/Container/Container";
import TextBody from "../../atoms/TextBody/TextBody";

import * as colors from "../../../constants/colors";

const Footer = () => {
  return (
    <Container as="footer" $p={32} $background={colors.BLACK}>
      <TextBody $color={colors.WHITE} $textAlign="center">
        Alphashop, 2023 &#169; ALL RIGHTS RESERVED
      </TextBody>
    </Container>
  );
};

export default Footer;
