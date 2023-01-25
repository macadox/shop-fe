import React from "react";
import Container from "../../atoms/Container/Container";
import TextBody from "../../atoms/TextBody/TextBody";

import * as colors from "../../../constants/colors";

type Props = {
  dropdownId: string;
  label: string;
  Component: React.FC;
};

const FormField = ({ dropdownId, label, Component }: Props) => {
  return (
    <Container $width="100%" $display="flex" $flexDirection="column" $gap={8}>
      <TextBody as="label" id={`${dropdownId}--label`}>
        {label}
      </TextBody>
      <Container $background={colors.WHITE}>
        <Component />
      </Container>
    </Container>
  );
};

export default FormField;
