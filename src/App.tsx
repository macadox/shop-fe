import React from "react";
import { Container } from "./components/atoms";
import GlobalStyles from "./GlobalStyles";

const App = () => {
  return (
    <>
      <GlobalStyles />
      <div>
        <Container p={25}></Container>
        <div>Hello from the App</div>
      </div>
    </>
  );
};

export default App;
