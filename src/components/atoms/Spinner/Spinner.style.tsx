import { styled } from "styled-components";
import { sizes } from "./Spinner";

type SizeValue = typeof sizes[keyof typeof sizes];

export const SpinnerHead = styled.div<{ size: SizeValue; color: string }>`
  position: absolute;
  right: 0px;
  top: calc(50% - ${({ size }) => size * 15 + "px"});
  height: ${({ size }) => size * 25 + "px"};
  width: ${({ size }) => size * 25 + "px"};
  border-radius: 50%;
  background: linear-gradient(
    180deg,
    transparent 50%,
    ${({ color }) => color} 50%
  );
`;

export const StyledSpinner = styled.div<{ size: SizeValue; color: string }>`
  width: ${({ size }) => size * 160 + "px"};
  height: ${({ size }) => size * 160 + "px"};
  border-radius: 50%;
  position: relative;

  background: conic-gradient(
    from 90deg at 50% 50%,
    #f8f8f8 20%,
    ${({ color }) => color} 100%
  );

  mask: radial-gradient(
    farthest-side,
    transparent calc(100% - ${({ size }) => size * 25 + "px"}),
    #000 calc(100% - ${({ size }) => size * 25 + "px"})
  );
  -webkit-mask: radial-gradient(
    farthest-side,
    transparent calc(100% - ${({ size }) => size * 25 + "px"}),
    #000 calc(100% - ${({ size }) => size * 25 + "px"})
  );

  animation: spin 0.55s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
