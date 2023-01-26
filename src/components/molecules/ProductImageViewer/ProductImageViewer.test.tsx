import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductImageViewer from "./ProductImageViewer";

const FIRST_IMAGE = {
  src: "/first-slide",
  alt: "first slide alt text",
};

const SECOND_IMAGE = {
  src: "/second-slide",
  alt: "second slide alt text",
};

describe("ProductImageViewer Content", () => {
  it("should present the image", () => {
    render(<ProductImageViewer images={[FIRST_IMAGE]} />);
    expect(screen.getByAltText(FIRST_IMAGE.alt)).toBeInTheDocument();
  });

  it("should render as many quick nav buttons as there is images", () => {
    render(
      <ProductImageViewer images={[FIRST_IMAGE, FIRST_IMAGE, FIRST_IMAGE]} />
    );
    expect(
      screen.getAllByRole("button", { name: /go to image \d/i })
    ).toHaveLength(3);
  });
  it("should not render quick nav buttons or next, prev image when there is just one image", () => {
    render(<ProductImageViewer images={[FIRST_IMAGE]} />);

    expect(
      screen.queryByRole("button", { name: /go to image 1/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "go to previous image" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "go to next image" })
    ).not.toBeInTheDocument();
  });
});

describe("ProductImageViewer interactions", () => {
  it("should go to next image, when we press right arrow", async () => {
    const user = userEvent.setup();
    render(<ProductImageViewer images={[FIRST_IMAGE, SECOND_IMAGE]} />);

    await user.click(screen.getByRole("button", { name: "go to next image" }));
    expect(screen.getByAltText(SECOND_IMAGE.alt)).toBeInTheDocument();
  });
  it("should go to previous image, when we press left arrow", async () => {
    const user = userEvent.setup();
    render(<ProductImageViewer images={[FIRST_IMAGE, SECOND_IMAGE]} />);

    await user.click(screen.getByRole("button", { name: "go to next image" }));
    await user.click(
      screen.getByRole("button", { name: "go to previous image" })
    );
    expect(screen.getByAltText(FIRST_IMAGE.alt)).toBeInTheDocument();
  });
  it("should go to that that image index when we press quick nav button", async () => {
    const user = userEvent.setup();
    render(<ProductImageViewer images={[FIRST_IMAGE, SECOND_IMAGE]} />);

    await user.click(screen.getByRole("button", { name: "go to image 2" }));
    expect(screen.getByAltText(SECOND_IMAGE.alt)).toBeInTheDocument();
  });
});
