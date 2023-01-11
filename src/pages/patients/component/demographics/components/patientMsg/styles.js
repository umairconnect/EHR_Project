import {
    makeStyles
} from "@material-ui/styles";

export default makeStyles(theme => ({
    flexBox: {
        display: "flex"
    },

    newAddBtn: {
        backgroundColor: "#11284B",
        color: "white",
        margin: "4.5px 16px -20px",
        height: 30,
        fontSize: 12,
        fontFamily: "Lato",
        textTransform: "none",
        padding: "0 12px",
        '&:hover': {
            backgroundColor: "#596270",
        },
        newAddBtnLink: {
            color: "white",
        }
    },
    Icon: {
        width: "20px",
        cursor: "pointer",
        marginLeft: "12px",
    },
    positionRelative: {
        position: "relative",
    },
    title: {
        margin: "10px 0px -10px 0px",
        fontFamily: "Lato",
        fontSize: 14,
        color: "#25282B",
        fontWeight: "bold",
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
        backgroundColor: "#F9F9F9",
        boxSizing: "border-box",
        border: "1px solid #11284B",
        borderRadius: "8px",
        marginTop: "12px",
        // borderRight:"1px solid #C4C4C4",
        fontSize: 15,
        fontFamily: "Lato",
        textTransform: "none",
        padding: "0 12px",
        position: "relative",
        '& .MuiButton-startIcon': {
            margin: "0px"
        },
        newAddBtnLink: {
            color: "white",
        },
    },
    newAddBtn2: {
        width: "112px",
        height: "32px",
        borderRadius: "8px",
        border: "1px solid #11284B",
        margin: "10px 0px 10px 5px",
        color: "#11284B",
        backgroundColor: "#F9F9F9",
        boxSizing: "border-box",
        fontSize: 15,
        fontFamily: "Lato",
        textTransform: "none",
        padding: "0 12px",
        position: "relative",
        '&:hover': {
            // backgroundColor: "#596270",
            backgroundColor: "#11284b",
            color: "white",
        },
        newAddBtnLink: {
            // color:"#11284B"
            color: "white",
        }
    },
    title: {
        margin: "10px 0px 10px 0px",
        fontFamily: "Lato",
        fontSize: 14,
        color: "#25282B",
        fontWeight: "bold",
        display: "block"
    },
    subTitle: {
        marginTop: 20
    },
    dialogPaper: {
        minWidth: "750px"
    },
    DialogContent: {

        //display: "flex",
        padding: "20px 10px 20px 10px"
    },
    box: {
        display: "flex",
        flexFlow: "column",
        height: "100%",
    },
    header: {
        flex: "0 1 auto",
        cursor: "move"
    },
    msgcontent: {
        flex: "1 1 auto",
        maxHeight: "450px",
        overflow: "auto",
        "& h4": {
            paddingRight: "20px",
            textAlign: "right",
            lineHeight: "2",
            fontWeight: "600",
        }
    },
    dialogPaperMsg: {
        minWidth: "640px",
        maxWidth: '640px',
        padding: "25px 20px", 
    },
    content: {
        flex: "1 1 auto",
        maxHeight: "450px",

        overflow: "auto",
        "& h4": {
            paddingRight: "20px",
            textAlign: "right",
            lineHeight: "2",
        }
    },
    footer: {
        flex: "0 1 40px",
    },
    footerRight: {
        float: "right",
        marginRight: "-8px"
    },
    crossButton: {
        position: "absolute",
        top: "8px",
        right: "10px",
        cursor: "pointer",
        padding: "3px",
        zIndex: "2",
        display: "block",
        "& :hover": {
            backgroundColor: "#F4F4F4",
        }
    },
    textAreaLabel: {
        marginBottom: 9
    },

}));
