import React from "react";
import ReactTestUtils, { act } from "react-dom/test-utils";
import { render, screen } from "@testing-library/react";
import Image from "./Image";

describe("Image loading state", () => {
  it("use correct src & alt for image", () => {
    render(
      <Image
        src="/assets/test"
        alt="loaded image"
        $width="10px"
        $height="10px"
      />
    );
    const image = screen.getByAltText("loaded image");
    expect(image).toHaveAttribute("src", "/assets/test");
  });
  it("should show loader until image is not loaded", () => {
    render(
      <Image
        src="/assets/test"
        alt="loaded image"
        $width="10px"
        $height="10px"
      />
    );

    expect(screen.getByLabelText("loading")).toBeInTheDocument();
  });
  it("should not show loader when image is loaded", () => {
    render(
      <Image
        src="/assets/test"
        alt="loaded image"
        $width="10px"
        $height="10px"
      />
    );
    const image = screen.getByAltText("loaded image");
    act(() => {
      ReactTestUtils.Simulate.load(image);
    });

    expect(screen.queryByLabelText("loading")).not.toBeInTheDocument();
  });
});
