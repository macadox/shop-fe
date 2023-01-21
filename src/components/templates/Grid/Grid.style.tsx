import { styled } from "styled-components";

type Props = {
  gap: string;
  maxColumnCount: number;
  itemMinWidth: string;
};

export const StyledGrid = styled.div<Props>`
  /**
   * User input values.
   */
  --grid-layout-gap: ${({ gap }) => gap};
  --grid-column-count: ${({ maxColumnCount }) => maxColumnCount};
  --grid-item--min-width: ${({ itemMinWidth }) => itemMinWidth};

  /**
   * Calculated values.
   */
  --gap-count: calc(var(--grid-column-count) - 1);
  --total-gap-width: calc(var(--gap-count) * var(--grid-layout-gap));
  --grid-item--max-width: calc(
    (100% - var(--total-gap-width)) / var(--grid-column-count)
  );

  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(max(var(--grid-item--min-width), var(--grid-item--max-width)), 1fr)
  );
  grid-gap: var(--grid-layout-gap);
  justify-items: center;
`;
