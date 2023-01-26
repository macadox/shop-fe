import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Tag from "./Tag";

describe("Tag", () => {
  it("should render the content", () => {
    render(<Tag content="Chuck Norris" />);
    expect(screen.getByText("Chuck Norris")).toBeInTheDocument();
  });
  it("should not render the clear button if func is not passed", () => {
    render(<Tag content="Chuck Norris" />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
  it("should call onClear when clear button is pressed", async () => {
    const onClearMock = jest.fn();
    const user = userEvent.setup();
    render(<Tag content="Chuck Norris" onClear={onClearMock} />);

    await user.click(screen.getByRole("button"));
    expect(onClearMock).toHaveBeenCalled();
  });
});
