import React from "react";
import { useQuery } from "@tanstack/react-query";

import Container from "../../components/atoms/Container/Container";
import ProductGrid from "../../components/organisms/ProductGrid/ProductGrid";
import Spinner from "../../components/atoms/Spinner/Spinner";

import { APIProducts } from "../../services/api";
import { GetAllProductsResponse } from "../../constants/types";
import { INNER_CONTAINER_MAX_WIDTH } from "../../constants/layout";
import * as colors from "../../constants/colors";

const HomePage = () => {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
    refetchOnMount: true,
  });

  async function getAllProducts() {
    try {
      return (await APIProducts.getAllProducts(true)) as GetAllProductsResponse;
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Container
      as="section"
      $py={32}
      $mx="auto"
      $maxWidth={INNER_CONTAINER_MAX_WIDTH}
    >
      <ProductGrid
        list={data || []}
        isLoading={isLoading || isFetching}
        onHeartClick={() => console.log("Implement on like")}
        onWidgetClick={() => console.log("Implement redirect to product page")}
      />
    </Container>
  );
};

export default HomePage;
