import { styled } from "styled-components";

export const StyledImage = styled.img<{ $isLoaded: boolean }>`
  height: 100%;
  width: 100%;
  user-select: none;
  object-fit: cover;
  object-position: center;

  visibility: ${({ $isLoaded }) => ($isLoaded ? "visible" : "hidden")};
`;
