import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Counter from "./Counter";

describe("Counter", () => {
  it("should render counter value", () => {
    render(
      <Counter value={12} onDecrement={jest.fn()} onIncrement={jest.fn()} />
    );
    expect(screen.getByText("12")).toBeInTheDocument;
  });
  it("should call onDecrement, when we click on '-'", async () => {
    const user = userEvent.setup();
    const onDecrementMock = jest.fn();
    render(
      <Counter
        value={1}
        onDecrement={onDecrementMock}
        onIncrement={jest.fn()}
      />
    );

    await user.click(screen.getByRole("button", { name: "-" }));
    expect(onDecrementMock).toHaveBeenCalled();
  });
  it("should call onIncrement, when we click on '+'", async () => {
    const user = userEvent.setup();
    const onIncrementMock = jest.fn();
    render(
      <Counter
        value={1}
        onDecrement={jest.fn()}
        onIncrement={onIncrementMock}
      />
    );

    await user.click(screen.getByRole("button", { name: "+" }));
    expect(onIncrementMock).toHaveBeenCalled();
  });
});
