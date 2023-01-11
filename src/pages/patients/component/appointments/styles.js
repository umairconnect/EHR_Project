import {
    makeStyles
} from "@material-ui/styles";

export default makeStyles(theme => ({
    custmBaseInput: {
        border: "1px solid #DDDDDD",
        borderRadius: "4px",
        width: "100%",
        fontFamily: "Lato",
        backgroundColor: "white",
        background: "#FCFCFC",
        border: "1px solid #E1E1E1",
        boxSizing: "border-box",
        borderRadius: "4px",
        "& img": {
            width: "18px",
            height: "18px",
            float: "left",
            marginRight: "10px"
        },
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
    appointmentTime: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "12px",
        textAlign: "left",
        textTransform: "lowercase"
    },
    startEncounterBtn: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "14px",
        lineHeight: "20px",
        color: "#00B4E5",
        background: "#FFFFFF",
        border: "1px solid #00B4E5",
        boxSizing: "border-box",
        borderRadius: "8px",
        textDecoration: "none",
        textTransform: "none",
        "& a": {
            textDecoration: "none !important",
            color: "#00B4E5 !important",
        }
    },
    startEncounterBtnDisable: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "12px",
        color: "#00B4E5",
        background: "#FFFFFF",
        border: "1px solid #00B4E5",
        boxSizing: "border-box",
        borderRadius: "8px",
        textDecoration: "none",
        padding: '0px',
        textTransform: "none",
        padding: '5px 15px',
        lineHeight: '20px',
    },
}))