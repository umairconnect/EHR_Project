import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
    dialogPaper: {
        width: "700px",
        // height: "95vh",
        // minHeight: '90vh',
        // maxWidth: '80%',
        // maxHeight: "calc(100% - 14px)",
    },
    dialogContent: {
        // minWidth: "950px",
        display: "flex",
        backgroundColor: "#fff",
        padding: "20px 20px 10px",
    },
    dialogContentRightSide: {
        flex: "1",
        backgroundColor: "#fff",
        padding: "20px 10px 5px 10px",
        // minHeight:"521px",
    },
    box: {
        display: "flex",
        flexFlow: "column",
        height: "100%",
        width: "100%"
    },
    header: {
        flex: "0 1 auto",
        cursor: "move"
    },
    content: {
        flex: "1 1 auto",
  
        overflow: "initial !important",
        marginBottom: "10px",
        // "& .MuiFormGroup-root": {
        //     flexDirection: "column",
        //     paddingRight: '10px'
        // },
        "& .MuiTypography-root": {
            color: "#000000"
        }
    },
    footer: {
        flex: "0 1 40px",
    },
    footerRight: {
        display: "flex",
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
    tablelayout: {
        width: "100%",
        textAlign: "left",
        // margin: "0px 15px 10px 25px",
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
    editdeleteIcon: {
        margin: "0px 5px",
        cursor: "pointer",
        "& img": {
            width: 16,
            height: 15,
        }
    },
    tableActionBtns: {
        display: "flex",
        justifyContent: "center",
        width: "100%"
    },
}));