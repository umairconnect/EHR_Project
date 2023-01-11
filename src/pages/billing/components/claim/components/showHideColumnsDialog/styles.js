import { makeStyles } from "@material-ui/core";

export default makeStyles(theme => ({
    dialogPaper: {
        // minWidth: "650px",
        overflowX: "hidden"
    },
    dialogContent: {
        minWidth: "650px",
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
        minHeight: "200px",

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
    contentBoxArea: {
        textAlign: "left",
        display: "block",
        width: "134px",
        margin: "0 auto",
    },
    pCheckBox: {
        display: "block",
        flexShrink: "0",
        marginBottom: 10,
        '& label': {
            margin: 0,
            height: "20px",
            '& span.MuiFormControlLabel-label': {
                color: "#11284B",
                fontSize: "15px"
            },
            '& span.MuiIconButton-root': {
                color: "#DBDADA",
                padding: 0,
                paddingRight: 4,
                marginLeft: 8,
            },
            '& span.MuiCheckbox-colorPrimary.Mui-checked': {
                color: "#00B4E5"
            }
        }
    },

}));