import {
    makeStyles
  } from "@material-ui/styles";
  
  export default makeStyles(theme => ({
    searchPanel: {
      maxWidth: "100%",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      // marginLeft:"10px",
      position: "relative"
    },
    InputBaseAutocomplete: {
      border: "1px solid #DDDDDD",
      borderRadius: "4px",
      width: "100%",
      fontFamily: "Lato",
      backgroundColor: "white",
      marginBottom: 4,
      '&:focus': {
        border: "1px solid #00b2e3",
        borderRadius: "4px",
        outline: 0,
      },
      "& .MuiInputBase-root": {
        padding: "3px 5px 3px 12px",
        // padding: "9.5px 12px",
        borderRadius: "5px",
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
    },
    InputBaseAutocompleteMandatory: {
      // border: "1px solid #DDDDDD",
      border: "1px solid red",
      borderRadius: "4px",
      width: "100%",
      fontFamily: "Lato",
      backgroundColor: "white",
      '&:focus': {
        border: "1px solid #00b2e3",
        borderRadius: "4px",
        outline: 0,
      },
      "& .MuiInputBase-root": {
        padding: "3px 5px 3px 12px",
        // padding: "9.5px 12px",
        borderRadius: "5px",
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
    },
    baseInputAutocomplete: {
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        padding: "9.5px 12px",
        border: "1px solid #00b2e3",
        borderRadius: "4px",
        outline: 0,
      }
    },
    closeIcon: {
      cursor: "pointer",
    },
    autoCompleteBox: {
      width: "100%",
      borderBottom: "1px solid #DDDDDD",
      '&::-webkit-scrollbar': {
        width: "5px",
      },
      '&::-webkit-scrollbar-track': {
        background: "#f1f1f1",
        // boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
        // webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
      },
      '&::-webkit-scrollbar-thumb': {
        background: "#888",
        // backgroundColor: 'rgba(0,0,0,.1)',
        // outline: '1px solid slategrey'
      },
      '&::-webkit-scrollbar-thumb:hover': {
        background: "#555",
        // backgroundColor: 'rgba(0,0,0,.1)',
        // outline: '1px solid slategrey'
      }
    },
    autoCompleteGrid: {
      marginBottom: "5px",
      // marginBottom:"10px",
      '&::-webkit-scrollbar': {
        width: "5px",
      },
      '&::-webkit-scrollbar-track': {
        background: "#f1f1f1",
        // boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
        // webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
      },
      '&::-webkit-scrollbar-thumb': {
        background: "#888",
        // backgroundColor: 'rgba(0,0,0,.1)',
        // outline: '1px solid slategrey'
      },
      '&::-webkit-scrollbar-thumb:hover': {
        background: "#555",
        // backgroundColor: 'rgba(0,0,0,.1)',
        // outline: '1px solid slategrey'
      }
    },
    NameTypography: {
      textTransform: "capitalize",
      fontWeight: "normal",
      fontSize: "14px",
      color: "#4A4A4A",
      fontFamily: "Lato",
      [theme.breakpoints.down("sm")]: {
        alignItems: "center"
      },
    },
    listItem: {
      width: "100%",
      borderBottom: "1px solid #DDDDDD",
    }
  }));
  