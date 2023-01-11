import { red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
    cardButton: {
        color: "#11284B",
        height: "30px",
        minWidth: "30px",
        backgroundColor: "#F9F9F9",
        boxSizing: "border-box",
        borderRight: "1px solid #C4C4C4",
        fontSize: 15,
        fontFamily: "Lato",
        textTransform: "none",
        padding: "0 14px",
        position: "relative",
        '& .MuiButton-startIcon': {
            margin: "0px"
        },
        newAddBtnLink: {
            color: "white",
        },
    },
    //
    DialogContent: {
        minWidth: "950px",
        display: "flex",
    },
    DialogContentRightSide: {
        flex: "1",
        backgroundColor: "#fff",
        padding: "20px 10px 5px 10px",
        // minHeight:"521px",
    },
    box: {
        // display: "flex",
        flexFlow: "column",
        height: "100%",
    },
    header: {
        flex: "0 1 auto",
        display: "flex",
        cursor: "move"
    },
    content: {
        flex: "1 1 auto",
        maxHeight: "550px",
        minHeight: "200px",
        overflow: "!important",
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
        position: "absolute",
        top: "8px",
        right: "30px",
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
        position: "absolute",
        display: "flex",
        zIndex: 3
    },
    bulkNotesTable: {
        // borderCollapse: "collapse";
        width: "99%",
        background: "#FFFFFF",
        border: "1px solid #E1E1E1",
        boxSizing: "border-box",
        borderRadius: "8px",
        overflow: "!important",
        // padding: 20,
        "& th": {
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize: "14px",
            color: "#25282B",
            padding: "10px",
            textAlign: "left"

        },
        "& td": {
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "14px",
            color: "#25282B",
            // textAlign: 'center',
            padding: "0px 10px",
            textAlign: "left",
            borderTop: "1px solid #E1E1E1",
        }
    }
}));