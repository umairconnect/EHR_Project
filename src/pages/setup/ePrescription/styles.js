import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    ePrescriptionMainForm: {
        margin: 10,
    },
    noteTextArea: {
        padding: "10px 0px 15px 20px"
    },
    noteText: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "14px",
        lineHeight: "21px",
        color: "#52575C",
    },
    subTitle: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "14px",
        lineHeight: "21px",
        color: "#25282B",
    },
    innerArea: {
        paddingLeft: "20px",
        display: "block"
    },
    divAlignemnt: {
        padding: "15px 0px"
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
}));