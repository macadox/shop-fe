import React from "react";
import Container from "./components/atoms/Container/Container";
import MainRouter from "./components/Router/MainRouter";

const App = () => {
  return (
    <Container $minHeight="200vh" display="flex" flexDirection="column">
      <MainRouter />
    </Container>
  );
};

export default App;
