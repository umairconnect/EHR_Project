import {
    makeStyles
} from "@material-ui/styles";

export default makeStyles(theme => ({
    gridRelative: {
        position: "relative",
        display: 'flex',
        justifyContent: 'center'
    },
    loader: {
        display: "block",
        margin: "0 auto",
        padding: "10% 0",
        width: "50px"
    },
    footerBtn: {
        padding: " 0px 0 7px",
        position: "fixed",
        bottom: "10px",
        // width: "82%",
        display: "flex",
        zIndex: 3,
        // paddingLeft: "13.1%",
        // [theme.breakpoints.down("sm")]: {
        // paddingLeft: "6%"
        // }
    },
    uploadImageLabel: {
        position: "absolute",
        display: "block",
        // right: "15%",
        cursor: "pointer"
    },
    uploadImageIcon: {
        position: "absolute",
        bottom: "7px",
        left: "35px",
        right: "auto",
        fontSize: 24,
        color: "#00b2e3",
        cursor: "pointer",
    },
    uploadImage: {
        width: 90,
        height: 90,
        borderRadius: "50%",
        border: "1px solid #d9dfdf",
    },
    uploadImageBox: {
        width: 90,
        height: 90,
        borderRadius: "50%",
        border: "1px solid #d9dfdf",
        backgroundColor: "#f3f3f3",
    },
    formAlignment: {
        marginBottom: "-30px"
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
