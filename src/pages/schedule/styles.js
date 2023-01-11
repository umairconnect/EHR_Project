import { Block } from "@material-ui/icons";
import {
    makeStyles
} from "@material-ui/styles";
export default makeStyles(theme => ({
    pageTitleContent: {
        textAlign: "center",
        marginTop: "10%"
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
    activeView: {
        backgroundColor: '#d9dfdf !important',
        '& img': {
            float: 'left',
            marginRight: '10px',
        }
    },
    customTooltip: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
        fontFamily: "Lato",
        lineHeight: "20px",
        whiteSpace: "pre-line",
    },
    schedulerdate: {
        border: "1px solid #ccc",
        borderRadius: "4px",
        display: "inline-block",
        padding: "4px 10px 2.6px 10px",
        height: "31.3px",
    },
    schedulerdateIcon: {
        float: "left",
        marginRight: "10px"
    },
    positionRelative: {
        position: "relative",
        height: 0,
    },
    toggleBtn: {
        fontSize: "13.3333px !important",
        textTransform: "none !important",
        fontWeight: "400 !important",
        minHeight: "32px",

    },
    filterBox: {
        display: "block",
        borderRadius: "8px",
        boxShadow: " 0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)",
        backgroundColor: "#fff",
        border: "1px solid #DDD",
        marginBottom: 12,
        fontSize: "Lato"
    },
    filterHeader: {
        display: "block",
        minHeight: 38.6,
        borderRadius: "8px 8px 0px 0px",
        backgroundColor: "#FAFAFA",
        borderBottom: "1px solid #DDD",
        padding: "10px 12px 7px 12px"
    },

    filterHeaderTitle: {
        color: "#25282B",
        fontSize: "14px",
        fontWeight: "600"
    },
    filterHeaderRight: {
        float: "right",
        color: "#11284B",
        fontSize: "12px",
        "& span": {
            display: "inline-block",
            marginLeft: 7,
        }
    },
    filterSelectAll: {
        cursor: "pointer",
        "&:hover": {
            color: "#00B4E5",
        }
    },
    filterNone: {
        color: "#00B4E5",
        cursor: "pointer",
        "&:hover": {
            color: "#11284B",
        }

    },
    filterBody: {
        display: "block",
        minHeight: 50,
        borderRadius: "0px 0px 8px 8px",
        overflow: "hidden",
        paddingBottom: 8,
        "& .MuiFormControlLabel-label": {
            fontSize: 12,

            color: "#11284B"
        }
    },
    listViewIcon: {
        float: "left",
        marginRight: 9
    },
    printerIcon: {
        float: "left",
        marginRight: 10
    },

}));
