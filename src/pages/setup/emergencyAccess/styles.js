import {
    makeStyles
} from "@material-ui/styles";

export default makeStyles(theme => ({
    pageTitleContent: {
        textAlign: "center",
        marginTop: "10%"
    },
    newAddBtn: {

        color: "white",
        height: "30px",
        margin: "4.5px 16px 0",
        padding: "0 12px",
        fontSize: "12px",
        fontFamily: "Lato",
        textTransform: "none",
        backgroundColor: "#11284B",
        borderRadius: "4px",

        '&:hover': {
            backgroundColor: "#596270",
            color: "white",
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


    positionRelative: {
        position: "relative",
    },
    gridTitle: {
        fontWeight: "600",
        color: "#25282B",
        width: "100%",
        position: "relative",
        fontSize: "16px",
        marginBottom: "12px",

    },
    textRight: {
        textAlign: "right",
    },
    editIcon: {
        width: "20px",
        textAlign: "center",
        cursor: "pointer",
    },

    logoffIcon: {
        width: "20px",
        textAlign: "center",
        cursor: "pointer",
        marginRight: "10px",
    },
    newAddBtn2: {
        width: "112px",
        height: "32px",
        borderRadius: "8px",
        border: "1px solid #11284B",
        margin: "0px 0px 16px 5px",
        color: "#11284B",
        backgroundColor: "#F9F9F9",
        boxSizing: "border-box",
        fontSize: 15,
        fontFamily: "Lato",
        textTransform: "none",
        padding: "0 12px",
        position: "relative",
        top: "3px",

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

    tableArea: {
        width: "100%",
        margin: "10px 0px"
    },
    tableHeading: {
        height: "41px",
        minWidth: "100%",
        background: "#11284B",
        border: "1px solid #E1E1E1",
        boxSizing: "border-box",
        padding: "10px 7px 7px 20px"
    },
    tableHeader: {

        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "16px",
        lineHeight: "19px",
        color: "#F2F2F2",
    },

    switchroot: {
        width: "47px",
        height: "22",
        padding: "0",
        zIndex: "1000",
        margin: "0px 0px 0px 0%",
        position: "relative",
        top: "10px",
        "& Mui-disabled": {
            color: '#bdbdbd !important',
        },
        "& .MuiSwitch-switchBase.Mui-disabled + .MuiSwitch-track": {
            opacity: 0.12
        },
        "& .MuiSwitch-colorSecondary.Mui-disabled + .MuiSwitch-track": {
            backgroundColor: "#000"
        },
        "& .MuiSwitch-colorSecondary.Mui-disabled": {
            color: '#bdbdbd'
        }
    },
    switchBase: {
        padding: 1,
        zIndex: 1000,
        transform: 'translateX(-8px)',
        '&$checked': {
            transform: 'translateX(16px)',
            color: theme.palette.common.white,
            '& + $track': {
                backgroundColor: '#00B2E3',
                opacity: 1,
                border: 'none',
            },
            "&:disabled": {
                color: '#bdbdbd !important',
            }
        },
        '&$focusVisible $thumb': {
            color: '#52d869',
            border: '6px solid #fff',
        },
        "&:disabled": {
            color: '#bdbdbd !important',
        }
    },

    thumb: {
        width: 19,
        height: 19,
    },
    track: {
        borderRadius: 26 / 2,
        border: `1px solid ${theme.palette.grey[400]}`,
        backgroundColor: "#C4C4C4",
        opacity: 1,
        height: "22px",
        transition: theme.transitions.create(['background-color', 'border']),
        "&:disabled": {
            backgroundColor: '#000 !important',
            opacity: "0.12 !important",

        }
    },
}));