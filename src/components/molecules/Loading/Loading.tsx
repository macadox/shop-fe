import React from "react";
import Spinner from "../../atoms/Spinner/Spinner";
import Container from "../../atoms/Container/Container";

const Loading = () => {
  return (
    <Container
      $width="100%"
      $display="flex"
      $justifyContent="center"
      $alignItems="center"
    >
      <Spinner />
    </Container>
  );
};

export default Loading;
