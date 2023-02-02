import React, { useRef, useEffect } from "react";

import Container from "../../atoms/Container/Container";
import Image from "../../atoms/Image/Image";
import TextBody from "../../atoms/TextBody/TextBody";
import TextTitle from "../../atoms/TextTitle/TextTitle";
import Button from "../../atoms/Button/Button";

import { StyledTeaser } from "./Teaser.style";

type Props = {
  src: string;
  alt: string;
  slogan: string;
  description: string;
  buttonText: string;
  reverseOrder?: boolean;
};

const Teaser = ({
  src,
  alt,
  slogan,
  description,
  buttonText,
  reverseOrder = false,
}: Props) => {
  const imageContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const resizeImage = () => {
      if (imageContainerRef.current) {
        const width = imageContainerRef.current.getBoundingClientRect().width;
        imageContainerRef.current.style.height = `${(width * 4.2) / 3}px`;
      }
    };

    window.addEventListener("resize", resizeImage);

    return () => {
      window.removeEventListener("resize", resizeImage);
    };
  }, []);

  return (
    <StyledTeaser $reverse={reverseOrder}>
      <Container $flexBasis="33%" ref={imageContainerRef}>
        <Image $width="100%" $height="100%" src={src} alt={alt} />
      </Container>
      <Container
        $flexBasis="67%"
        $display="flex"
        $flexDirection="column"
        $gap="16px"
        $justifyContent="center"
        $alignItems="center"
      >
        <TextTitle $textAlign="center" as="h3" $lineHeight={110} $size="24px">
          {slogan}
        </TextTitle>
        <TextBody $textAlign="center" $lineHeight={150} $size="16px">
          {description}
        </TextBody>
        <Button text={buttonText} />
      </Container>
    </StyledTeaser>
  );
};

export default Teaser;
