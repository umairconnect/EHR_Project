import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
    dialogPaper: {
        minWidth: "650px",
        //minHeight: "92%"
    },
    DialogContent: {
        // minWidth: "550px",
        // minHeight: "675px",
        //display: "flex",
        padding: "20px 0px 10px 10px"
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
    content: {
        flex: "1 1 auto",
        //maxHeight: "450px",
        minHeight: "200px",
        overflow: "auto",
    },
    footer: {
        flex: "0 1 40px",
    },
    footerRight: {
        float: "right",
        marginRight: "-8px"
    },
    lableTitleInput: {
        "& h6": {
            fontSize: "16px",
            fontWeight: "500",
            color: "#25282B",
        }
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

    tablelayout: {
        width: "100%",
        textAlign: "left",
        marginBottom: "10px",
        border: "1px solid #e4e4e4",

        "& tr": {
            borderBottom: "1px solid #e4e4e4",
        },

        "& th": {
            fontFamily: "Lato",
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize: "14px",
            lineHeight: "14px",
            letterSpacing: "0.01em",
            color: "#000000d9",
            padding: "5px",
            fontWeight: "600",
        },
        "& td": {
            fontFamily: "Lato",
            fontStyle: "normal",
            fontSize: "14px",
            lineHeight: "14px",
            letterSpacing: "0.01em",
            color: "#000000d9",
            padding: "5px",
            padding: "5px",
            fontWeight: "normal",
        },
        "& thead": {
            background: "#F0F0F0",
        }
    },
    actionIcons: {
        // float: "right",
        cursor: "pointer",
        marginLeft: "7px",
        paddingTop: 0,
        marginRight: "11px",
        "& img": {
            width: "18px",
            height: "18px",
            marginLeft: "5px"
        }
    }, 
    CareplanScroll: {
        "& .rc-scrollbars-view" : {
            padding: "10px 20px 10px 10px",
        } 
    },
    addIcon: {
        position: "relative",
        left: "6px",
        top: "-2px",
    }
}));