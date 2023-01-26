import React, { RefObject } from "react";
import { HTMLInputProps } from "../../../constants/htmlProps.types";

type Props = {
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  innerRef: RefObject<HTMLInputElement>;
};
import DefaultBox from "../DefaultBox/DefaultBox";

const Input: React.FC<Props & HTMLInputProps> = ({
  placeholder = "",
  innerRef,
  onChange,
  ...rest
}) => {
  return (
    <DefaultBox
      {...rest}
      {...(onChange && { onChange })}
      placeholder={placeholder}
      as="input"
      ref={innerRef}
    />
  );
};

export default Input;
