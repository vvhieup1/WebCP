import React from "react";
import { WrapperInputStyle } from "./style";


const InputForm = ( props )=> {
    const { placeholder = 'Nhập text', ...rest} = props
    const handleOnchangeInput = (e) => {
        props.onChange(e.target.value)
    }
    return (
        <WrapperInputStyle placeholder={placeholder} value={props.value} {...rest} onChange={handleOnchangeInput}/>
    )
}

export default InputForm