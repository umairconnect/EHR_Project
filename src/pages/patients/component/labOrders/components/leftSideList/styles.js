import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
    Htabs: {
        "& button": {
            textTransform: "capitalize",
            color: "#25282B",
            fontFamily: "Lato",
            minWidth: "126px",
            fontSize: "14px",
            opacity: "1",
            //  borderRadius:" 0px 10px 0px 0px",
        },
        "& button.Mui-selected": {
            fontWeight: 700,
            color: "#11284B",
            backgroundColor: "#00B2E3",
            //  borderRadius:" 0px 10px 0px 0px",
        },
        "& button.Mui-selected:first-child": {
            borderRadius: "10px 0px 0px 0px",
        },
        "& button.Mui-selected:third-child": {
            borderRadius: " 0px 10px 0px 0px",
        },
        "& .MuiTabs-indicator": {
            backgroundColor: "#00B2E3",
            color: "#11284B",
            // borderRadius:"10px 10px 0px 0px",
            // height: "100%",
        },
        "& .MuiTab-root": {
            minWidth: "127px"
        }
    },
    tabRoot: {
        maxWidth: "380px",
    },
    DialogContentLeftSide: {
        flex: "1",
        backgroundColor: "#F4F4F4",
        padding: "12px 10px 5px 10px",
        maxWidth: "400px",
        flexBasis: "400px",
        // minHeight:"521px",
    },
    box: {
        display: "flex",
        flexFlow: "column",
        height: "100%",
    },
    header: {
        flex: "0 1 auto",
    },
    content: {
        flex: "1 1 auto",
        maxHeight: "620px",
        minHeight: "200px",
        overflow: "auto",
        marginBottom: "10px"
    },
    footer: {
        flex: "0 1 40px",
    },
    //  footerRight:{
    //      float:"right",
    //      marginRight:"-8px"
    //  },
    //  crossButton:{
    //      position:"absolute",
    //      top:"8px",
    //      right:"10px",
    //      cursor:"pointer",
    //      padding:"3px",
    //      zIndex:"2",
    //      display:"block",
    //      "& :hover":{
    //          backgroundColor:"#F4F4F4",
    //      }
    //  },
    leftSideHeader: {
        fontWeight: "bold",
        fontSize: "14px",
        borderRadius: "10px 10px 0 0",
        height: "47px",
    },
    //  lableInput:{
    //    paddingRight: 19,
    //    fontFamily: "Lato",
    //    color: "#25282B",
    //    fontSize: 14,
    //    paddingTop:"10px",
    //    minHeight:"40px",
    //    textAlign:"right",
    //    display:"block"
    //  },
    //  mandatorColor: {
    //    color: "#ff0000",
    //    fontSize: 16,
    //    fontFamily:"'Roboto', 'Helvetica', 'Arial', sans-serif",
    //    lineHeight:"10px"
    //  },
    //  addNewIcon:{
    //    float: "right",
    //    marginLeft:"7px",
    //    cursor:"pointer",
    //    paddingTop: 10,
    //  },
    //  deleteIcon:{
    //    float: "right",
    //    cursor:"pointer",
    //    paddingTop: 10,
    //    "& img":{
    //    width:"18px",
    //    height:"18px",
    //    }
    //  },
    //  inputContainer:{
    //    maxHeight:"200px",
    //    overflow:"auto"
    //  },
    quickPickHeader: {
        display: "flex",
        border: "1px solid #DBDADA",
        borderRadius: "0px 0px 4px 4px",
    },

    muiPaper: {
        borderRadius: "10px 10px 0px 0px"
    },

    btnIconRoot: {
        overflow: "visible"
    },
    BtnIcon: {
        width: "18px",
        height: "18px"
    },
    faxButton: {
        color: "#11284B",
        height: "30px",
        minWidth: "30px",
        margin: "0px 10px 0px 15px",
        backgroundColor: "#F9F9F9",
        boxSizing: "border-box",
        border: "1px solid #11284B",
        borderRadius: "8px",
        //marginTop: "12px",
        // borderRight:"1px solid #C4C4C4",
        fontSize: 15,
        fontFamily: "Lato",
        textTransform: "none",
        padding: "0 12px",
        position: "relative",
        '& .MuiButton-startIcon': {
            margin: "0px 5px 0px 0px"
        },
        newAddBtnLink: {
            color: "white",
        },
    },

    editIcon: {
        top: "15px",
        right: "50px",
        position: "absolute",
        // transform: "translateY(-50%)",
        width: "14px",
        display: "inline-flex",
        cursor: "pointer",
        "& img": {
            width: "18px",
            height: "18px",
        }
    },
    deleteIcon: {
        //float: "right",
        top: "13px",
        cursor: "pointer",
        right: "14px",
        paddingTop: "5px",
        position: "absolute",
        cursor: "pointer",
        paddingTop: 0,
        "& img": {
            width: "18px",
            height: "18px",
        }
    },
    templateList: {
        margin: "0",
        padding: "0",
        position: "relative",
        listStyle: "none",
        borderTop: "solid #d5d5d5 1px",
        "& li": {
            width: "100%",
            display: "flex",
            position: "relative",
            boxSizing: "border-box",
            textAlign: "left",
            alignItems: "center",
            paddingTop: "8px",
            paddingBottom: "8px",
            justifyContent: "flex-start",
            textDecoration: "none",
            padding: "5px 10px",
            // cursor: "pointer",
            borderBottom: "solid #d5d5d5 1px",
            // "&:hover": {
            //     backgroundColor: "#e0e6f1",
            //     //opacity: "0.3"
            // }
        }
    },
    listIcon: {
        minWidth: "56px",
        flexShrink: '0',
    },
    listContent: {
        flex: "1 1 auto",
        minWidth: "0",
        marginTop: "6px",
        marginBottom: "6px",
        color: "#34373b"
    },
    templateListTitle: {
        fontStyle: "italic",
        size: "12px",
        color: "#00B4E5",
        fontWeight: "400",
        fontFamily: "Lato",
        textDecoration: "underline",
        display: "inline-block",
        lineHeight: "normal",
        paddingRight: "50px",
        cursor: "pointer",
        "&:hover": {
            color: "#11284b"
        }
    },
    templatelistContentTitle: {
        fontFamily: "Lato",
        display: "block",
        fontSize: "14px",
        fontStyle: "normal",
        fontWeight: 400,
        marginBottom: "10px"
    },
    templatelistContentTitleDx: {
        fontFamily: "Lato",
        display: "block",
        fontSize: "14px",
        fontStyle: "normal",
        fontWeight: 400,
    },
    listIcon: {
        //minWidth: "56px",
        //flexShrink: '0',
        float: "right",
        "& img": {
            width: "14px",
        }
    },

}))