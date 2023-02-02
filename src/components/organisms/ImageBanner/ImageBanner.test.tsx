import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ImageBanner from "./ImageBanner";

const FIRST_SLIDE = {
  src: "/first-slide",
  alt: "first slide alt text",
  title: "First slide",
  subtitle: "First slide subtitle",
  onClick: jest.fn(),
};

const SECOND_SLIDE = {
  src: "/second-slide",
  alt: "second slide alt text",
  title: "Second slide",
  subtitle: "Second slide subtitle",
  onClick: jest.fn(),
};

const MOCK_BUTTON_TITLE = "SEE MORE";

describe("ImageBanner Content", () => {
  it("should present the first slide content", () => {
    render(
      <ImageBanner slides={[FIRST_SLIDE]} ctaButtonLabel={MOCK_BUTTON_TITLE} />
    );

    expect(screen.getByAltText(FIRST_SLIDE.alt)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /see more/i })
    ).toBeInTheDocument();
    expect(screen.getByText(FIRST_SLIDE.title)).toBeInTheDocument();
    expect(screen.getByText(FIRST_SLIDE.subtitle)).toBeInTheDocument();
  });
});

describe("ImageBanner interactions", () => {
  it("should call onClick when we press see more button", async () => {
    const onClickMock = jest.fn();
    const user = userEvent.setup();
    render(
      <ImageBanner
        slides={[{ ...FIRST_SLIDE, onClick: onClickMock }]}
        ctaButtonLabel={MOCK_BUTTON_TITLE}
      />
    );

    await user.click(screen.getByRole("button", { name: /see more/i }));
    expect(onClickMock).toHaveBeenCalled();
  });
  it("should switch to the next slide, when we press next button", async () => {
    const user = userEvent.setup();
    render(
      <ImageBanner
        slides={[FIRST_SLIDE, SECOND_SLIDE]}
        debounceTimeout={0}
        ctaButtonLabel={MOCK_BUTTON_TITLE}
      />
    );

    await user.click(screen.getByRole("button", { name: "go to next slide" }));

    // Expect to show second slide content
    expect(screen.getByAltText(SECOND_SLIDE.alt)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /see more/i })
    ).toBeInTheDocument();
    expect(screen.getByText(SECOND_SLIDE.title)).toBeInTheDocument();
    expect(screen.getByText(SECOND_SLIDE.subtitle)).toBeInTheDocument();
  });
  it("should switch to the prev slide, when we press prev button", async () => {
    const user = userEvent.setup();
    render(
      <ImageBanner
        slides={[FIRST_SLIDE, SECOND_SLIDE]}
        debounceTimeout={0}
        ctaButtonLabel={MOCK_BUTTON_TITLE}
      />
    );

    await user.click(
      screen.getByRole("button", { name: "go to previous slide" })
    );

    // Expect to show second slide content, because we cycle through
    expect(screen.getByAltText(SECOND_SLIDE.alt)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /see more/i })
    ).toBeInTheDocument();
    expect(screen.getByText(SECOND_SLIDE.title)).toBeInTheDocument();
    expect(screen.getByText(SECOND_SLIDE.subtitle)).toBeInTheDocument();
  });
});
