import { styled } from "styled-components";

export const StyledTeaser = styled.div<{ $reverse: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (min-width: 640px) {
    flex-direction: ${({ $reverse }) => (!$reverse ? "row" : "row-reverse")};
    gap: 32px;
  }
`;
