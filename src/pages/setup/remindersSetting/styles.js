import { makeStyles } from "@material-ui/styles";

export default makeStyles(({
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
    innerContainer: {
        margin: "35px"
    },
    subTitle: {
        // font-family: 'Lato',
        fontStyle: "normal",
        fontWeight: 700,
        fontSize: "14px",
        lineHeight: "17px",
        color: "#25282B",
        padding: "5px 0px 10px"
    },
    content: {
        display: "flex",
        paddingLeft: "50px",
        flexDirection: "column",
        // margin: '0px 0px 15px'
    },
    checkBoxContent: {
        display: "flex",
        flexDirection: "column",
        margin: '10px 0px 10px 25px',
        "& .MuiTypography-root": {
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "17px",
            color: "#25282B",
        }
    },
    noteText: {
        // fontFamily: 'Lato',
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: "14px",
        lineHeight: "17px",
        color: "#505255",
        padding: "15px 0px"
    },
    subContent: {
        display: "flex",
        flexDirection: "column",
        paddingLeft: "55px",
        "& .MuiFormControlLabel-root": {
            padding: "20px 0 0"
        }
    },
    boldSwitch: {
        "& .MuiTypography-root": {
            fontWeight: "bold",
        }
    }
}))