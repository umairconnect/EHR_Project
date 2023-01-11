import {
    makeStyles
} from "@material-ui/styles";

export default makeStyles(theme => ({
    dialogPaper: {
        maxWidth: '550px',
        width: '550px',
        // height: '72%',
        [theme.breakpoints.down("xs")]: {
            maxWidth: '72%',
        },
        "& .MuiDialogTitle-root": {
            padding: "12px 12px 0px"
        }
    },
    crossButton: {
        position: "absolute",
        top: "8px",
        right: "20px",
        cursor: "pointer",
        padding: "3px",
        zIndex: "2",
        display: "block",
        "& :hover": {
            backgroundColor: "#F4F4F4",
        }
    },
    dialogcontent: {
        overFlow: "!important",
        padding: "0px 12px",
        height: "100%"
    },
    assignMeBtn: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "14px",
        textAlign: "right",
        color: "#00B4E5",
    },
    dateBtn: {
        width: "96px",
        height: "32px",
        borderRadius: "8px",
        border: "1px solid #11284B",
        margin: "5px 10px",
        color: "#11284B",
        backgroundColor: "#F9F9F9",
        boxSizing: "border-box",
        fontSize: 15,
        fontFamily: "Lato",
        textTransform: "none",
        padding: "0 12px",
        position: "relative",
        // top:"2px",
        '&:hover': {
            backgroundColor: "#FFFFFF",
            border: "1px solid #00B2E3",
            color: "#00B2E3",
        },
        newAddBtnLink: {
            color: "white",
        }
    },
    authorName: {
        fontFamily: " Lato",
        fontStyle: " normal",
        fontWeight: " normal",
        fontSize: " 14px",
        lineHeight: " 17px",
        textDecoration: "none",
        color: " #172C4B",
        margin: "8px 5px"
    },
    footerBtn: {
        bottom: "0px",
        paddingLeft: "62%",
        display: "flex",
        zIndex: 3
    },
    footerRight: {
        float: "right",
        marginRight: "-8px"
    },
}));