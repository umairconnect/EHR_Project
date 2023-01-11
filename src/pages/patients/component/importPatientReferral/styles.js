import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
    dialogPaper: {
        minWidth: "550px"
    },
    DialogContent: {
        minWidth: "500px",
        //display: "flex",
        padding: "20px 10px 0px 10px"
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
        maxHeight: "450px",
        // minHeight: "200px",
        overflow: "auto",
    },
    footer: {
        flex: "0 1 40px",
        padding: "10px 0px"
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
    btnSpan: {
        display: "flex",
        width: "100%"
    },
    attachmentBtn: {
        position: "absolute",
        padding: "8px",
        right: "50px",
    },
    // attachmentList: {
    //     width: "100%",
    //     listStyle: "none",
    //     padding: "0px",
    //     // borderCollapse:"separate",
    //     // borderSpacing:"0px 5px",
    //     // margin: "0px 20px",
    //     "& li": {
    //         height: "40px",
    //         padding: "10px",
    //         display: "flex",
    //         borderRadius: "5px",
    //         margin: "5px 0px 5px",
    //         backgroundColor: "#E0E0E0;",
    //     }
    // },
    // fileNameText: {
    //     color: " #25282B ",
    //     fontFamily: " Lato ",
    //     fontStyle: " normal ",
    //     fontWeight: " 600 ",
    //     fontSize: " 14px ",
    //     minWidth: "95%",
    //     whiteSpace: "nowrap",
    //     textOverflow: "ellipsis",
    //     overflow: "hidden"
    // },
    // attachmentDeleteBtn: {
    //     cursor: "pointer",
    //     color: "#d11a2a",
    //     transform: "rotate(45deg)",
    // }
}));