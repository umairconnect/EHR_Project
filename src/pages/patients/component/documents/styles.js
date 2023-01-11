import {
    makeStyles
} from "@material-ui/styles";

export default makeStyles(theme => ({
    flexBox: {
        display: "flex"
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
        width: "10px",
        marginRight: "5px",
        height: "15px",
    },
    faxButton: {
        color: "#11284B",
        height: "30px",
        minWidth: "30px",
        backgroundColor: "#F9F9F9",
        boxSizing: "border-box",
        border: "1px solid #11284B",
        borderRadius: "8px",
        marginTop: "12px",
        // borderRight:"1px solid #C4C4C4",
        fontSize: 15,
        fontFamily: "Lato",
        textTransform: "none",
        padding: "0 12px",
        position: "relative",
        '& .MuiButton-startIcon': {
            margin: "0px"
        },
        '&:hover': {
            backgroundColor: "#11284b",
            color: "white",
            '& a': {
                color: "white"
            },
            "& svg": {
                color: "white",
            }
        },
        newAddBtnLink: {
            color: "white",
        },
    },
    title: {
        marginRight: "10px",
        paddingTop: "17px",
        margin: "0px",
        fontFamily: "Lato",
        fontSize: 14,
        color: "#25282B",
        fontWeight: "bold",
    },
    dropZone: {
        marginBottom: "20px",
        width: "100%",
        padding: "30px",
        border: "3px dashed #B4B4B4",
        background: "#E1E1E1",
        borderRadius: 16,
        textAlign: 'center',
    },
    dropZoneMessage: {
        textAlign: "center",
        color: "#919191",
        fontSize: "14px",
        fontWeight: 400,
        paddingTop: "50px",
        fontFamily: "Lato",
        fontStyle: "normal",
    }
}));
