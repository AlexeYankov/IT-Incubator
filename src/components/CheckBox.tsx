import React, {ChangeEvent} from 'react';
import {Checkbox} from "@mui/material";

type CheckBoxPropsType ={
    callBack: (eventValue:boolean) => void
    checked: boolean
}

export const CheckBox = (props: CheckBoxPropsType) => {
    const onChangeHandler=(e: ChangeEvent<HTMLInputElement>)=> {
        props.callBack(e.currentTarget.checked)
    }
    return (
        <Checkbox
            onChange={onChangeHandler}
            checked={props.checked}
            defaultChecked
        />
    );
};

export default CheckBox;