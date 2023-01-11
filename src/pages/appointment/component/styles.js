import {
    makeStyles
} from "@material-ui/styles";

export default makeStyles(theme => ({
    inputFile: {
        display: "none",
    },
    uploadImageLabel: {
        position: "relative",
        display: "block"
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
    lableInput2: {
        lineHeight: "40px",
        paddingRight: 15,
        fontFamily: "Lato",
        color: "#25282B",
        fontSize: 14,
        // marginBottom: 13,
        [theme.breakpoints.down("sm")]: {
            lineHeight: "25px",
            paddingRight: 5,
        },
        [theme.breakpoints.down("md")]: {
            lineHeight: "25px",
            paddingRight: 5,
        },
    },
    lableInputMuti: {
        lineHeight: "40px",
        paddingRight: 15,
        fontFamily: "Lato",
        color: "#25282B",
        fontSize: 14,
        marginBottom: -23,
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
        alignItems: 'baseline',
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
        marginBottom: "6px",
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
    hideLabel: {
        display: 'none'
    },
    lableInputMutiLabel: {
        lineHeight: "40px",
        paddingRight: 9,
        fontFamily: "Lato",
        color: "#25282B",
        fontSize: 14,
        marginBottom: -23,
    },
    adjustLabels: {
        marginRight: "0px !important",
    },
    dayBox: {
        display: "flex",
        flexDirection: "row",
        "& .MuiFormControlLabel-root": {
            flex: "1 0",
            marginRight: 0
        }
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
    colorSelectConrol: {
        height: "40px",
        display: "-webkit-box",
        border: "1px solid #DDDDDD",
        borderRadius: "4px",
        backgroundColor: "white",
    },
    MuiSelectRoot: {
        display: "contents"
    },
    MuiSelectInput: {
        width: "100%", border: "none"
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
    checkBoxgrid: {
        margin: "0px 0px 8px 0px",
        [theme.breakpoints.down("md")]: {
            margin: "0px 0px 30px 0px"
        },
        [theme.breakpoints.down("sm")]: {
            margin: "0px 0px 30px 0px"
        },
    },
    // consentFormList: {
    //     margin: "5px 1px 10px 1px",
    //     padding: "0px",
    //     listStyle: "none",
    //     display: "flex",
    //     flexWrap: "wrap",

    //     "& li": {
    //         outline: 0,
    //         padding: "5px 30px 5px 12px",
    //         position: "relative",
    //         background: "#E8E8E8",
    //         borderRadius: "10px",
    //         minHeight: "24px",
    //         fontStyle: "normal",
    //         fontWeight: 400,
    //         fontSize: "14px",
    //         lineHeight: "17px",
    //         color: "#52575C",
    //         minWidth: "90px",
    //         cursor: "pointer",
    //         margin: "4px 4px 4px 0px",
    //         "& a": {
    //             textDecoration: "none",
    //             color: "#52575C",
    //             "&:hover": {
    //                 textDecoration: "none",

    //             }
    //         }
    //     },
    // },
    // deleteIcon: {
    //     //float: "right",
    //     cursor: "pointer",
    //     right: "-7px",
    //     // top: "0px",
    //     // paddingTop: "5px",
    //     position: "absolute",
    //     //cursor: "pointer",
    //     // color: "red",
    //     paddingTop: 0,
    //     top: "50%",
    //     // left: "50%",
    //     transform: "translate(-50%,-45%)",
    //     "& svg": {
    //         transform: "rotate(45deg)",
    //     },
    // },
    consentFormList: {
        margin: "5px 1px 10px 1px",
        padding: "0px",
        listStyle: "none",
        display: "flex",
        flexWrap: "wrap",
        "& li": {
            color: '#5D8AB5',
            minHeight: "30px",
            outline: 0,
            padding: "5px 12px 5px 12px",
            position: "relative",
            fontSize: "12px",
            background: "#f6f6f6",
            fontWeight: "600",
            border: "1px solid #E1E1E1",
            boxSizing: "border-box",
            boxShadow: "0px 2px 10px rgb(0 0 0 / 10%)",
            borderRadius: "25px",
            // minWidth: "115px",
            margin: "4px 4px 4px 0px",
            display: "flex",
            alignItems: "center",
            "& a": {
                textDecoration: "none",
                color: '#5D8AB5',
                fontSize: "12px",
                "&:hover": {
                    textDecoration: "none",
                    color: '#5D8AB5',
                }
            }
        },
    },
    deleteIcon: {
        cursor: "pointer",
        color: "#FD5F5F",
        position: "relative",
        height: "24px",
        width: "24px",
        paddingTop: 0,
        "& svg": {
            transform: "rotate(45deg)",
        },
    },
    positionR: {
        position: "relative"
    },
    patientAddBtn: {
        position: "absolute",
        top: "-5px",
        right: "-55px"
    },
    dialogPaper: {
        maxWidth: '80%',
    },
    dialogcontent: {
        padding: "16px 24px 10px 24px"
    },
    box: {
        display: "flex",
        flexFlow: "column",
        height: "100%",
    },
    header: {
        flex: "0 1 auto",
        display: "flex",
        cursor: "move",
    },
    content: {
        flex: "1 1 auto",
        minHeight: "200px",
        overflow: "auto",
        marginBottom: "10px"
    },
    crossButton: {
        position: "relative",
        top: "-12px",
        right: "10px",
        cursor: "pointer",
        padding: "3px",
        zIndex: "2",
        display: "block",
        "& :hover": {
            backgroundColor: "#F4F4F4",
        }
    },
}));
