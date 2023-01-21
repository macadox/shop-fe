import React from "react";
import { Link } from "react-router-dom";

import Container from "../../components/atoms/Container/Container";
import TextTitle from "../../components/atoms/TextTitle/TextTitle";
import TextBody from "../../components/atoms/TextBody/TextBody";
import Button from "../../components/atoms/Button/Button";

import notFound from "../../assets/photos/not-found.svg";
import { ROUTES } from "../../constants/routes";

const ErrorPage = () => {
  return (
    <Container width="100%">
      <Container $maxWidth="500px" mx="auto">
        <img width="100%" src={notFound} alt="portal to another dimension" />
      </Container>
      <Container
        display="flex"
        flexDirection="column"
        $alignItems="center"
        gap="16px"
        p={16}
      >
        <TextTitle as="h2" textAlign="center" size="24px" semiBold>
          Page not Found
        </TextTitle>
        <TextBody textAlign="center">
          You&apos;ve opened portal to another world. If you wish to stay...
        </TextBody>
        <Link to={ROUTES.HOME}>
          <Button text="Go to Home" />
        </Link>
      </Container>
    </Container>
  );
};

export default ErrorPage;
