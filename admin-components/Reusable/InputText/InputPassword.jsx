import { Input } from 'antd/lib'
import React from 'react'

const InputPassword = ({children,type,name,style,className,optional,required,readOnly,placeholder,disabled,value,defaultValue,onChange,...rest}) => {
  return (
    <Input.Password
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
    // iconRender={iconRender}
    
/>
  )
}

export default InputPassword