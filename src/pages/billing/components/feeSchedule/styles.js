import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
    inputSpan: {
        display: "flex",
        width: "30%",
        position: "absolute",
        margin: "0px 0px 0px 5px"
    },
    cheifComplaintButton: {
        // width: "112px",
        height: "32px",
        borderRadius: "8px",
        // border: "1px solid #11284B",
        margin: "0px 0px 0px 5px",
        // color: "#11284B",
        backgroundColor: "#FFFFFF",
        // boxSizing: "border-box",
        fontSize: 18,
        fontFamily: "Lato",
        textTransform: "none",
        padding: "0 12px",
        position: "relative",
        float: "right",
        color: "#00B2E3",
        boxShadow: "none",
        cursor: "pointer",
        // top: "2px",
        '&:hover': {
            // backgroundColor: "#596270",
            // backgroundColor: "#11284b",
            cursor: "pointer",
            boxShadow: "none",
            color: "#596270",
            backgroundColor: "#FFFFFF",
        },
        newAddBtnLink: {
            // color:"#11284B"
            cursor: "pointer",
            color: "#00B2E3",
        }
    },
    newAddBtn2: {
        width: "112px",
        height: "32px",
        borderRadius: "8px",
        border: "1px solid #11284B",
        margin: "0px 0px 20px 5px",
        color: "#11284B",
        backgroundColor: "#F9F9F9",
        boxSizing: "border-box",
        fontSize: 15,
        fontFamily: "Lato",
        textTransform: "none",
        padding: "0 12px",
        position: "absolute",
        top: '3px',
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
        },
        '& .MuiSvgIcon-root': {
            fontSize: 13,
        },
        '& .MuiButton-startIcon.MuiButton-iconSizeSmall': {
            margin: "0px 5px -2px 0"
        }
    },

}))
