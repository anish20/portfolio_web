import { Button } from "antd/lib";
import React from "react";

const Buttons = ({
  children,
  loading,
  size,
  className,
  type,
  block,
  style,
  htmlType,
  onClick,
  shape,
  disabled,
  ...rest
}) => {
  return (
    <Button
      loading={loading}
      type={type}
      className={className}
      block={block}
      style={style}
      htmlType={htmlType}
      onClick={onClick}
      size={size}
      shape={shape}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default Buttons;
