import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductWidget from "./ProductWidget";
import MOCK_PRODUCT_PHOTO from "../../../../public/assets/product1.jpg";

const MOCK_PRODUCT_NAME = "Chuck Norris boots";
const MOCK_PRODUCT_SLUG = "chuck-norris-boots";
const MOCK_PRODUCT_PRICE = 100000;
const MOCK_PRODUCT_ID = 0;

describe("ProductWidget", () => {
  it("should present all of the details of the widget", () => {
    render(
      <ProductWidget
        id={MOCK_PRODUCT_ID}
        slug={MOCK_PRODUCT_SLUG}
        name={MOCK_PRODUCT_NAME}
        src={MOCK_PRODUCT_PHOTO}
        price={MOCK_PRODUCT_PRICE}
        favorited={false}
        onHeartClick={jest.fn()}
        onWidgetClick={jest.fn()}
      />
    );

    expect(screen.getByAltText(MOCK_PRODUCT_NAME));
    expect(screen.getByText(MOCK_PRODUCT_NAME)).toBeInTheDocument();
    expect(screen.getByText(`${MOCK_PRODUCT_PRICE}zł`)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: `like ${MOCK_PRODUCT_NAME}` })
    ).toBeInTheDocument();
  });
  it("should change the state of heart", async () => {
    const user = userEvent.setup();
    render(
      <ProductWidget
        id={MOCK_PRODUCT_ID}
        slug={MOCK_PRODUCT_SLUG}
        name={MOCK_PRODUCT_NAME}
        src={MOCK_PRODUCT_PHOTO}
        price={MOCK_PRODUCT_PRICE}
        favorited={false}
        onHeartClick={jest.fn()}
        onWidgetClick={jest.fn()}
      />
    );

    const emptyHeartButton = screen.getByRole("button", {
      name: `like ${MOCK_PRODUCT_NAME}`,
    });
    await user.click(emptyHeartButton);

    const fullHeartButton = screen.getByRole("button", {
      name: `unlike ${MOCK_PRODUCT_NAME}`,
    });

    await user.click(fullHeartButton);

    // Again should be empty
    expect(
      screen.getByRole("button", { name: `like ${MOCK_PRODUCT_NAME}` })
    ).toBeInTheDocument();
  });
  it("should call onWidgetClick with correct value when we click on the widget", async () => {
    const user = userEvent.setup();
    const onWidgetClickMock = jest.fn();

    render(
      <ProductWidget
        id={MOCK_PRODUCT_ID}
        slug={MOCK_PRODUCT_SLUG}
        name={MOCK_PRODUCT_NAME}
        src={MOCK_PRODUCT_PHOTO}
        price={MOCK_PRODUCT_PRICE}
        favorited={false}
        onHeartClick={jest.fn()}
        onWidgetClick={onWidgetClickMock}
      />
    );
    const productWidgetContainer = screen.getByTestId(
      "product-widget-container"
    );
    await user.click(productWidgetContainer);

    expect(onWidgetClickMock).toHaveBeenCalledWith(MOCK_PRODUCT_SLUG);
  });
  it("should call onHeartClick with correct value when we click on it", async () => {
    const user = userEvent.setup();
    const onHeartClickMock = jest.fn();

    render(
      <ProductWidget
        id={MOCK_PRODUCT_ID}
        slug={MOCK_PRODUCT_SLUG}
        name={MOCK_PRODUCT_NAME}
        src={MOCK_PRODUCT_PHOTO}
        price={MOCK_PRODUCT_PRICE}
        favorited={false}
        onHeartClick={onHeartClickMock}
        onWidgetClick={jest.fn()}
      />
    );
    const emptyHeartButton = screen.getByRole("button", {
      name: `like ${MOCK_PRODUCT_NAME}`,
    });
    await user.click(emptyHeartButton);

    expect(onHeartClickMock).toHaveBeenCalledWith(MOCK_PRODUCT_ID, true);
  });
  it("should target the widget with tab", async () => {
    const user = userEvent.setup();

    render(
      <ProductWidget
        id={MOCK_PRODUCT_ID}
        slug={MOCK_PRODUCT_SLUG}
        name={MOCK_PRODUCT_NAME}
        src={MOCK_PRODUCT_PHOTO}
        price={MOCK_PRODUCT_PRICE}
        favorited={false}
        onHeartClick={jest.fn()}
        onWidgetClick={jest.fn()}
      />
    );

    await user.tab();
    expect(screen.getByTestId("product-widget-container")).toHaveFocus();
  });
});
