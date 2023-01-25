import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from "react";
import Container from "../../atoms/Container/Container";
import Button, { buttonThemes } from "../../atoms/Button/Button";
import Image from "../../atoms/Image/Image";
import { SelectImageButton } from "./ProductImageViewer.style";

import { ReactComponent as ArrowLeft } from "../../../assets/icons/arrow-left.svg";
import { ReactComponent as ArrowRight } from "../../../assets/icons/arrow-right.svg";
import * as colors from "../../../constants/colors";

type ImageType = { src: string; alt: string };

type Props = {
  images: ImageType[];
};

const ProductImageViewer = ({ images }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);

  const gotoPrevImage = useCallback(
    () => currentIndex !== 0 && setCurrentIndex(currentIndex - 1),
    [currentIndex]
  );
  const gotoNextImage = useCallback(
    () =>
      currentIndex !== images.length - 1 && setCurrentIndex(currentIndex + 1),
    [currentIndex, images.length]
  );

  const currentImage = useMemo<ImageType | undefined>(
    () => images?.[currentIndex],
    [currentIndex, images]
  );

  useEffect(() => {
    const resizeImage = () => {
      if (imageContainerRef.current) {
        const width = imageContainerRef.current.getBoundingClientRect().width;
        imageContainerRef.current.style.height = `${width}px`;
      }
    };
    resizeImage();

    window.addEventListener("resize", resizeImage);

    return () => {
      window.removeEventListener("resize", resizeImage);
    };
  }, []);

  return !currentImage ? null : (
    <Container $display="flex" $flexDirection="column" $gap="16px">
      <Container $flexGrow={1} $position="relative" ref={imageContainerRef}>
        <Image
          src={currentImage.src}
          alt={currentImage.alt}
          $width="100%"
          $height="100%"
        />
        {images.length > 1 && (
          <Container
            $position="absolute"
            $top="50%"
            $left="0"
            $right="0"
            $transform="translateY(-50%)"
            $display="flex"
            $justifyContent="space-between"
          >
            <Button
              icon={
                <ArrowLeft
                  fill={colors.BLACK}
                  width={15}
                  aria-label="go to previous image"
                />
              }
              theme={buttonThemes.inverseDefault}
              $hasFill={true}
              onClick={gotoPrevImage}
            />
            <Button
              icon={
                <ArrowRight
                  fill={colors.BLACK}
                  width={15}
                  aria-label="go to next image"
                />
              }
              theme={buttonThemes.inverseDefault}
              $hasFill={true}
              onClick={gotoNextImage}
            />
          </Container>
        )}
      </Container>
      <Container
        $display="flex"
        $alignItems="center"
        $justifyContent="center"
        $gap="8px"
      >
        {images.length > 1 &&
          images.map((_, index) => (
            <SelectImageButton
              key={index}
              onClick={() => setCurrentIndex(index)}
              $isActive={currentIndex === index}
              aria-label={`go to image ${index + 1}`}
            />
          ))}
      </Container>
    </Container>
  );
};

export default ProductImageViewer;
