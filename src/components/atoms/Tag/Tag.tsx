import React from "react";
import Container from "../../atoms/Container/Container";
import TextBody from "../TextBody/TextBody";
import Button, { buttonThemes } from "../../atoms/Button/Button";
import { ReactComponent as CrossIcon } from "../../../assets/icons/cross.svg";
import * as colors from "../../../constants/colors";

type Props = {
  content: React.ReactNode;
  onClear?: () => void;
};

const Tag = ({ content, onClear }: Props) => {
  return (
    <Container
      $display="inline-flex"
      $alignItems="center"
      $gap="8px"
      $background={colors.LIGHT}
      $p={8}
      $boxShadow={`0px 0px 8px 0px ${colors.SHADOW}`}
      $height="36px"
    >
      <TextBody $size="12px" $color={colors.BLACK}>
        {content}
      </TextBody>
      {onClear && (
        <Container>
          <Button
            icon={
              <CrossIcon
                style={{ marginBottom: "1px" }}
                width="8px"
                height="8px"
                fill={colors.GRAY}
              />
            }
            onClick={onClear}
            $hasFill={true}
            theme={buttonThemes.transparent}
          />
        </Container>
      )}
    </Container>
  );
};

export default Tag;
