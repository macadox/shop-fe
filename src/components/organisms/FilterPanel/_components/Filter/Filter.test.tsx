import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FilterRange, FilterText } from "./Filter";

describe("FilterRange", () => {
  it("should set the min value when its passed", () => {
    render(
      <FilterRange
        setLocalValue={jest.fn()}
        initialValue={[12, null]}
        label="Price"
      />
    );

    expect(screen.getByLabelText("filter minimum Price")).toHaveValue(12);
  });
  it("should set the max value when its passed", () => {
    render(
      <FilterRange
        setLocalValue={jest.fn()}
        initialValue={[null, 10]}
        label="Price"
      />
    );

    expect(screen.getByLabelText("filter maximum Price")).toHaveValue(10);
  });
  it("should call the setLocalValue func on input change", async () => {
    const user = userEvent.setup();
    const setLocalValueMock = jest.fn();

    render(
      <FilterRange
        setLocalValue={setLocalValueMock}
        initialValue={undefined}
        label="Price"
      />
    );

    const minimumInput = screen.getByLabelText("filter minimum Price");
    const maximumInput = screen.getByLabelText("filter maximum Price");

    await user.type(minimumInput, "1");
    await user.type(maximumInput, "9");

    expect(setLocalValueMock).toHaveBeenCalledTimes(2);
  });
});
describe("FilterText", () => {
  it("should set the initial value when its passed", () => {
    render(
      <FilterText
        setLocalValue={jest.fn()}
        initialValue="Chuck Norris"
        label="Brand"
      />
    );
    expect(screen.getByLabelText("filter Brand")).toHaveValue("Chuck Norris");
  });
  it("should call the setLocalValue func on input change", async () => {
    const user = userEvent.setup();
    const setLocalValueMock = jest.fn();
    render(
      <FilterText
        setLocalValue={setLocalValueMock}
        initialValue={undefined}
        label="Brand"
      />
    );

    const input = screen.getByLabelText("filter Brand");
    await user.type(input, "Chuck Norris");
    expect(setLocalValueMock).toHaveBeenCalled();
  });
});
