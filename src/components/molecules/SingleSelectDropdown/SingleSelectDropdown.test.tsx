/* eslint-disable jsx-a11y/label-has-associated-control */
// We handle control by aria-labelledby which is not supported by the linter
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SingleSelectDropdown from "./SingleSelectDropdown";
import { act } from "react-dom/test-utils";

const mockOptions = [
  { id: "test_1", value: "Test Value 1" },
  { id: "test_2", value: "Test Value 2" },
  { id: "test_3", value: "Test Value 3" },
  { id: "test_4", value: "Test Value 4" },
];

const mockId = "dropdown-uniqueid";

describe("SingleSelectDropdown state", () => {
  it("should render the dropdown with combobox only visible", () => {
    render(
      <SingleSelectDropdown
        options={mockOptions}
        handleSelectCallback={jest.fn()}
        dropdownId={mockId}
      />
    );
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByText("Select Item")).toBeInTheDocument();

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(screen.queryByRole("option")).not.toBeInTheDocument();
  });
  it("should present the default placeholder if it is passed", () => {
    render(
      <SingleSelectDropdown
        options={mockOptions}
        handleSelectCallback={jest.fn()}
        dropdownId={mockId}
        defaultPlaceholder="Chuck Norris"
      />
    );
    expect(screen.queryByText("Select Item")).not.toBeInTheDocument();
    expect(screen.getByText("Chuck Norris")).toBeInTheDocument();
  });
  it("should present the default option selected", () => {
    render(
      <SingleSelectDropdown
        options={mockOptions}
        handleSelectCallback={jest.fn()}
        dropdownId={mockId}
        initialSelectedId={mockOptions[2].id}
      />
    );

    expect(screen.getByText(mockOptions[2].value)).toBeInTheDocument();
  });
  it("should have all required aria-attributes and roles", async () => {
    const user = userEvent.setup();
    render(
      <>
        <label id={`${mockId}--label`}>Label For Dropdown</label>
        <SingleSelectDropdown
          options={mockOptions}
          handleSelectCallback={jest.fn()}
          dropdownId={mockId}
          initialSelectedId="test_1"
        />
      </>
    );

    const combobox = screen.getByRole("combobox", {
      name: "Label For Dropdown",
    });
    expect(combobox).toHaveAttribute("aria-haspopup", "listbox");
    expect(combobox).not.toHaveAttribute("aria-activedescendant");
    expect(combobox).toHaveAttribute("aria-controls", `${mockId}--listbox`);
    expect(combobox).toHaveAttribute("aria-labelledby", `${mockId}--label`);
    expect(combobox).toHaveAttribute("aria-expanded", "false");
    expect(combobox).toHaveAttribute("tabIndex", "0");

    await user.click(combobox);

    // Combobox after click
    expect(combobox).toHaveAttribute("aria-expanded", "true");
    await waitFor(() => {
      expect(combobox).toHaveAttribute("aria-activedescendant");
    });
    // Listbox after click
    const listbox = screen.getByRole("listbox", { name: "Label For Dropdown" });
    expect(listbox).toHaveAttribute("id", `${mockId}--listbox`);
    expect(listbox).toHaveAttribute("aria-labelledby", `${mockId}--label`);
    // Options after click
    expect(screen.getAllByRole("option")).toHaveLength(4);
  });
  it("should rotate the caret, when the dropdown is open", async () => {
    const user = userEvent.setup();
    render(
      <SingleSelectDropdown
        options={mockOptions}
        handleSelectCallback={jest.fn()}
        dropdownId={mockId}
      />
    );

    expect(screen.getByTestId("caret-svg")).toHaveAttribute(
      "transform",
      "rotate(0)"
    );
    const combobox = screen.getByRole("combobox");
    await user.click(combobox);
    expect(screen.getByTestId("caret-svg")).toHaveAttribute(
      "transform",
      "rotate(180)"
    );
  });
});

describe("SingleSelectDropdown mouse interactions", () => {
  it("should close the listbox, when we click outside of the listbox", async () => {
    const user = userEvent.setup();
    render(
      <SingleSelectDropdown
        options={mockOptions}
        handleSelectCallback={jest.fn()}
        dropdownId={mockId}
      />
    );
    const combobox = screen.getByRole("combobox");
    //Open
    await user.click(combobox);

    // Close
    await user.click(document.body);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(screen.queryByRole("option")).not.toBeInTheDocument();
  });
  it("should close the listbox if we click again on the combobox", async () => {
    const user = userEvent.setup();
    render(
      <SingleSelectDropdown
        options={mockOptions}
        handleSelectCallback={jest.fn()}
        dropdownId={mockId}
      />
    );
    const combobox = screen.getByRole("combobox");
    // Open
    await user.click(combobox);

    // Close
    await user.click(combobox);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(screen.queryByRole("option")).not.toBeInTheDocument();
  });
  it("should set the selected option & close listbox, when we click on another listitem", async () => {
    const user = userEvent.setup();
    render(
      <SingleSelectDropdown
        options={mockOptions}
        handleSelectCallback={jest.fn()}
        dropdownId={mockId}
      />
    );
    const combobox = screen.getByRole("combobox");
    await user.click(combobox);
    const option = screen.getByRole("option", { name: "Test Value 2" });
    await user.click(option);

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(screen.queryByRole("option")).not.toBeInTheDocument();
    expect(screen.getByText("Test Value 2")).toBeInTheDocument();
  });
  it("should call handleSelectCallback when we select a new option", async () => {
    const user = userEvent.setup();
    const handleSelectCallbackMock = jest.fn();
    render(
      <SingleSelectDropdown
        options={mockOptions}
        handleSelectCallback={handleSelectCallbackMock}
        dropdownId={mockId}
        initialSelectedId="test_1"
      />
    );
    const combobox = screen.getByRole("combobox");
    await user.click(combobox);
    const option = screen.getByRole("option", { name: "Test Value 2" });
    await user.click(option);
    expect(handleSelectCallbackMock).toHaveBeenCalled();
  });
  it("should not call handleSelctCallback when we select the same option", async () => {
    const user = userEvent.setup();
    const handleSelectCallbackMock = jest.fn();
    render(
      <SingleSelectDropdown
        options={mockOptions}
        handleSelectCallback={handleSelectCallbackMock}
        dropdownId={mockId}
        initialSelectedId="test_1"
      />
    );
    const combobox = screen.getByRole("combobox");
    await user.click(combobox);
    const option = screen.getByRole("option", { name: "Test Value 1" });
    await user.click(option);

    expect(handleSelectCallbackMock).not.toHaveBeenCalled();
  });
});

describe("SingleSelectDropdown keyboard interactions", () => {
  it("should toggle the dropdown, when we press enter", async () => {
    const user = userEvent.setup();
    render(
      <SingleSelectDropdown
        options={mockOptions}
        handleSelectCallback={jest.fn()}
        dropdownId={mockId}
      />
    );
    const combobox = screen.getByRole("combobox");
    act(() => {
      combobox.focus();
    });

    expect(combobox).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    await user.keyboard("{Enter}");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("should toggle the dropdown, when we press SPACE", async () => {
    const user = userEvent.setup();
    render(
      <SingleSelectDropdown
        options={mockOptions}
        handleSelectCallback={jest.fn()}
        dropdownId={mockId}
      />
    );
    const combobox = screen.getByRole("combobox");
    act(() => {
      combobox.focus();
    });

    await user.keyboard(" ");
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    await user.keyboard(" ");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });
  it("should close the dropdown when we press ESCAPE", async () => {
    const user = userEvent.setup();
    render(
      <SingleSelectDropdown
        options={mockOptions}
        handleSelectCallback={jest.fn()}
        dropdownId={mockId}
      />
    );
    const combobox = screen.getByRole("combobox");
    act(() => {
      combobox.focus();
    });

    await user.keyboard("{Enter}");
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });
  it("should select all items when we press DOWN/RIGHT till the last item", async () => {
    const user = userEvent.setup();
    render(
      <SingleSelectDropdown
        options={mockOptions}
        handleSelectCallback={jest.fn()}
        dropdownId={mockId}
        defaultPlaceholder="Select some value now"
      />
    );
    expect(screen.getByText("Select some value now")).toBeInTheDocument();

    const combobox = screen.getByRole("combobox");
    act(() => {
      combobox.focus();
    });

    await user.keyboard("{ArrowRight}");
    expect(screen.getByText("Test Value 1")).toBeInTheDocument();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByText("Test Value 2")).toBeInTheDocument();
    await user.keyboard("{ArrowDown}");
    expect(screen.getByText("Test Value 3")).toBeInTheDocument();
    await user.keyboard("{ArrowDown}");
    expect(screen.getByText("Test Value 4")).toBeInTheDocument();
    // Should stay at the last item
    await user.keyboard("{ArrowDown}");
    expect(screen.getByText("Test Value 4")).toBeInTheDocument();
  });
  it("should select all items when we press LEFT/UP till the last item", async () => {
    const user = userEvent.setup();
    render(
      <SingleSelectDropdown
        options={mockOptions}
        handleSelectCallback={jest.fn()}
        dropdownId={mockId}
        defaultPlaceholder="Select some value now"
        initialSelectedId="test_4"
      />
    );
    const combobox = screen.getByRole("combobox");
    act(() => {
      combobox.focus();
    });

    await user.keyboard("{ArrowLeft}");
    expect(screen.getByText("Test Value 3")).toBeInTheDocument();
    await user.keyboard("{ArrowUp}");
    expect(screen.getByText("Test Value 2")).toBeInTheDocument();
    await user.keyboard("{ArrowUp}");
    expect(screen.getByText("Test Value 1")).toBeInTheDocument();
    // Should stay at the last item
    await user.keyboard("{ArrowUp}");
    expect(screen.getByText("Test Value 1")).toBeInTheDocument();
  });
  it("should jump to first item, when we press HOME", async () => {
    const user = userEvent.setup();
    render(
      <SingleSelectDropdown
        options={mockOptions}
        handleSelectCallback={jest.fn()}
        dropdownId={mockId}
        initialSelectedId="test_4"
      />
    );
    const combobox = screen.getByRole("combobox");
    act(() => {
      combobox.focus();
    });

    await user.keyboard("{home}");
    expect(screen.getByText("Test Value 1")).toBeInTheDocument();
  });
  it("should jump to last item, when we press END", async () => {
    const user = userEvent.setup();
    render(
      <SingleSelectDropdown
        options={mockOptions}
        handleSelectCallback={jest.fn()}
        dropdownId={mockId}
      />
    );
    const combobox = screen.getByRole("combobox");
    act(() => {
      combobox.focus();
    });

    await user.keyboard("{end}");
    expect(screen.getByText("Test Value 4")).toBeInTheDocument();
  });
});
