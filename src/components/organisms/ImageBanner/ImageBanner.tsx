import React, {
  useMemo,
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
} from "react";
import Container from "../../atoms/Container/Container";
import TextBody from "../../atoms/TextBody/TextBody";
import TextTitle from "../../atoms/TextTitle/TextTitle";
import Image from "../../atoms/Image/Image";
import Button, { buttonThemes } from "../../atoms/Button/Button";
import { StyledBanner } from "./ImageBanner.style";

import { ReactComponent as ArrowLeft } from "../../../assets/icons/arrow-left.svg";
import { ReactComponent as ArrowRight } from "../../../assets/icons/arrow-right.svg";
import * as colors from "../../../constants/colors";

type Slide = {
  src: string;
  alt: string;
  title: string;
  subtitle: string;
  onClick: () => void;
};

type Props = {
  slides: Slide[];
  slideTimeout?: number;
  debounceTimeout?: number;
  ctaButtonLabel: string;
};

const ImageBanner = ({
  slides,
  slideTimeout = 5000,
  debounceTimeout = 800,
  ctaButtonLabel = "SEE MORE",
}: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDebounced, setIsDebounced] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);

  const prevIndex = useMemo(
    () => (currentIndex === 0 ? slides.length - 1 : currentIndex - 1),
    [currentIndex, slides.length]
  );

  const nextIndex = useMemo(
    () => (currentIndex + 1 === slides.length ? 0 : currentIndex + 1),
    [currentIndex, slides.length]
  );

  useEffect(() => {
    const resizeImage = () => {
      if (imageContainerRef.current) {
        const width = imageContainerRef.current.getBoundingClientRect().width;
        imageContainerRef.current.style.height = `${(width * 3) / 4.2}px`;
      }
    };

    window.addEventListener("resize", resizeImage);

    return () => {
      window.removeEventListener("resize", resizeImage);
    };
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCurrentIndex(nextIndex);
    }, slideTimeout);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [nextIndex, slideTimeout]);

  useLayoutEffect(() => {
    setIsDebounced(true);
    const timeoutId = setTimeout(() => setIsDebounced(false), debounceTimeout);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [currentIndex, debounceTimeout]);

  const currentSlide = useMemo<Slide | undefined>(
    () => slides?.[currentIndex],
    [currentIndex, slides]
  );

  return !currentSlide ? null : (
    <StyledBanner>
      <div className="banner-wrapper">
        <div className="banner-image" ref={imageContainerRef}>
          <Image
            src={currentSlide.src}
            alt={currentSlide.alt}
            $width="100%"
            $height="100%"
          />
        </div>
        <div className="banner-content">
          <div className="banner-top">
            <TextTitle $semiBold as="h2">
              {currentSlide.title}
            </TextTitle>
            <TextBody>{currentSlide.subtitle}</TextBody>
            <Button text={ctaButtonLabel} onClick={currentSlide.onClick} />
          </div>
          <Container $display="flex" $gap="8px">
            <Button
              icon={
                <ArrowLeft
                  fill={colors.BLACK}
                  width={15}
                  aria-label="go to previous slide"
                />
              }
              theme={buttonThemes.inverseDefault}
              $hasFill={true}
              onClick={() => !isDebounced && setCurrentIndex(prevIndex)}
            />
            <Button
              icon={
                <ArrowRight
                  fill={colors.BLACK}
                  width={15}
                  aria-label="go to next slide"
                />
              }
              theme={buttonThemes.inverseDefault}
              $hasFill={true}
              onClick={() => !isDebounced && setCurrentIndex(nextIndex)}
            />
          </Container>
        </div>
      </div>
    </StyledBanner>
  );
};

export default ImageBanner;
