import React from "react";
import { useQuery } from "@tanstack/react-query";

import Container from "../../components/atoms/Container/Container";
import ProductGrid from "../../components/organisms/ProductGrid/ProductGrid";
import Banner from "../../components/organisms/Banner/Banner";

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
    <>
      <Container as="section">
        <Banner
          slides={[
            {
              src: "https://picsum.photos/900/600",
              alt: "random image",
              title: "Awesome Shoes",
              subtitle:
                "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti molestiae doloribus fugiat velit. Ut, dolor!",
              onClick: () => console.log("see more"),
            },
            {
              src: "https://picsum.photos/900/601",
              alt: "random image",
              title: "Pwner siema",
              subtitle:
                "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti molestiae doloribus fugiat velit. Ut, dolor!",
              onClick: () => console.log("see more"),
            },
          ]}
        />
      </Container>

      <Container
        as="section"
        $p={32}
        $my={32}
        $mx="auto"
        $maxWidth={INNER_CONTAINER_MAX_WIDTH}
        $background={colors.WHITE}
      >
        <ProductGrid
          list={data || []}
          isLoading={isLoading || isFetching}
          onHeartClick={() => console.log("Implement on like")}
          onWidgetClick={() =>
            console.log("Implement redirect to product page")
          }
        />
      </Container>
    </>
  );
};

export default HomePage;
