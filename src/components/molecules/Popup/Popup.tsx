import React, { useState, cloneElement } from "react";
import { usePopper } from "react-popper";
import { Placement as PopperPlacement } from "@popperjs/core";
import Container from "../../atoms/Container/Container";

type Props = {
  TriggerComponent: React.ReactElement;
  PoppedComponent: React.ReactElement;
  isOpen: boolean;
  placement?: PopperPlacement;
  paddingMain?: number;
  paddingAlt?: number;
};

const getFallbackPlacements = (
  placement?: PopperPlacement
): PopperPlacement[] => {
  switch (placement) {
    case "bottom": {
      return ["top", "right", "left"];
    }
    case "right": {
      return ["left", "top", "bottom"];
    }
    default: {
      return [];
    }
  }
};

const Popup = ({
  TriggerComponent,
  PoppedComponent,
  isOpen,
  placement,
  paddingMain = 12,
  paddingAlt = 0,
}: Props) => {
  // Popper
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);
  const [popperRef, setPopperRef] = useState<HTMLDivElement | null>(null);

  const { styles, attributes } = usePopper(containerRef, popperRef, {
    placement,
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [paddingAlt, paddingMain],
        },
      },
      {
        name: "preventOverflow",
        options: {
          boundary: document.body,
          altAxis: true,
          padding: paddingMain,
        },
      },
      {
        name: "flip",
        options: {
          fallbackPlacements: getFallbackPlacements(placement),
          padding: paddingMain,
        },
      },
    ],
  });

  const TriggerWithRef = cloneElement(TriggerComponent, {
    ref: setContainerRef,
  });

  return (
    <Container zIndex={10} position="relative" width="100%">
      {TriggerWithRef}
      {isOpen && (
        <Container
          width="100%"
          position="absolute"
          ref={setPopperRef}
          style={styles.popper}
          {...attributes.popper}
        >
          {PoppedComponent}
        </Container>
      )}
    </Container>
  );
};

export default Popup;
