import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import {
    InputBase,
    Checkbox,
    TextareaAutosize,
    NativeSelect,
    Radio,
    RadioGroup,
    FormControlLabel,
    Select,
    MenuItem,
    TextField,
    Input,
    InputAdornment,
    Switch,
} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { InputNumber } from 'antd';//, DatePicker
import useStyles from "./styles";

import moment from 'moment';


function InputBaseField({ id, placeholder, name, value, type, MaxLength, MinLength, IsDisabled, onChange, InputRef, InputProps, restrictNegative, ...props }) {
    var classes = useStyles();
    //onClick, onFocus, onKeyDown, onKeyUp, onBlur,

    const onChangeEvent = (event) => {
        if (type === "date" && event.target.value?.length >= 11) { return; }
        onChange(event);
    };
    const onKeyDownEvent = (event) => {
        if (restrictNegative == true && event.key == '-')
            event.preventDefault();
    };

    const onDateChangeEvent = (date) => {
        let dateValue = moment(date).format('YYYY-MM-DD')

        let event = {
            target: {
                name: name,
                value: dateValue,
            }
        }
        onChange(event);
    };
    // const onClickEvent = (event) => {
    //   onClick(event)
    // };
    // const onFocusEvent = (event) => {
    //   onFocus(event.target);
    // };
    // const onBlurEvent = (event) => {
    //   onBlur(event.target);
    // };
    // const onKeyDownEvent = (event) => {
    //   onKeyDown(event.target);
    // };
    // const onKeyUpEvent = (event) => {
    //   onKeyUp(event.target);
    // };
    //onClick={onClickEvent}
    // onFocus={onFocusEvent}
    // onKeyDown={onKeyDownEvent}
    // onKeyUp={onKeyUpEvent}
    // onBlur={onBlurEvent}

    return (
        <>
            {type == "date" ?
                <input
                    id={id}
                    name={name}
                    value={value}
                    ref={InputRef}
                    type="date"
                    min="1920-12-31"
                    max="2099-12-31"
                    // className={classes.baseInput}
                    placeholder={placeholder}
                    onChange={onChangeEvent}
                    disabled={IsDisabled}
                    className={classes.dateInput}
                /> :
                <InputBase
                    id={id}
                    className={classes.baseInput}
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    type={type}
                    inputRef={InputRef}
                    inputProps={{ maxLength: MaxLength, minLength: MinLength, autoComplete: "off", ...InputProps }}
                    onChange={onChangeEvent}
                    onKeyDown={onKeyDownEvent}
                    disabled={IsDisabled}
                    {...props}
                />
            }
        </>
    );
}


InputBaseField.propTypes = {
    // onClick: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    // onFocus: PropTypes.func.isRequired,
    // onKeyDown: PropTypes.func.isRequired,
    // onKeyUp: PropTypes.func.isRequired,
    // onBlur: PropTypes.func.isRequired,
};

function InputPaymentField({ name, value, id, placeholder, IsDisabled, onChange, MaxLength, ...props }) {
    var classes = useStyles();

    const onChangeEvent = (numberValue) => {
        let event = {
            target: {
                id: id,
                name: name,
                value: numberValue,
            }
        }
        onChange(event);
    };
    const handleFocus = (event) => {
        console.log(event)
        event.target.select();
    }
    return (
        <InputNumber
            id={id}
            name={name}
            placeholder={placeholder}
            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
            value={value}
            className={classes.InputNumber}
            disabled={IsDisabled}
            onChange={onChangeEvent}
            onFocus={handleFocus}
            maxLength={MaxLength}
            {...props}
        />
    )
}

function InputBaseAdornmentField({ id, placeholder, name, value, type, MaxLength, IsDisabled, onChange, startadornment, InputRef, InputProps, ...props }) {
    var classes = useStyles();
    //onClick, onFocus, onKeyDown, onKeyUp, onBlur,
    const onChangeEvent = (event) => {
        onChange(event);
    };
    return (
        <>
            <InputBase
                id={id}
                classes={{
                    root: classes.adornmentBaseInput,
                    focused: classes.adornmentBaseInputFocused
                }}
                startAdornment={
                    <InputAdornment >{startadornment}</InputAdornment>
                }
                placeholder={placeholder}
                name={name}
                value={value}
                type={type}
                inputRef={InputRef}
                inputProps={{ maxLength: MaxLength, autoComplete: "off", ...InputProps }}
                onChange={onChangeEvent}
                disabled={IsDisabled}
                {...props}

            />

        </>
    );
}


InputBaseField.propTypes = {
    //   onClick: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    // onFocus: PropTypes.func.isRequired,
    // onKeyDown: PropTypes.func.isRequired,
    // onKeyUp: PropTypes.func.isRequired,
    // onBlur: PropTypes.func.isRequired,
};

function InputBaseFieldNumber({ id, placeholder, name, value, type, MaxLength, MinLength, MinValue, MaxValue, IsDisabled, onChange, InputProps, ...props }) {
    var classes = useStyles();

    const onChangeEvent = (event) => {
        if (MinValue != null && MaxValue != null) {
            if (event.target.value >= MinValue && event.target.value <= MaxValue) {
                onChange(event);
            }
        } else {
            onChange(event);
        }
    };
    const handleSelectFocus = (event) => event.target.select();
    return (
        <>
            <InputBase
                id={id}
                className={classes.baseInput}
                placeholder={placeholder}
                name={name}
                value={value}
                type="number"
                inputProps={{ autoComplete: "off", ...InputProps }}
                onChange={onChangeEvent}
                onFocus={handleSelectFocus}
                // onInput={(e) => {
                //     e.target.value = Math.max(0, parseFloat(e.target.value).toFixed(2)).toString().slice(0, MaxLength)
                //     //     // (MinValue!=null && MaxValue!=null ) ?  e.target.value  >= MinValue && e.target.value <= MaxValue ? 
                //     //     // Math.max(0, parseInt(e.target.value) ).toString().slice(0,MaxLength) :   
                //     //     // e.target.value < MaxValue ? Math.max(0, parseInt(e.target.value) ).toString().slice(0,MaxLength) :  MaxValue
                //     //     //   : 
                //     //         // Math.max(0, parseInt(e.target.value) ).toString().slice(0,MaxLength)                       
                // }}
                disabled={IsDisabled}
                {...props}

            />

        </>
    );
}


InputBaseFieldNumber.propTypes = {
    onChange: PropTypes.func.isRequired,
};


function TextareaField({ id, name, value, MaxLength, MinLength, placeholder, rowsMin, onChange, InputProps, Disabled, ...props }) {
    var classes = useStyles();

    const onChangeEvent = (event) => {
        onChange(event);
    };

    return (
        <>
            <TextareaAutosize
                id={id}
                className={classes.baseTextarea}
                rowsMin={rowsMin}
                placeholder={placeholder}
                onChange={onChangeEvent}
                name={name}
                value={value}
                maxLength={MaxLength}
                disabled={Disabled}
                inputProps={{ minlength: MinLength, autoComplete: "off", ...InputProps }}
                rows={5}
                {...props}

            />

        </>
    );
}


TextareaField.propTypes = {
    onChange: PropTypes.func.isRequired,
};

function SelectField({ id, name, value, options, onChange, placeholder, InputRef, Disabled, ...props }) {
    var classes = useStyles();
    if (value == null || value == undefined)
        value = "";

    const onChangeEvent = (event) => {
        onChange(event);
    };

    return (
        <>
            <NativeSelect
                id={id}
                disableUnderline
                className={classes.selectBaseInput}
                onChange={onChangeEvent}
                name={name}
                value={value}
                inputRef={InputRef}
                inputProps={InputRef}
                input={<Input inputRef={InputRef}
                    disabled={Disabled}
                />

                }
                {...props}
            >
                {
                    placeholder ? (<option value="">{placeholder}</option>) : ('')
                }
                {
                    options.map((option, i) => (
                        <option key={i} value={option.value}>{option.label}</option>
                    ))
                }
            </NativeSelect>
        </>
    );
}


SelectField.propTypes = {
    onChange: PropTypes.func.isRequired,
};
function CustomSelectField({ id, name, value, options, onChange, placeholder, ...props }) {
    var classes = useStyles();

    const onChangeEvent = (event) => {
        onChange(event);
    };

    return (
        <>
            <Select
                id={id}
                disableUnderline
                displayEmpty
                className={classes.custmBaseInput}
                onChange={onChangeEvent}
                name={name}
                value={value}
                {...props}
            >
                {
                    placeholder ? (<option value="">{placeholder}</option>) : ('')
                }
                {
                    options.map((option) => (
                        <MenuItem value={option.value}>
                            <span
                                style={{ width: "18px", float: "left", height: "18px", margin: "0px 5px", backgroundColor: option.label == "None" ? "" : option.label }}>
                                {" "}</span >
                            <span style={{ float: "left" }}>
                                {option.label}</span >
                        </MenuItem>
                        // <option value={option.value}>
                        //     <Avatar variant="square" 
                        //         style={{width:"10%",height:"25px",margin:"7px 5px" 
                        //         ,backgroundColor:option.label}}>
                        //         {" "}
                        //     </Avatar>
                        //     {option.label}
                        // </option>
                    ))
                }
            </Select>
        </>
    );
}


CustomSelectField.propTypes = {
    onChange: PropTypes.func.isRequired,
};
function MultiSelectField({ id, name, Value, options, onChange, placeholder, isDisableClearable, ...props }) {
    var classes = useStyles();
    const [defvalue, setDefaultValues] = useState([]);
    const onChangeEvent = (selected) => {
        if (selected != null) {
            let selectedvalues = selected.map((sel) => {
                return sel.value;
            })
            onChange(name, selectedvalues);
        }
    };
    //Get default set option
    const getSelectedItem = () => {
        let defaultvalues = [];
        const item = options.map((opt) => {
            if (Value != null || Value != undefined) {
                Value.map((selval) => {
                    if (opt.value === selval) {
                        defaultvalues.push(opt);
                    }
                })
                setDefaultValues(defaultvalues);
            }
        }); setDefaultValues(defaultvalues);
        return item || {};
    }
    //Get default selected value when options or values provided are changed
    useEffect(() => {
        getSelectedItem();
    }, [Value, options])

    return (
        <>
            <Autocomplete
                disableClearable={isDisableClearable}
                multiple
                limitTags={2}
                size="small"
                value={defvalue}
                disableCloseOnSelect
                id="tags-standard"
                classes={{ inputRoot: classes.baseInputAutocomplete }}
                onChange={(event, values) => onChangeEvent(values)}
                name={name}
                options={options}
                getOptionLabel={(option) => option.label}
                defaultValue={defvalue}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        fullWidth
                        placeholder={placeholder}
                    // className={classes.baseTextarea}
                    // label="Multiple values"
                    />
                )}
            />
        </>
    );
}


MultiSelectField.propTypes = {
    onChange: PropTypes.func.isRequired
};
function CheckboxField({ id, name, checked, label, labelPlacement, value, color, onChange, IsDisabled, ...props }) {
    var classes = useStyles();

    const onChangeEvent = (event) => {
        if (onChange)
            onChange(event);
    };

    return (
        <>
            <FormControlLabel
                control={
                    <Checkbox
                        disabled={IsDisabled}
                        color={color}
                        className={classes.checkBoxBtn}
                        onChange={onChangeEvent}
                        name={name}
                        id={id}
                        checked={checked}
                        value={value}
                        {...props}

                    />
                }
                label={label}
                labelPlacement={labelPlacement}
            />

        </>
    );
}


CheckboxField.propTypes = {
    onChange: PropTypes.func.isRequired,
};
function RadioboxField({ id, name, value, options, labelPlacement, onChange, ...props }) {
    var classes = useStyles();

    const onChangeEvent = (event) => {
        onChange(event);
    };

    return (
        <>
            <RadioGroup
                aria-label={id}
                className={classes.radioBtn}
                name={name}
                value={value}

                row
                onChange={onChangeEvent}
                {...props}
            >
                {options.map((option, i) => (
                    <FormControlLabel key={i} labelPlacement={labelPlacement} value={option.value} control={<Radio color="primary" />} label={option.label} disabled={props.Disabled == undefined ? false : props.Disabled} />
                ))}
            </RadioGroup>
        </>
    );
}


RadioboxField.propTypes = {
    onChange: PropTypes.func.isRequired,
};

function SwitchBoxField({ id, name, label, checked, value, onChange, disabled, classes, ...props }) {
    var classes = useStyles();

    const handleChange = (event) => {
        if (onChange) {
            onChange(event);
        }
    };
    return (
        <FormControlLabel
            control={
                <Switch
                    focusVisibleClassName={classes.focusVisible}
                    disableRipple
                    classes={{
                        root: classes.root,
                        switchBase: classes.switchBase,
                        thumb: classes.thumb,
                        track: classes.track,
                        checked: classes.checked,
                    }}
                    className={classes.switchBtn}
                    name={name}
                    id={id}
                    disabled={disabled}
                    checked={checked ? true : false}
                    onChange={handleChange}
                    {...props}
                />
            }
            label={label}
        />
    )
}
export { InputBaseField, InputBaseAdornmentField, InputBaseFieldNumber, CheckboxField, TextareaField, SelectField, CustomSelectField, MultiSelectField, RadioboxField, InputPaymentField, SwitchBoxField };

