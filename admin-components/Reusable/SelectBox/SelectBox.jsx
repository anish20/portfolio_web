import React from "react";
import { Select } from "antd/lib";
const { Option } = Select;
const SelectBox = ({
  children,
  name,
  size,
  showSearch,
  style,
  className,
  defaultValue,
  value,
  options,
  onChange,
  allowClear,
  disabled,
  placeholder,
  filterOption,
  labelInValue,
  ...rest
}) => {
  return (
    <Select
      // labelInValue={false}
      defaultValue={defaultValue}
      value={value}
      name={name}
      className={className}
      style={style}
      options={options}
      onChange={onChange}
      allowClear={allowClear}
      disabled={disabled}
      placeholder={placeholder}
      showSearch={showSearch}
      size={size}
      // getPopupContainer={(trigger) => {
      //   return trigger.parentNode;
      // }}
      filterOption={filterOption}
      dropdownStyle={{ zIndex: 2000 }}
    />
  );
};

export default SelectBox;
