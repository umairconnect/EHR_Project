import {
    makeStyles
} from "@material-ui/styles";

export default makeStyles(theme => ({
    loader: {
        display: "block",
        margin: "0 auto",
        padding: "10% 0",
        width: "50px"
    },
    footerBtn: {
        padding: " 0px 0 7px",
        //position: "fixed",
        bottom: "0px",
        width: "82%",
        display: "flex",
        zIndex: 3,
        paddingLeft: "16.6%",
        [theme.breakpoints.down("sm")]: {
            width: "100%",
            paddingLeft: "16.6%"
        }
    },
    labelAlign: {
        justifyContent: "flex-end",
        [theme.breakpoints.down("xs")]: {
            justifyContent: "flex-start",
        },
    },
    lableInput: {
        paddingRight: 15,
        fontFamily: "Lato",
        color: "#25282B",
        fontSize: 14,
        marginBottom: 13,
        paddingTop: "6%",
        minHeight: "20px",
        textAlign: "right"
    },
    formAlignment: {
        marginBottom: "-15px"
    },
    baseInput: {
        border: "1px solid #DDDDDD",
        borderRadius: "4px",
        // padding: " 3px 12px",
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
                borderRadius: "4px",
                outline: 0,
            },
        },

        "& .Mui-disabled": {
            backgroundColor: "#f3f3f3",
            color: "#4A4A4A"
        },
    },
}));
