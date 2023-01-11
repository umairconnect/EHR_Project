import {
  makeStyles
} from "@material-ui/styles";

export default makeStyles(theme => ({
  baseInput: {
    border: "1px solid #DDDDDD",
    borderRadius: "4px",
    width: "100%",
    fontFamily: "Lato",
    backgroundColor: "white",
    marginBottom: 4,
    // "& .MuiIconButton-root": {
    //   padding: '0 12px'
    // },
    // "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
    //   border: 'none'
    // },
    "& .MuiInputBase-input": {
      padding: "0px 12px",
      minHeight: "35.63px",
      fontSize: "14px",
      color: "#4A4A4A",
      '&:focus': {
        border: "1px solid #00b2e3",
        borderRadius: "4px",
        outline: 0,
      },
    },
    "& .MuiInputBase-root": {
      '&:hover': {
        border: 'none',
        border: "1px solid #00b2e3",
        borderRadius: "4px",
        outline: 0,
      },
    },
    "& .Mui-disabled": {
      backgroundColor: "#f3f3f3",
      color: "#4A4A4A"
    },
    "& input::-webkit-outer-spin-button": {
      appearance: "none",
      margin: 0
    },
    "& input::-webkit-inner-spin-button": {
      appearance: "none",
      margin: 0
    },
    "& input[type=number]": {
      appearance: "textfield"
    },
    "& .MuiFormHelperText-root.Mui-error": {
      display: "none",
      "&:after": {
        border: 'none'
      }
    },
    "& .MuiInput-underline:before": {
      border: 'none'
    },
    "& .MuiInput-underline.Mui-error:after": {
      transform: 'none',
      border: "none",
    }
  },
  datePicker: {
    border: "1px solid #DDDDDD",
    borderRadius: "4px",
    width: "100%",
    fontFamily: "Lato",
    backgroundColor: "white",
    marginBottom: 4,
    "& .MuiIconButton-root": {
      padding: '0 12px'
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      border: 'none'
    },
    "& .MuiInputBase-input": {
      padding: "0px 12px",
      minHeight: "35.63px",
      fontSize: "14px",
      color: "#4A4A4A",
      // '&:focus': {
      // border: "1px solid #00b2e3",
      // borderRadius: "4px",
      // outline: 0,
      // },
    },
    "& .MuiInputBase-root": {
      '&:hover': {
        border: 'none',
        // border: "1px solid #00b2e3",
        // borderRadius: "4px",
        outline: 'none'
      },
    },
    "& .Mui-disabled": {
      backgroundColor: "#f3f3f3",
      color: "#4A4A4A"
    },
    "& input::-webkit-outer-spin-button": {
      appearance: "none",
      margin: 0
    },
    "& input::-webkit-inner-spin-button": {
      appearance: "none",
      margin: 0
    },
    "& input[type=number]": {
      appearance: "textfield"
    },
    "& .MuiFormHelperText-root.Mui-error": {
      display: "none",
      "&:after": {
        border: 'none'
      }
    },
    "& .MuiInput-underline:before": {
      border: 'none'
    },
    "& .MuiInput-underline.Mui-error:after": {
      transform: 'none',
      border: "none",
    }
  },
  dateInput: {
    borderRadius: "4px",
    width: "100%",
    height: "37.63px",
    color: "#52575C",
    fontSize: 14,
    padding: "0 12px",
    lineHeight: "21px",
    textAlign: "left",
    border: 'none',
    outline: 'none',
    fontFamily: "Lato",
    backgroundColor: "white",
    border: "1px solid #DDDDDD",
  },
  selectBaseInput: {
    border: "1px solid #DDDDDD",
    borderRadius: "4px",
    width: "100%",
    fontFamily: "Lato",
    backgroundColor: "white",
    marginBottom: 4,
    "& .MuiInputBase-input": {
      padding: "0px 24px 0px 12px",
      minHeight: "35.63px",
      fontSize: "14px",
      color: "#4A4A4A",
      '&:focus': {
        border: "1px solid #00b2e3",
        borderRadius: "4px",
        outline: 0,
      },
    },

    "& .Mui-disabled": {
      backgroundColor: "#f3f3f3",
      color: "#4A4A4A"
    },
    "& input::-webkit-outer-spin-button": {
      appearance: "none",
      margin: 0
    },
    "& input::-webkit-inner-spin-button": {
      appearance: "none",
      margin: 0
    },
    "& input[type=number]": {
      appearance: "textfield"
    },
  },

  custmBaseInput: {
    border: "1px solid #DDDDDD",
    borderRadius: "4px",
    width: "100%",
    fontFamily: "Lato",
    backgroundColor: "white",
    marginBottom: 4,
    "& .MuiInputBase-input": {
      padding: "9.5px 12px",

      fontSize: "14px",
      color: "#4A4A4A",
      '&:focus': {
        border: "1px solid #00b2e3",
        outline: 0,
      },
    },
    "& .Mui-disabled": {
      backgroundColor: "#f3f3f3",
      color: "#4A4A4A"
    },
  },
  baseTextarea: {
    border: "1px solid #DDDDDD",
    borderRadius: "4px",
    padding: " 5px 12px",
    width: "100%",
    fontFamily: "Lato",
    resize: "none",
    marginBottom: 6,
    maxHeight: "92px",
    overflowY: "auto!important",
    '&:focus': {
      border: "1px solid #00b2e3",
      outline: 0,
    },
    "& .Mui-disabled": {
      backgroundColor: "#f3f3f3",
      color: "#4A4A4A"
    },
    "& ::placeholder": {
      color: "#B9B9B9",
    }
  },
  radioBtn: {

    "& .MuiFormControlLabel-label": {
      color: "#52575C",
      fontSize: "13px"
    },
    "& label": {
      marginRight: "10px"
    },
    "& .MuiButtonBase-root": {
      marginLeft: 0,
      paddingRight: "5px",
    }
  },
  checkBoxBtn: {
    marginLeft: "0px",
    paddingRight: "5px",
    "& + .MuiFormControlLabel-label": {
      color: "#52575C",
      fontSize: "13px"
    },
  },
  InputBaseAutocomplete: {
    // border: "1px solid #DDDDDD",
    borderRadius: "4px",
    width: "100%",
    fontFamily: "Lato",
    backgroundColor: "white",
    marginBottom: 4,
    "& .MuiInputBase-input": {
      padding: "9.5px 12px",
      fontSize: "14px",
      color: "#4A4A4A",
    },
    "& .Mui-disabled": {
      backgroundColor: "#f3f3f3",
      color: "#4A4A4A"
    },
  },
  baseInputAutocomplete: {
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "1px solid #00b2e3",
      borderRadius: "4px",
      outline: 0,
    },
    "& input": {
      fontSize: "14px",
    },
    "& input:focus + ::placeholder": {
      opacity: 0,
    }

  },
  adornmentBaseInput: {
    border: "1px solid #DDDDDD",
    borderRadius: "4px",
    width: "100%",
    fontFamily: "Lato",
    backgroundColor: "white",
    marginBottom: 4,
    paddingLeft: 38,
    "& + .MuiInputBase-adornedStart": {
      border: "1px solid #00b2e3",
    },
    "& .MuiInputBase-input": {
      padding: "0px 12px",
      minHeight: "35.63px",
      fontSize: "14px",
      color: "#4A4A4A",
      '&:focus': {
        border: "none",
        borderRadius: "0px",
        outline: 0,
      },
    },
    "& .Mui-disabled": {
      backgroundColor: "#f3f3f3",
      color: "#4A4A4A"
    },
    "& input::-webkit-outer-spin-button": {
      appearance: "none",
      margin: 0
    },
    "& input::-webkit-inner-spin-button": {
      appearance: "none",
      margin: 0
    },
    "& input[type=number]": {
      appearance: "textfield"
    },
    "& .MuiInputAdornment-root": {
      background: "#E0E0E0",
      width: "40px",
      height: "35.63px",
      maxHeight: "35.63px",
      margin: "0px",
      position: "absolute",
      left: "-0.5px",
      top: 0,
      bottom: "-1px",
      borderRadius: 3,
      textAlign: "center",
      justifyContent: "center",
      "& p": {
        width: "100%",
        color: "#52575C",
        fontSize: "14px",
        fontWeight: "normal"
      }
    },
  },
  adornmentBaseInputFocused: {
    border: "1px solid #00b2e3",
  },
  InputNumber: {
    width: "100% !important",
    border: "none !important",
    borderRadius: "4px !important",
    boxShadow: "none !important",
    "&:focus": {
      border: "none",
      boxShadow: "none",
    },
    "&:focused": {
      border: "none",
      boxShadow: "none",
    },
    "&:hover": {
      border: "none",
      boxShadow: "none",
    },
    "&:disabled": {
      borderRadius: "4px !important",
    },
    "& .ant-input-number-disabled": {
      borderRadius: "4px !important"
    },
    "& .ant-input-number-input-wrap": {

      "& input": {
        textAlign: "right",
        width: "100%",
        padding: "0px 12px",
        minHeight: "35.63px",
        minHeight: "35.63px",
        fontSize: "14px",
        color: "#4A4A4A",
        border: "1px solid #DDDDDD",
        borderRadius: "4px",
        width: "100%",
        fontFamily: "Lato",
        backgroundColor: "white",
        // marginBottom: 4,
        '&:focus': {
          //textAlign: "left !important",
          width: "100%",
          border: "1px solid #00b2e3",
          borderRadius: "4px",
          outline: 0,
          boxShadow: "none",
        },
        "&:disabled": {
          width: "100%",
          outline: 0,
          color: "rgba(0, 0, 0, 0.25)",
          backgroundColor: "#f5f5f5",
          borderColor: "#d9d9d9",
          boxShadow: "none",
        }
      }
    },
    "& .ant-input-number-handler-wrap": {
      display: "none"
    }
  },
  switchBtn: {
    "& + .MuiTypography-root": {
      // fontFamily: "Lato",
      fontWeight: "normal",
      color: "#52575C",
      fontSize: "14px",
      margin: "0px 0px 0px 8px"
    }
  },
  root: {
    width: 47,
    height: 22,
    padding: 0,
    zIndex: 1000,
    // left:85,
    // marginTop: 14,
    // margin: "14px 10px 0px 0px"
    margin: "0px",
    "& Mui-disabled": {
      color: '#bdbdbd !important',
    },
    "& .MuiSwitch-switchBase.Mui-disabled + .MuiSwitch-track": {
      opacity: 0.12
    },
    "& .MuiSwitch-colorSecondary.Mui-disabled + .MuiSwitch-track": {
      backgroundColor: "#000"
    },
    "& .MuiSwitch-colorSecondary.Mui-disabled": {
      color: '#bdbdbd'
    },
  },
  switchBase: {
    padding: 1,
    zIndex: 1000,
    transform: 'translateX(-8px)',
    '&$checked': {
      transform: 'translateX(16px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: '#00B2E3',
        opacity: 1,
        border: 'none',
      },
      "&:disabled": {
        color: '#bdbdbd !important',
      }
    },
    '&$focusVisible $thumb': {
      color: '#52d869',
      border: '6px solid #fff',
    },
    "&:disabled": {
      color: '#bdbdbd !important',
    }
  },
  thumb: {
    width: 19,
    height: 19,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: "#C4C4C4",
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
    "&:disabled": {
      backgroundColor: '#000 !important',
      opacity: "0.12 !important",

    }
  },
  checked: {},
  focusVisible: {},
}));
