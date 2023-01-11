import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
    innerGrid: {
        // padding: "0px 15px"
    },
    dialogPaper: {
        minWidth: "550px",
        // maxHeight: "calc(100%-64px)",
        //minHeight: "92%"
    },
    dialogContent: {
        minWidth: "550px",
        padding: "20px 10px 10px 10px"
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
        "& .custom-grid": {
            minWidth: "100%"
        },
        "& .custom-grid .ant-empty-normal": {
            margin: "0px !important",
        },
        "& .custom-grid .ant-empty-normal .ant-empty-image": {
            height: "25px",
        },
        "& .custom-grid .ant-empty-image": {
            marginBottom: "0px",
        },
        '& .custom-grid': {

            '& table tbody>tr>td': {
                padding: "6px 4px 6px 20px",
            },
            "& .MuiInput-root": {
                margin: 0,
                maxHeight: 35.63,
            }

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
    btnSpan: {
        display: "flex",
        width: "100%"
    },
    attachmentBtn: {
        // position: "absolute",
        padding: "8px",
        // right: "50px",
    },
}));