import {
    makeStyles
} from "@material-ui/styles";

export default makeStyles(theme => ({
    flexBox: {
        display: "flex"
    },
    leftSideMenulist: {
        listStyle: "none",
        margin: "0px",
        padding: "0px",
        position: "relative",
        backgroundColor: "#596270",
        width: "204px",
        "& li": {
            width: "100%",
            display: "flex",
            position: "relative",
            boxSizing: "border-box",
            textAlign: "left",
            alignItems: "center",
            padding: "6px 6px 6px 15px",
            justifyContent: "flex-start",
            cursor: "pointer",
            color: "#fff",
            "&:hover": {
                backgroundColor: "#00B2E3"
            }
        }
    },
    newAddBtn: {
        backgroundColor: "#11284B",
        color: "white",
        margin: "4.5px 16px -20px",
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
        }
    },
    positionRelative: {
        position: "relative",
    },
    title: {
        margin: "10px 0px -10px 0px",
        fontFamily: "Lato",
        fontSize: 14,
        color: "#25282B",
        fontWeight: "bold",
    },
    btnIconRoot: {
        overflow: "visible"
    },
    BtnIcon: {
        width: "18px",
        height: "18px"
    },
    faxButton: {
        color: "#11284B",
        height: "32px",
        minWidth: "30px",
        backgroundColor: "#F9F9F9",
        boxSizing: "border-box",
        border: "1px solid #11284B",
        borderRadius: "8px",
        // margin: "5px 5px -32px 0px",
        margin: "0px 0px 0px 5px",
        // borderRight:"1px solid #C4C4C4",
        fontSize: 15,
        fontFamily: "Lato",
        textTransform: "none",
        // padding: "0 12px",
        padding: "0 12px 0 14px",
        position: "relative",
        '& .MuiButton-startIcon': {
            // margin: "0px"
        },
        newAddBtnLink: {
            color: "white",
        },
    },
    newAddBtn2: {
        width: "112px",
        height: "32px",
        borderRadius: "8px",
        border: "1px solid #11284B",
        // margin: "5px 0px -32px 0px",
        margin: 0,
        color: "#11284B",
        backgroundColor: "#F9F9F9",
        boxSizing: "border-box",
        fontSize: 15,
        fontFamily: "Lato",
        textTransform: "none",
        padding: "0 12px",
        position: "relative",
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

}));
