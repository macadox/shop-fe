import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Burger from "./Burger";

describe("Navigation Burger", () => {
  it("should display open navigation label if burger is closed", () => {
    render(<Burger isOpen={false} onClickHandler={jest.fn()} />);
    expect(screen.getByRole("button")).toHaveAttribute(
      "aria-label",
      "open navigation"
    );
  });
  it("should display hide navigation label if burger is open", () => {
    render(<Burger isOpen={true} onClickHandler={jest.fn()} />);
    expect(screen.getByRole("button")).toHaveAttribute(
      "aria-label",
      "hide navigation"
    );
  });
  it("should fire onClickHandler, when user toggles burger", async () => {
    const user = userEvent.setup();
    const onClickHandlerMock = jest.fn();
    render(<Burger isOpen={false} onClickHandler={onClickHandlerMock} />);

    await user.click(screen.getByRole("button", { name: "open navigation" }));
    expect(onClickHandlerMock).toHaveBeenCalled();
  });
});
