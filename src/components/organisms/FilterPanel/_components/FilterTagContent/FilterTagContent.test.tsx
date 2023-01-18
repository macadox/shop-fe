import React from "react";
import { render, screen } from "@testing-library/react";
import FilterTagContent from "./FilterTagContent";

describe("FilterTagContent string filter", () => {
  it("should return a strict equals message for all string types", () => {
    render(<FilterTagContent label="Test" value="Chuck Norris" />);
    expect(screen.getByTestId("filter-tag-content").textContent).toBe(
      "Test matches Chuck Norris"
    );
  });
});

describe("FilterTagContent min/max tuple", () => {
  it("should return between for min/max tuple", () => {
    render(<FilterTagContent label="Test" value={[11, 124]} />);
    expect(screen.getByTestId("filter-tag-content").textContent).toBe(
      "Test is between 11 and 124"
    );
  });
  it("should return greater than for min/max tuple", () => {
    render(<FilterTagContent label="Test" value={[11, null]} />);
    expect(screen.getByTestId("filter-tag-content").textContent).toBe(
      "Test is greater than 11"
    );
  });
  it("should return lesser than for min/max tuple", () => {
    render(<FilterTagContent label="Test" value={[null, 124]} />);
    expect(screen.getByTestId("filter-tag-content").textContent).toBe(
      "Test is lesser than 124"
    );
  });
});
