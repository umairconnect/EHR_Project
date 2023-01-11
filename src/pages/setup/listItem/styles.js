import {
    makeStyles
} from "@material-ui/styles";

export default makeStyles(theme => ({
    positionRelative: {
        position: "relative",
        marginTop: '30px'
    },
    pageTitleContent: {
        textAlign: "center",
        marginTop: "10%"
    },
    listLabelStyle: {
        justifyContent: "left",
        maxWidth: "fit-content !important"
    },
    newAddBtn: {
        backgroundColor: "#11284B",
        color: "white",
        margin: "4.5px 16px 0",
        height: 30,
        fontSize: 12,
        fontFamily: "Lato",
        textTransform: "none",
        padding: "0 12px",
        '&:hover': {
            backgroundColor: "#596270",
        },
        newAddBtnLink: {
            color: "white",
        },
        '& .MuiSvgIcon-root': {
            fontSize: 13,
        },
        '& .MuiButton-startIcon.MuiButton-iconSizeSmall': {
            margin: "0px 5px -2px 0"
        }
    },
    newAddBtn2: {
        width: "112px",
        height: "32px",
        borderRadius: "8px",
        border: "1px solid #11284B",
        margin: "0px 0px 5px 5px",
        color: "#11284B",
        backgroundColor: "#F9F9F9",
        boxSizing: "border-box",
        fontSize: 15,
        fontFamily: "Lato",
        textTransform: "none",
        padding: "0 12px",
        // position: "absolute",
        // top: "2px",
        '&:hover': {
            // backgroundColor: "#596270",
            backgroundColor: "#11284b",
            color: "white",
        },
        newAddBtnLink: {
            // color:"#11284B"
            color: "white",
        }
    },
    Textvalue: {
        fontFamily: "Lato",
        color: "#25282B",
        fontSize: 14,
        lineHeight: "36px"
    },
    Icon: {
        width: "18px",
        height: "18px",
        cursor: "pointer"
    },
    addListItem: {
        marginTop: "-60px",
        cursor: "pointer",
        color: "#00B4E5",
        lineHeight: "40px",
        minWidth: "150px",
        fontSize: "14px",
        marginLeft: "0x",
        display: "flex",
        alignItems: "center",
        "& img": {
            width: "20px",
            height: "20px",
            margin: "0 5px 0 0",
        }
    },
}))