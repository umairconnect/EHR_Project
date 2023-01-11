import { red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
    dialogPaper: {
        minWidth: "680px",
        maxWidth: '680px',
    },
    dialogContent: {
        minWidth: "680px",
        maxWidth: '680px',
        padding: "20px 10px 10px",
    },
    box: {
        display: "flex",
        flexFlow: "column",
        height: "100%",
    },
    header: {
        flex: "0 1 auto",
        display: "flex",
        cursor: "pointer"
    },
    content: {
        flex: "1 1 auto",
        maxHeight: "580px",
        // minHeight: "200px",
        // overflow: "auto",
        marginBottom: "10px"
    },
    footer: {
        flex: "0 1 40px",
    },
    footerRight: {
        float: "right",
        marginRight: "-8px"
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
    claimDetails: {
        width: "45%",
        paddingLeft: "20px",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "14px",
        lineHeight: "28px",
        color: "#000000",
    },
    claimDetailsDateTime: {
        width: "55%",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "14px",
        lineHeight: "28px",
        color: "#000000",
    },
    claimsList: {
        listStyle: "none",
        "& li": {
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize: "14px",
            lineHeight: "28px",
            color: "#000000",
            display: "flex",
            "& .MuiSvgIcon-root": {
                // margin: "0px 8px -6px 0px"
                margin: "1px 5px 0px 0px"
            },
            "& .pendingIcon": {
                backgroundColor: "#1CBA0F"
            },
            "& .doneIcon": {
                backgroundColor: "#F5413D"
            },
        }
    }
}));