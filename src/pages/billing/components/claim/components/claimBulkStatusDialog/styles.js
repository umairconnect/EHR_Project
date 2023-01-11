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
        cursor: "pointer",
    },
    content: {
        flex: "1 1 auto",
        maxHeight: "580px",
        minHeight: "200px",
    },
    footer: {
        flex: "0 1 40px",
        paddingTop: 10
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
        display: "flex",
        padding: "0px 13px 10px 8px",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "14px",
        lineHeight: "19px",
        color: "#25282B",
        fontFamily: "Lato",
    },
    claimStatus: {
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "14px",
        lineHeight: "19px",
        color: "#25282B",
        fontFamily: "Lato",
        textTransform: "capitalize",
        paddingLeft: "5px"
    },
    claimStatusTable: {
        background: "#FFFFFF",
        border: "1px solid #E1E1E1",
        boxSizing: "border-box",
        borderRadius: "4px",
        width: "100%",
        borderCollapse: "collapse",
        // margin: " 0px 0px 15px",
        minHeight: "95px",
        "& thead": {
            border: "1px solid #E8E8E8",
            borderRadius: "8px",
            backgroundColor: "#fafafa",
            minWidth: "100%",
            height: "42px",
            textAlign: "left",
            "& td": {
                textAlign: "left",
                fontStyle: "normal",
                fontWeight: "bold",
                fontSize: "14px",
                color: "#52575C",
                padding: "0px 10px 0px 10px"
            }
        },
        "& th": {
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize: "14px",
            color: "#52575C",
            padding: "0px 10px"
        },
        "& tr": {
            height: "40px",
            borderBottom: "1px solid #e1e1e1"
        },
        "& td": {
            textAlign: "left",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "14px",
            color: "#52575C",
            padding: "0px 10px 0px 10px"
        },
        "& img": {
            width: "18px",
            height: "18px",
            marginTop: "3px",
            cursor: "pointer"
        }
    },
    warningArea: {
        background: "#F2DEDE",
        border: "1px solid #FFFFFF",
        boxSizing: "border-box",
        borderRadius: "8px",
        margin: "10px 0px",
        "& .MuiTypography-body1": {
            fontFamily: "Lato",
            fontstyle: "normal",
            fontWeight: "normal",
            fontSize: "15px",
            color: "#B04040",
            padding: "14px 20px",
        }
    },
    confirmationArea: {
        border: "1px solid #FFFFFF",
        boxSizing: "border-box",
        borderRadius: "8px",
        margin: "10px 0px",
    }
}));