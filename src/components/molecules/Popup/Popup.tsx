import React, { useState } from "react";
import { usePopper } from "react-popper";
import { Placement as PopperPlacement } from "@popperjs/core";
import Container from "../../atoms/Container/Container";

type Props = {
  TriggerComponent: React.FC;
  PoppedComponent: React.FC;
  isOpen: boolean;
  placement?: PopperPlacement;
  padding?: number;
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
  padding = 12,
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
          offset: [0, padding],
        },
      },
      {
        name: "preventOverflow",
        options: {
          boundary: document.body,
          altAxis: true,
          padding,
        },
      },
      {
        name: "flip",
        options: {
          fallbackPlacements: getFallbackPlacements(placement),
          padding,
        },
      },
    ],
  });

  return (
    <Container ref={setContainerRef} position="relative">
      <TriggerComponent />
      {isOpen && (
        <Container
          ref={setPopperRef}
          style={styles.popper}
          {...attributes.popper}
        >
          <PoppedComponent />
        </Container>
      )}
    </Container>
  );
};

export default Popup;
