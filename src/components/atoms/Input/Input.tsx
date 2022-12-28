import React, { RefObject } from "react";

type Props = {
  placeholder?: string;
  innerRef: RefObject<HTMLInputElement>;
};
import DefaultBox from "../DefaultBox/DefaultBox";

const Input: React.FC<Props> = ({ placeholder = "", innerRef }) => {
  return <DefaultBox placeholder={placeholder} ref={innerRef} as="input" />;
};

export default Input;
