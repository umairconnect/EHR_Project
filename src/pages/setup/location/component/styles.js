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
    labelAlign: {
        justifyContent: "flex-end",
        [theme.breakpoints.down("xs")]: {
            justifyContent: "flex-start",
        },
    },
    formGroup: {
        flexDirection: "row",
        [theme.breakpoints.down("xl")]: {
            minWidth: "345px",
            maxWidth: "345px",
        },
        [theme.breakpoints.down("lg")]: {
            minWidth: "225px",
            maxWidth: "225px",
        },
        [theme.breakpoints.down("md")]: {

            minWidth: "170px",
            maxWidth: "170px",
        },
        [theme.breakpoints.down("sm")]: {
            width: "100%",
            minWidth: "initial",
            maxWidth: "initial",
        },
        [theme.breakpoints.down("xs")]: {
            width: "100%",
            minWidth: "initial",
            maxWidth: "initial",
        },


    },
    mandatorColor: {
        color: "#ff0000"
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
    hideValidateMsg: {
        backgroundColor: 'green',

    },
    resetBtn: {
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
    footerBtn: {
        padding: " 0px 0 7px",
        position: "fixed",
        bottom: "0px",
        // backgroundColor: "#f3f3f3",
        width: "82%",
        // justifyContent: "center",
        // alignItems:" center",
        // paddingLeft:"13.6%",
        display: "flex",
        zIndex: 3
    },
    ResponsivelabelAlign: {
        justifyContent: "flex-start",
        padding: "0px 0px 0px 50px",
        textAlign: "right",
        [theme.breakpoints.down("xs")]: {
            padding: "0px 0px 20px 50px",
            justifyContent: "flex-start",
        },
    },
    citybaseInput: {
        border: "1px solid #DDDDDD",
        borderRadius: "4px",
        padding: " 3px 12px",
        width: "100%",
        fontFamily: "Lato",
        backgroundColor: "white",
        marginBottom: 15,
        fontSize: "14px",
    },
    CitylableInput: {
        lineHeight: "40px",
        paddingRight: 13,
        margin: "0px 0px 15px 0px",
        fontFamily: "Lato",
        color: "#25282B",
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
    },
    officeTimingLabel: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: 'bold',
        fontSize: '14px',
        lineHeight: "41px",
        color: "#25282B",
    },
    officeTimeDeleteIcon: {
        width: "18px",
        height: "18px",
        margin: "10px",
        cursor: "pointer",
    },
    addOfficeTimeLabel: {
        cursor: "pointer",
        color: "#00B4E5",
        lineHeight: "40px",
        minWidth: "150px",
        fontSize: "14px",
        "& img": {
            width: "20px",
            height: "20px",
            margin: "0 5px 3px 0",
        }
    },
}));

