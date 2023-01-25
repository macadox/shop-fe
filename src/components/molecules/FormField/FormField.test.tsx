import React from "react";
import { render, screen } from "@testing-library/react";
import FormField from "./FormField";

const MOCK_LABEL = "Test Label";
const MOCK_ID = "label";

describe("Form field initial state", () => {
  it("should render the component that is passed", () => {
    render(
      <FormField
        dropdownId={MOCK_ID}
        label={MOCK_LABEL}
        Component={() => <button>hello</button>}
      />
    );
    expect(screen.getByRole("button", { name: "hello" }));
  });
  it("should have aria a11y", () => {
    render(
      <FormField
        dropdownId={MOCK_ID}
        label={MOCK_LABEL}
        Component={() => <input aria-labelledby={`${MOCK_ID}--label`} />}
      />
    );
    expect(screen.getByLabelText(MOCK_LABEL));
  });
});
