import {
    makeStyles
} from "@material-ui/styles";

export default makeStyles(theme => ({
    pageTitleContent: {
        textAlign: "center",
        marginTop: "10%"
    },
    formTitle: {
        position: 'relative',
        width: "100%",
        color: "#25282B",
        fontSize: 15,
        marginBottom: 20,
    },
    baseLine: {
        content: '',
        position: 'absolute',
        left: 100,
        right: 0,
        top: 14,
        height: 1,
        backgroundColor: "#DDDDDD",
    },
    baseInput: {
        border: "1px solid #DDDDDD",
        borderRadius: "4px",
        padding: " 3px 12px",
        width: "100%",
        fontFamily: "Lato",
        backgroundColor: "white",
        marginBottom: 4,
    },
    lableInput: {
        lineHeight: "40px",
        paddingRight: 15,
        fontFamily: "Lato",
        color: "#25282B",
        fontSize: 14,
        marginBottom: 13,
        [theme.breakpoints.down("sm")]: {
            lineHeight: "25px",
            paddingRight: 5,
        },
        [theme.breakpoints.down("md")]: {
            lineHeight: "25px",
            paddingRight: 5,
        },
    },
    lableText: {
        lineHeight: "40px",
        paddingRight: 15,
        fontFamily: "Lato",
        color: "#828282",
        fontSize: 12,
        marginBottom: 20,
    },
    lableTextarea: {
        lineHeight: "25px",
        paddingRight: 15,
        fontFamily: "Lato",
        color: "#25282B",
        fontSize: 14,
        marginBottom: 20,
    },
    baseTextarea: {
        border: "1px solid #DDDDDD",
        borderRadius: "4px",
        padding: " 5px 12px",
        width: "100%",
        fontFamily: "Lato",
        resize: "none",
        marginBottom: 20,
        '&:focus': {
            border: "1px solid #DDDDDD",
        },
    },

    staffImage: {
        width: "140px",
        height: "120px"
    },

    resetBtn: {
        textTransform: 'none',
        backgroundColor: '#DDDDDD',
        borderColor: '#F3F3F3',
        color: '#11284b',
        marginRight: 8,
        minWidth: 90,
        '&:hover': {
            backgroundColor: '#596270',
            borderColor: '#11284b',
            color: 'white',
        },
    },
    updateBtn: {
        textTransform: 'none',
        backgroundColor: '#11284b',
        borderColor: '#11284b',
        color: 'white',
        marginRight: 8,
        minWidth: 90,
        '&:hover': {
            backgroundColor: '#596270',
            borderColor: '#11284b',
            color: 'white',
        },
    },

    saveBtn: {
        textTransform: 'none',
        backgroundColor: '#11284b',
        borderColor: '#11284b',
        color: 'white',
        marginRight: 8,
        minWidth: 90,
        '&:hover': {
            backgroundColor: '#596270',
            borderColor: '#11284b',
            color: 'white',
        },
    },

    deleteBtn: {
        textTransform: 'none',
        backgroundColor: '#dd3232',
        borderColor: '#dd3232',
        color: 'white',
        marginRight: 8,
        minWidth: 90,
        '&:hover': {
            backgroundColor: '#596270',
            borderColor: '#11284b',
            color: 'white',
        },

    },

    mandatoryColor: {
        color: "#ff0000"
    },

    /*CSS for staff photo*/
    inputFile: {
        display: "none",
    },
    uploadImageLabel: {
        position: "relative",
        display: "block",
        maxHeight: 90,
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
    footerBtn: {
        padding: " 0px 0 7px",
        position: "fixed",
        bottom: "0px",
        // backgroundColor: "#f3f3f3",
        width: "82%",
        // justifyContent: "center",
        // alignItems:" center",
        // paddingLeft:"11.4%",
        display: "flex",
        zIndex: 3
    },
    labelAlign: {
        justifyContent: "flex-end",
        [theme.breakpoints.down("xs")]: {
            justifyContent: "flex-start",
        },
    },
    ResponsivelabelAlign: {
        justifyContent: "flex-end",
        padding: "0px 0px 0px 50px",
        [theme.breakpoints.down("xs")]: {
            padding: "0px 0px 20px 50px",
            justifyContent: "flex-start",
        },
    },
    citybaseInput: {
        border: "1px solid #DDDDDD",
        borderRadius: "4px",
        // padding: " 3px 12px",
        width: "100%",
        fontFamily: "Lato",
        backgroundColor: "white",
        fontSize: "14px",
        marginBottom: 15,
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
    CitylableInput: {
        lineHeight: "40px",
        paddingRight: 13,
        margin: "0px 0px 15px 0px",
        fontFamily: "Lato",
        color: "#25282B",
        textAlign: "right",
        fontSize: 14,
        // marginBottom: 13,
        [theme.breakpoints.down("sm")]: {
            lineHeight: "25px",
            margin: "0px 0px 30px 0px",
            textAlign: "end",
            paddingRight: 5,
        },
        [theme.breakpoints.down("md")]: {
            lineHeight: "25px",
            textAlign: "end",
            margin: "0px 0px 30px 0px",
            paddingRight: 5,
        },
    },
    stateLabelInput: {
        lineHeight: "40px",
        paddingRight: 15,
        fontFamily: "Lato",
        color: "#25282B",
        fontSize: 14,
        marginBottom: 10,
        textAlign: "right",
        [theme.breakpoints.down("sm")]: {
            lineHeight: "25px",
            textAlign: "end",
            paddingRight: 5,
        },
        [theme.breakpoints.down("md")]: {
            lineHeight: "25px",
            textAlign: "end",
            paddingRight: 5,
        },
    }
    //------------------

}));
