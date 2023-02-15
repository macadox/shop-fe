import React from "react";
import Container from "../../atoms/Container/Container";
import TextBody from "../../atoms/TextBody/TextBody";

import * as colors from "../../../constants/colors";

type Props = {
  dropdownId: string;
  label: string;
  Component: React.FC;
  errors?: string[];
};

const FormField = ({ dropdownId, label, Component, errors = [] }: Props) => {
  return (
    <Container $width="100%" $display="flex" $flexDirection="column" $gap={8}>
      <TextBody as="label" id={`${dropdownId}--label`}>
        {label}
      </TextBody>
      <Container $background={colors.WHITE}>
        <Component />
      </Container>
      {errors.length > 0 && (
        <TextBody $size="14px" $color={colors.RED}>
          {errors[0]}
        </TextBody>
      )}
    </Container>
  );
};

export default FormField;
