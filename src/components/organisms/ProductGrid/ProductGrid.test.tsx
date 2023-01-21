import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductGrid from "./ProductGrid";

import mockData from "../../../assets/mocks/GetAllProducts.json";
import { GetAllProductsResponse } from "../../../constants/types";

describe("ProductGrid initial state", () => {
  it("should render filterpanel, pagination and grid content", () => {
    render(
      <ProductGrid
        list={mockData as GetAllProductsResponse}
        isLoading={false}
        onHeartClick={jest.fn()}
        onWidgetClick={jest.fn()}
      />
    );

    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByText(mockData?.[0]?.name)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument();
  });
  it("should not render items, if the list is still loading", () => {
    render(
      <ProductGrid
        list={mockData as GetAllProductsResponse}
        isLoading={true}
        onHeartClick={jest.fn()}
        onWidgetClick={jest.fn()}
      />
    );
    expect(screen.getByLabelText("loading")).toBeInTheDocument();
    expect(screen.queryByText(mockData?.[0]?.name)).not.toBeInTheDocument();
  });
});

describe("ProductGrid interactions", () => {
  it("should call onHeartClickMock, when product widget is clicked", async () => {
    const onHeartClickMock = jest.fn();
    const user = userEvent.setup();
    render(
      <ProductGrid
        list={mockData as GetAllProductsResponse}
        isLoading={false}
        onHeartClick={onHeartClickMock}
        onWidgetClick={jest.fn()}
      />
    );

    const emptyHeartButton = screen.getByRole("button", {
      name: `like ${mockData?.[0]?.name}`,
    });
    await user.click(emptyHeartButton);

    expect(onHeartClickMock).toHaveBeenCalled();
  });
  it("should call onWidgetClickMock when product widget is clicked", async () => {
    const onWidgetClickMock = jest.fn();
    const user = userEvent.setup();
    render(
      <ProductGrid
        list={mockData as GetAllProductsResponse}
        isLoading={false}
        onWidgetClick={onWidgetClickMock}
        onHeartClick={jest.fn()}
      />
    );

    const firstProductText = screen.getByText(mockData?.[0]?.name);
    await user.click(firstProductText);

    expect(onWidgetClickMock).toHaveBeenCalledWith(mockData?.[0]?.id);
  });
});
