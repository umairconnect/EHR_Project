import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
    dialogPaper: {
        width: "590px",
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
        maxHeight: "575px",
        // minHeight: "575px",
        overflow: "initial !important",
        marginBottom: "10px",
        "& .MuiFormGroup-root": {
            flexDirection: "column",
            paddingRight: '10px'
        },
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
    noteText: {
        fontFamily: 'Lato',
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: '14px',
        lineHeight: '20px',
        color: '#000000',
        marginRight: '35px',
        marginBottom: '5px',
    },
    title: {
        fontFamily: 'Lato',
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '17px',
        color: '#000000',
        padding: '15px 0'
    }
}));