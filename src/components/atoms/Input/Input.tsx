import React, { HTMLInputTypeAttribute, RefObject } from "react";

type Props = {
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  innerRef: RefObject<HTMLInputElement>;
};
import DefaultBox from "../DefaultBox/DefaultBox";

const Input: React.FC<Props> = ({
  placeholder = "",
  type = "text",
  innerRef,
  onChange,
}) => {
  return (
    <DefaultBox
      type={type}
      placeholder={placeholder}
      ref={innerRef}
      as="input"
      {...(onChange && { onChange })}
    />
  );
};

export default Input;
