import {
    makeStyles
} from "@material-ui/styles";

export default makeStyles(theme => ({
    gridRelative: {
        position: "relative"
    },
    inputFile: {
        display: "none",
    },
    uploadImageLabel: {
        position: "absolute",
        display: "block",
        right: "15%",
        cursor: "pointer"
    },
    uploadImageIcon: {
        position: "absolute",
        bottom: "7px",
        left: "35px",
        right: "auto",
        fontSize: 24,
        color: "#00b2e3",
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

    footerBtn: {
        padding: "10px 0px 25px 0px",
        // padding: " 0px 0 7px",
        // position: "fixed",
        // bottom: "0px",
        // width: "82%",
        // paddingLeft: "13.1%",
        // display: "flex",
        // zIndex: 3,
        [theme.breakpoints.down("sm")]: {
            paddingLeft: 0
        },
    },
    ResponsivelabelAlign: {
        alignItems: "flex-end",
        [theme.breakpoints.down("xs")]: {
            padding: "0px 0px 20px 50px",
            justifyContent: "flex-start",
        },
    },

    shadowBoxWidth: {
        flexGrow: 1,

    },
    formAlignment: {
        marginBottom: "-30px"
    },
    labelAlign: {
        justifyContent: "flex-end",
        [theme.breakpoints.down("xs")]: {
            justifyContent: "flex-start",
        },
    },
    cityLableInput: {
        paddingRight: 15,
        fontFamily: "Lato",
        color: "#25282B",
        fontSize: 14,
        marginBottom: 13,
        paddingTop: "10%",
        minHeight: "40px",
        textAlign: "right"
    },
    stateLableInput: {
        paddingRight: 15,
        fontFamily: "Lato",
        color: "#25282B",
        fontSize: 14,
        marginBottom: 13,
        paddingTop: "10%",
        minHeight: "40px",
        textAlign: "right"
    },
    Btn1: {
        backgroundColor: '#11284b',
        textTransform: 'none',
        borderColor: '#11284b',
        color: 'white',
        marginRight: 8,
        minWidth: 90,
        padding: "6px 16px",
        fontFamily: "Lato",
        height: "35.63px",
        marginLeft: "15px",
        '&:hover': {
            backgroundColor: '#596270',
            borderColor: '#11284b',
            color: 'white',
        },
        "&:disabled": {
            backgroundColor: '#596270',
            borderColor: '#11284b',
            color: 'white',
        }
    },
    Btn: {
        borderRadius: "8px",
        border: "1px solid #11284B",
        margin: "0px 0px 0px 10px",
        color: "#11284B",
        backgroundColor: "#F9F9F9",
        boxSizing: "border-box",
        fontSize: 15,
        fontFamily: "Lato",
        textTransform: "none",
        padding: "6px 16px",
        height: "35.63px",
        position: "relative",
        '& a svg': {
            float: "left",
            marginRight: 5,
        },
        '&:hover': {
            backgroundColor: "#11284b",
            color: "white",
            '& a': {
                color: "white",
            },
        },
    },

    refBtn: {
        borderRadius: "5px",
        border: "1px solid #11284B",
        margin: "0px 0px 0px 10px",
        color: "white",
        backgroundColor: "#11284b",
        boxSizing: "border-box",
        fontSize: 15,
        fontFamily: "Lato",
        textTransform: "none",
        padding: "3px 16px",
        position: "relative",
        '& a svg': {
            float: "left",
            marginRight: 5,
        },
        '&:hover': {
            backgroundColor: "#11284b",
            color: "white",
            '& a': {
                color: "white",
            },
        },
    },
}));
