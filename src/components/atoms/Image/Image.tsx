import React, { useState } from "react";
import Container from "../Container/Container";
import Spinner from "../Spinner/Spinner";
import { StyledImage } from "./Image.style";
import type { Props as ContainerProps } from "../Container/Container";
import type { Size } from "../Spinner/Spinner";
import { valueof } from "../../../utils/typeUtils";

type Props = {
  src: string;
  alt: string;
  $width: valueof<Pick<ContainerProps, "$width">>;
  $height: valueof<Pick<ContainerProps, "$height">>;
  spinnerSize?: Size;
};

const Image = ({ src, alt, $width, $height, spinnerSize = "m" }: Props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const handleImageLoad = () => setIsLoaded(true);

  return (
    <Container $width={$width} $height={$height} $position="relative">
      {!isLoaded ? (
        <Container
          $position="absolute"
          $top="50%"
          $left="50%"
          $transform="translate(-50%, -50%)"
        >
          <Spinner size={spinnerSize} />
        </Container>
      ) : null}
      <StyledImage
        src={src}
        alt={alt}
        $isLoaded={isLoaded}
        onLoad={handleImageLoad}
      />
    </Container>
  );
};

export default Image;
