import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
    dialogPaper: {
        minWidth: "540px",
        maxWidth: '540px',
    },
    dialogContent: {
        minWidth: "540px",
        maxWidth: '540px',
        padding: "20px 10px 10px",
    },
    box: {
        display: "flex",
        flexFlow: "column",
        height: "100%",
    },
    header: {
        flex: "0 1 auto",
        display: "flex"
    },
    content: {
        flex: "1 1 auto",
        maxHeight: "580px",
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
    filtersList: {
        listStyle: "none",
        margin: '-2px 0 0',
        padding: 0,
        display: "flex",
        flexWrap: "wrap",
        "& li": {
            margin: "5px",
            padding: "5px 10px",
            fontSize: 14,
            textAlign: "center",
            cursor: "pointer",
            minHeight: "30px",
            color: "#52525C",
            fontFamily: "Lato",
            borderRadius: "5px",
            border: "1px solid #C4C4C4",
            userSelect: "none",
            "&:hover": {
                color: "#434343",
                border: "none",
                backgroundColor: "#e5e5e5",
                border: "1px solid transparent",
            }
        }
    },
    selectedItem: {
        backgroundColor: "#00B4E5 !important",
        color: "#ffffff !important",
        border: "1px solid #00B4E5 !important",
        "&:hover": {
            backgroundColor: "#00B4E5 !important",
            color: "#ffffff !important",
            border: "1px solid transparent !important",
        }
    },
}))