import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductShowcase from "./ProductShowcase";

const MOCK_IMAGE = "/first-slide";
const MOCK_NAME = "Chuck Norris's boots";
const MOCK_PRICE = 299;

describe("Product Showcase", () => {
  it("should render, image, image controls, name, price & button", () => {
    render(
      <ProductShowcase
        images={[MOCK_IMAGE, MOCK_IMAGE]}
        name={MOCK_NAME}
        price={MOCK_PRICE}
        onAddToCart={jest.fn()}
      />
    );

    expect(screen.getByAltText(MOCK_NAME)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "go to next image" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "go to previous image" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "go to image 1" })
    ).toBeInTheDocument();
    expect(screen.getByText(MOCK_NAME)).toBeInTheDocument();
    expect(screen.getByText(MOCK_PRICE.toString())).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "ADD TO CART" })
    ).toBeInTheDocument();
  });

  it("should call onAddCart when button is clicked", async () => {
    const onAddToCartMock = jest.fn();
    const user = userEvent.setup();
    render(
      <ProductShowcase
        images={[MOCK_IMAGE]}
        name={MOCK_NAME}
        price={MOCK_PRICE}
        onAddToCart={onAddToCartMock}
      />
    );

    await user.click(screen.getByRole("button", { name: "ADD TO CART" }));
    expect(onAddToCartMock).toHaveBeenCalled();
  });
});
