import { Input } from "antd/lib";
import React from "react";

const InputText = ({
  children,
  maxLength,
  type,
  style,
  name,
  className,
  optional,
  required,
  readOnly,
  placeholder,
  disabled,
  value,
  defaultValue,
  onChange,
  size,
  onBlur,
  ...rest
}) => {
  return (
    <Input
      type={type}
      className={className}
      optional={optional}
      required={required}
      readOnly={readOnly}
      defaultValue={defaultValue}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      onChange={onChange}
      style={style}
      name={name}
      maxLength={maxLength}
      size={size}
      onBlur={onBlur}
    />
  );
};

export default InputText;
