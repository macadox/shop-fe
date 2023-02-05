import React from "react";
import Container from "../Container/Container";
import TextBody from "../TextBody/TextBody";

import * as colors from "../../../constants/colors";
import { CounterButton } from "./Counter.style";

type Props = {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
};

const Counter = ({ value, onIncrement, onDecrement }: Props) => (
  <Container
    $border={`1px solid ${colors.LIGHT}`}
    $display="inline-flex"
    $alignItems="center"
  >
    <CounterButton onClick={onDecrement}>-</CounterButton>
    <Container
      $display="flex"
      $alignItems="center"
      $justifyContent="center"
      $minWidth="24px"
    >
      <TextBody $size="16px">{value}</TextBody>
    </Container>
    <CounterButton onClick={onIncrement}>+</CounterButton>
  </Container>
);

export default Counter;
