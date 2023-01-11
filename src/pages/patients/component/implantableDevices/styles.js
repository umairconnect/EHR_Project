import { makeStyles } from "@material-ui/core";

export default makeStyles(() => ({
    positionRelative: {
        position: "relative",
    },
    newAddBtn2: {
        width: "112px",
        height: "32px",
        borderRadius: "8px",
        border: "1px solid #11284B",
        // margin: "5px 0px -32px 0px",
        margin: "0px 0px 10px 0px",
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
    }
}))