import { makeStyles } from '@material-ui/styles';

export default makeStyles(theme => ({
    pageTitleContent: {
        textAlign: "center",
        marginTop: "10%"
    },
    positionRelative: {
        position: "relative",
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

    footer: {
        width: "100%",
        margin: "auto",
        paddingTop: "15px",
    },
    newAddBtn2: {
        width: "112px",
        height: "32px",
        borderRadius: "8px",
        border: "1px solid #11284B",
        margin: "0px 0px 0px 5px",
        color: "#11284B",
        backgroundColor: "#F9F9F9",
        boxSizing: "border-box",
        fontSize: 15,
        fontFamily: "Lato",
        textTransform: "none",
        padding: "0 12px",
        position: "absolute",
        top: "2px",
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
    Htabs: {
        "& button": {
            textTransform: "capitalize",
            color: "#25282B",
            fontFamily: "Lato",
            width: "150px",
            maxWidth: "50px",
            fontSize: "14px",
            opacity: "1",
            height: "36px"
        },
        "& button.Mui-selected": {
            fontWeight: 700,
            color: "#11284B",
            // backgroundColor: "#00B2E3",
            borderRadius: " 0px 10px 0px 0px",
        },
        "& button.Mui-selected:first-child": {
            borderRadius: "10px 0px 0px 0px",
        },
        "& .MuiTabs-indicator": {
            backgroundColor: "#00B2E3",
            color: "#11284B",
            // borderRadius:"10px 10px 0px 0px",
            // height: "100%",
        },
        "& .MuiTab-root": {
            minWidth: "150px"
        }
    },
    tabRoot: {
        maxWidth: "100%",
        top: '35px',
        position: 'relative',
        borderBottom: '1px solid #A3A3A3',
        marginBottom: '5px',
        minHeight: '36px'
    },
    tabPanel: {
        marginTop: "-15px"
    },
    //
    innerContainer: {
        marginTop: "50px",
        padding: "15px",
        "& .MuiFormGroup-root": {
            flexDirection: "column !important"
        },
        "& .MuiFormControlLabel-root": {
            marginTop: "2px",
            "& .MuiRadio-root": {
                padding: "6.5px 9px"
            }
        }
    },
    subTitle: {
        // font-family: 'Lato',
        fontStyle: "normal",
        fontWeight: 700,
        fontSize: "14px",
        lineHeight: "17px",
        color: "#11284B",
        padding: "5px 0px"
    },
    content: {
        display: "flex",
        paddingLeft: "30px",
        flexDirection: "column",
        // margin: '0px 0px 15px'
    },
    noteText: {
        // fontFamily: 'Lato',
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: "14px",
        lineHeight: "20px",
        color: "#2A2D30",
        padding: "10px 0px 10px 0px"
    },
}))