import { red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
    dialogPaper: {
        width: "50%",
        minWidth: "500px",
        // maxHeight: "95vh",
        maxWidth: '80%',
    },
    DialogContentRightSide: {
        flex: "1",
        padding: "20px 10px 10px",
        backgroundColor: "#FFFFFF",
        // padding: "20px 10px 5px 10px",
        // minHeight:"521px",
    },
    deleteIcon: {
        // float: "right",
        cursor: "pointer",
        marginLeft: "7px",
        paddingTop: 10,
        display:'flex',
        "& img": {
            width: "18px",
            height: "18px",
            marginLeft: "5px"
        }
    },
    box: {
        display: "flex",
        flexFlow: "column",
        height: "100%",
    },
    addNote: {

        cursor: "pointer",
        color: "#00B4E5",
        padding: '10px 0px',
        display: 'flex',
        alignItems: 'center',
        "& img": {
            width: "20px",
            height: "20px",
            margin: "0 5px -2px 0",
        }
    },
    header: {
        flex: "0 1 auto",
        display: "flex"
    },
    content: {
        flex: "1 1 auto",
        // maxHeight: "580px",
        minHeight: "200px",
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
    icdCodeTable: {
        background: "#FFFFFF",
        border: "1px solid #E1E1E1",
        boxSizing: "border-box",
        borderRadius: "4px",
        width: "100%",
        borderCollapse: "collapse",
        margin: " 0px 0px 15px",
        "& thead": {
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#fafafa",
            minWidth: "100%",
            height: "42px",
            color: "#25282B",
            textAlign: "left"
        },
        "& th": {
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize: "14px",
            color: "#25282B",
            padding: "0px 10px"
        },
        "& tr": {
            height: "42px"
        },
        "& td": {
            borderTop: "1px solid #E1E1E1",
            textAlign: "left",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "14px",
            color: "#11284B",
            padding: "5px 10px 0px 10px"
        }
    },
    existingTableBox: {
        padding: 10,
    }
}));