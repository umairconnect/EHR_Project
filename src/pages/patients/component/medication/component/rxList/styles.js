import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    box: {
        display: "flex",
        flexFlow: "column",
        height: "100%",
    },
    leftHeader: {
        flex: "0 1 auto",
        display: "flex",
    },
    header: {
        flex: "0 1 auto",
        display: "flex"
    },
    content: {
        flex: "1 1 auto",
        maxHeight: "615px",
        minHeight: "200px",
        overflow: "auto",
        marginBottom: "10px"
    },
    footer: {
        flex: "0 1 40px",
    },
    muiPaper: {
        borderRadius: "10px 10px 0px 0px",
        marginBottom: "10px"
    },
    tabRoot: {
        maxWidth: "296px",
    },
    Htabs: {
        "& button": {
            textTransform: "capitalize",
            color: "#25282B",
            fontFamily: "Lato",
            width: "125px",
            maxWidth: "50px",
            fontSize: "14px",
            opacity: "1",
        },
        "& button.Mui-selected": {
            fontWeight: 700,
            color: "#11284B",
            backgroundColor: "#00B2E3",
            borderRadius: " 0px 10px 0px 0px",
        },
        "& button.Mui-selected:first-child": {
            borderRadius: "10px 0px 0px 0px",
        },
        "& .MuiTabs-indicator": {
            backgroundColor: "#00B2E3",
            color: "#11284B",
            width: "130px"
            // borderRadius:"10px 10px 0px 0px",
            // height: "100%",
        },
        "& .MuiTab-root": {
            minWidth: "96px",
            padding: "6px 0px",
        }
    },
    tabPan: {
        overflow: "initial !important",
        height: "initial !important",
    },
    rXList: {
        listStyle: "none",
        margin: 0,
        padding: 0,
        "& li": {
            cursor: "pointer",
            fontFamily: "Lato",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "12px",
            lineHeight: "25px",
            color: "#52575C",
            // height: 35,
            padding: "10px 5px 0px 0px",
            borderBottom: "1px solid #DBDADA",
            "&:hover": {
                backgroundColor: "#f6f6f6",
                background: "#f6f6f6"
            }
        }
    },
}))