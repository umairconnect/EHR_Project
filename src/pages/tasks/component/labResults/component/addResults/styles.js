import { red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
    dialogPaper: {
        minWidth: "60%",
        minHeight: "78%",
        maxWidth: '70%',
    },
    dialogcontent: {
        padding: "0px",
        height: "100%"
    },
    mainContent: {
        padding: "0px 25px 10px 25px"
    },
    btnSpan: {
        display: "flex",
        width: "100%"
    },
    attachmentBtn: {
        position: "relative",
        padding: "8px",
        right: "35px",
    },
    testList: {
        width: "100%",
        listStyle: "none",
        padding: "0px",
        // borderCollapse:"separate",
        // borderSpacing:"0px 5px",
        margin: "0px",
        "& li": {
            height: "35px",
            padding: "5px 5px 10px 5px",
            display: "inline-flex",
            borderRadius: "5px",
            margin: "5px",
            backgroundColor: "#f6f6f6",
        }
    },
    observationList: {
        width: "100%",
        listStyle: "none",
        padding: "0px",
        // borderCollapse:"separate",
        // borderSpacing:"0px 5px",
        // margin: "0px 20px",
        margin: "20px 0px -10px",
        "& li": {
            height: "35px",
            // padding: "5px 5px 10px 5px",
            display: "inline-flex",
            borderRadius: "5px",
            margin: "5px 0px",
            // backgroundColor: "#f6f6f6",
        }
    },

    orderList: {
        margin: "5px 1px 10px 1px",
        padding: "0px",
        listStyle: "none",
        display: "flex",
        flexWrap: "wrap",
        "& li": {
            color: '#000000',
            // height: "35px",
            minHeight: "30px",
            outline: 0,
            // padding: "0 12px 0 12px",
            padding: "5px 22px 5px 22px",
            position: "relative",
            display: "flex",
            alignItems: "center",
            fontSize: "12px",
            background: "#f6f6f6",
            fontWeight: "600",
            border: "1px solid #E1E1E1",
            boxSizing: "border-box",
            boxShadow: "0px 2px 10px rgb(0 0 0 / 10%)",
            borderRadius: "25px",
            minWidth: "115px",
            // maxWidth: "220px",
            // width: "120px",
            margin: "0px 4px 8px 0px",
            "& span": {
                position: "relative",
                top: "2px",
                left: "5px",
            }
        },
    },
    attachmentDeleteBtn: {
        cursor: "pointer",
        color: "#d11a2a",
        transform: "rotate(45deg)",
    },
    tableArea: {
        width: "100%",
        background: "#FFFFFF",
        boxSizing: "border-box",
        // border: "1px solid #E0E0E0",
        // marginBottom: "10px"
    },
    tableLabel: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "14px",
        color: "#25282B",
        marginLeft: "10px"
    },
    tableHead: {
        width: "100%",
        backgroundColor: "#E0E0E0",
        display: "flex",
        height: "30px",
        padding: "5px",
        justifyContent: "space-evenly"
    },
    tableBody: {
        width: "100%",
        display: "flex",
        padding: "5px",
        justifyContent: "space-evenly"
    },
    diagnosisLabel: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "14px",
        lineHeight: "25px"
    },
    addNewButton: {
        // padding: "10px 10px 10px 0px",
        padding: "0px",
        background: "#FFFFFF",
        backgroundColor: "#FFFFFF",
        textTransform: "none",
        boxShadow: "none",
        color: "#00B4E5",
        fontSize: "13px",
        fontStyle: "normal",
        fontWeight: "normal",
        "&:hover": {
            background: "#FFFFFF",
            backgroundColor: "#FFFFFF",
            boxShadow: "none",
            color: "#00B4E5",
        },
        "& .MuiButton-startIcon": {
            marginRight: "2px"
        }
    },
    addNewRecordButton: {
        padding: "1px ​0px 0px 20px",
        background: "#FFFFFF",
        backgroundColor: "#FFFFFF",
        textTransform: "none",
        boxShadow: "none",
        color: "#00B4E5",
        fontSize: "13px",
        fontStyle: "normal",
        fontWeight: "normal",
        "&:hover": {
            background: "#FFFFFF",
            backgroundColor: "#FFFFFF",
            boxShadow: "none",
            color: "#00B4E5",
        },
        "& .MuiButton-startIcon": {
            marginRight: "2px"
        }
    },
    signedIcon: {
        padding: "12px 0px 12px 20px"
    },
    crossButton: {
        position: "absolute",
        top: "8px",
        right: "50px",
        cursor: "pointer",
        padding: "3px",
        zIndex: "2",
        display: "block",
        "& :hover": {
            backgroundColor: "#F4F4F4",
        }
    },
    footerBtn: {
        padding: " 0px 0 7px",
        bottom: "0px",
        position: "relative",
        float: "right",
        display: "flex",
        zIndex: 3
    },
    deleteButton: {
        padding: "10px 10px 10px 0px",
        background: "#FFFFFF",
        backgroundColor: "#FFFFFF",
        textTransform: "none",
        boxShadow: "none",
        color: "red",
        fontSize: "13px",
        fontStyle: "normal",
        fontWeight: "normal",
        "&:hover": {
            background: "#FFFFFF",
            backgroundColor: "#FFFFFF",
            boxShadow: "none",
            color: "red",
        },
        "& .MuiButton-endIcon": {
            marginRight: "2px",
            width: 15,
            height: 15,
        },
    },
    diagnosesList: {
        display: "block",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "14px",
        color: "#52575C",
    },
    manadaotryObservationInput: {
        border: "1px solid red"
    },
    normalObservationInput: {
        border: "1px solid red"
    },
    expandAccord: {
        padding: "0px 5px 0px 0px",
        marginLeft: "-20px",
        marginTop: "-10px",
        minHeight: "10px !important"
    },
    labAccordDetails: {
        display: "block",
        borderBottom: "1px solid #E0E0E0",
    },
    tableBorder: {
        border: "1px solid #E0E0E0",
    },
    labAccordion: {
        boxShadow: "none"
    },
    labResultErrorMessage: {
        color: "red",
        margin: "5px 0px 0px 5px",
        position: "relative",
        minHeight: "15px",
        "& span": {
            position: "absolute",
            top: "-5px",
            whiteSpace: "nowrap"
        }
    }


    // lableInput: {
    //     lineHeight: "20px",
    //     paddingRight: 15,
    //     fontFamily: "Lato",
    //     color: "#25282B",
    //     fontSize: 15,
    //     alignItems: "center",
    //     // margin: "10px 0px 10px 0px",
    //     [theme.breakpoints.down("sm")]: {
    //         lineHeight: "10px",
    //         paddingRight: 5,
    //     },
    //     [theme.breakpoints.down("md")]: {
    //         lineHeight: "20px",
    //         paddingRight: 5,
    //     },
    // },
    // statusLableInput: {
    //     lineHeight: "20px",
    //     paddingRight: 15,
    //     marginTop: "5px",
    //     fontFamily: "Lato",
    //     color: "#25282B",
    //     fontSize: 15,
    //     alignItems: "center",
    //     // margin: "10px 0px 10px 0px",
    //     [theme.breakpoints.down("sm")]: {
    //         lineHeight: "10px",
    //         paddingRight: 5,
    //     },
    //     [theme.breakpoints.down("md")]: {
    //         lineHeight: "20px",
    //         paddingRight: 5,
    //     },
    // },
    // labeladdfavorite: {
    //     lineHeight: "20px",
    //     paddingRight: 15,
    //     fontFamily: "Lato",
    //     color: "#00B4E5",
    //     textDecoration: "underline",
    //     fontSize: 15,
    //     // margin: "10px 0px 10px 0px",
    //     [theme.breakpoints.down("sm")]: {
    //         lineHeight: "10px",
    //         paddingRight: 5,
    //     },
    //     [theme.breakpoints.down("md")]: {
    //         lineHeight: "20px",
    //         paddingRight: 5,
    //     },
    // },
    // labelAlignBtn: {
    //     justifyContent: "flex-end",
    //     margin: "25px 0px 18px 0px",
    //     [theme.breakpoints.down("xs")]: {
    //         justifyContent: "flex-start",
    //     },
    // },
    // lableInputBold: {
    //     lineHeight: "40px",
    //     fontWeight: 700,
    //     paddingRight: 15,
    //     fontFamily: "Lato",
    //     color: "#25282B",
    //     fontSize: 14,
    //     // marginBottom: 13,
    //     [theme.breakpoints.down("sm")]: {
    //         lineHeight: "25px",
    //         paddingRight: 5,
    //     },
    //     [theme.breakpoints.down("md")]: {
    //         lineHeight: "25px",
    //         paddingRight: 5,
    //     },
    // },
    // labelAlign: {
    //     justifyContent: "flex-end",
    //     alignItems: "flex-start",
    //     margin: "8px 0px 18px 0px",
    //     // alignItems:"center",
    //     [theme.breakpoints.down("xs")]: {
    //         justifyContent: "flex-start",
    //         alignItems: "flex-start"
    //     },
    // },
    // toggleButtonGroup: {
    //     borderRadius: "10px",
    //     backgroundColor: "#F8F8F8"
    // },
    // secondaryCard: {
    //     // width:"100%",
    //     borderRadius: "8px",
    //     border: "1px solid #C4C4C4",
    //     backgroundColor: "#F8F8F8"
    // },
    // baseInput: {
    //     border: "1px solid #DDDDDD",
    //     borderRadius: "4px",
    //     width: "100%",
    //     fontFamily: "Lato",
    //     backgroundColor: "white",
    //     marginBottom: 4,
    //     "& .MuiInputBase-input": {
    //         padding: "9.5px 12px",
    //         fontSize: "14px",
    //         color: "#4A4A4A",
    //         // '&:focus': {
    //         //   border: "1px solid #00b2e3",
    //         //   borderRadius: "4px",
    //         //   outline: 0,
    //         // },
    //     },

    //     "& .Mui-disabled": {
    //         backgroundColor: "#f3f3f3",
    //         color: "#4A4A4A"
    //     },
    // },
    // divider: {
    //     marginBottom: "10px"
    // },
    // mandatorColor: {
    //     color: "#ff0000"
    // },
    // toggleButton: {
    //     padding: "0px"
    // },
    // header: {
    //     flex: "0 1 auto",
    // },
    // crossButton: {
    //     position: "absolute",
    //     top: "8px",
    //     right: "50px",
    //     cursor: "pointer",
    //     padding: "3px",
    //     zIndex: "2",
    //     display: "block",
    //     "& :hover": {
    //         backgroundColor: "#F4F4F4",
    //     }
    // },
    // footerBtn: {
    //     padding: " 0px 0 7px",
    //     bottom: "0px",
    //     position: "relative",
    //     float: "right",
    //     display: "flex",
    //     zIndex: 3
    // },
}));