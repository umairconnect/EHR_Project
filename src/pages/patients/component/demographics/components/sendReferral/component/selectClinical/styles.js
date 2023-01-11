import { makeStyles } from "@material-ui/styles"


export default makeStyles(theme => ({
    dialogPaper: {
        minWidth: "650px",
        maxWidth: "750px"
    },
    DialogContent: {
        minWidth: "650px",
        maxWidth: "750px",
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
    content: {
        flex: "1 1 auto",
        maxHeight: "450px",
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
    selectContainer: {
        paddingLeft: 20
    },

    selectSections: {
        color: "#25282B",
        fontWeight: "700",
        fontSize: "16px",
        marginBottom: 10
    }, includLink: {
        position: "relative",
        textDecoration: 'underline',
        color: "#00b4e5",
        cursor: "pointer",
        fontSize: 14,
        fontWeight: "400",
        marginLeft: 30
    },
}));