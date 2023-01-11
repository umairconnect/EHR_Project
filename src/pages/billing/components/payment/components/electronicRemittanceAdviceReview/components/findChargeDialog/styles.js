import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    dialogPaper: {
        minWidth: "650px",
        zIndex: "9999"
        // maxWidth: "850px",
        // padding: "15px"
    },
    dialogContent: {
        minWidth: "650",
        padding: "20px 10px 10px"
    },
    box: {
        display: "flex",
        flexFlow: "column",
        height: "100%"
    },
    header: {
        flex: "0 1 auto",
        cursor: "move"
    },
    content: {
        minHeight: "200px",
        flex: "1 1 auto",
        overflow: "auto",
        "& .MuiTypography-subtitle1": {
            fontSize: "13px"
        }
    },
    footer: {
        flex: "1 1 40px"
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
        paddingLeft: "3px",
        zIndex: "9",
        display: "block",
        "& :hover": {
            backgroundColor: "#F4F4F4"
        }
    },
    chargeDetailsArea: {
        display: "grid",
        rowGap: "5px",
        columnGap: "10px",
        width: "100%",
        marginBottom: "10px",
        gridTemplateColumns: "23% 23% 23% 23%",
        "& div": {
            display: "grid"
        }
    },
    labelTitle: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "13px",
        lineHeight: "28px",
        color: "#000000",
    },
    labelValue: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "13px",
        lineHeight: "28px",
        minHeight: "28px",
        color: "#000000",
    },
    selectedChargeInfoAlignment: {
        minWidth: "100%",
        padding: "12px 0px"
    }
}))