import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer", () => {
  it("should render footer content", () => {
    render(<Footer />);
    expect(
      screen.getByText("Alphashop, 2023 © ALL RIGHTS RESERVED")
    ).toBeInTheDocument();
  });
});
