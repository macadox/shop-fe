import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Container from "./components/atoms/Container/Container";
import MainRouter from "./components/Router/MainRouter";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Container $minHeight="100vh" $display="flex" $flexDirection="column">
        <MainRouter />
      </Container>
    </QueryClientProvider>
  );
};

export default App;
