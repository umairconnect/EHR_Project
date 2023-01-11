import {
    makeStyles
} from "@material-ui/styles";

export default makeStyles(theme => ({
    gridRelative: {
        position: "relative",
        display:'flex',
        justifyContent:'center'
    },
    inputFile: {
        display: "none",
    },
    uploadImageLabel: {
        position: "absolute",
        display: "block",
        // right: "15%",
        cursor: "pointer"
    },
    uploadImageIcon: {
        position: "absolute",
        bottom: "7px",
        left: "35px",
        right: "auto",
        fontSize: 24,
        color: "#00b2e3",
    },
    uploadImage: {
        width: 90,
        height: 90,
        borderRadius: "50%",
        border: "1px solid #d9dfdf",
    },
    uploadImageBox: {
        width: 90,
        height: 90,
        borderRadius: "50%",
        border: "1px solid #d9dfdf",
        backgroundColor: "#f3f3f3",
    },

    baseInput: {
        border: "1px solid #DDDDDD",
        borderRadius: "4px",
        // padding: " 3px 12px",
        width: "100%",
        fontFamily: "Lato",
        backgroundColor: "white",
        marginBottom: 4,
        "& .MuiInputBase-input": {
            padding: "9.5px 12px",
            fontSize: "14px",
            color: "#4A4A4A",
            '&:focus': {
                border: "1px solid #00b2e3",
                borderRadius: "4px",
                outline: 0,
            },
        },

        "& .Mui-disabled": {
            backgroundColor: "#f3f3f3",
            color: "#4A4A4A"
        },
    },

    baseInputDate: {
        border: "1px solid #DDDDDD",
        borderRadius: "4px",
        // padding: " 3px 12px",
        width: "100%",
        fontFamily: "Lato",
        backgroundColor: "white",
        marginBottom: 4,
        
        "& .MuiInputBase-input": {
            padding: "9.5px 12px",
            fontSize: "14px",
            color: "#4A4A4A",
            '&:focus': {
                border: "1px solid #00b2e3",
                borderRadius: "4px",
                outline: 0,
            },
        },

        "& .Mui-disabled": {
            backgroundColor: "#f3f3f3",
            color: "#4A4A4A"
        },
    },

    footerBtn: {
        padding: " 0px 0 7px",
        position: "fixed",
        bottom: "0px",
        zIndex: 9999,
        // backgroundColor: "#f3f3f3",
        // width: "82%",
        // justifyContent: "center",
        // alignItems:" center",
        // paddingLeft:"13.1%",
        display: "flex",
        // [theme.breakpoints.down("sm")]: {
        //     paddingLeft: 0
        // },
    },
    ResponsivelabelAlign: {
        alignItems: "flex-end",
        [theme.breakpoints.down("xs")]: {
            padding: "0px 0px 20px 50px",
            justifyContent: "flex-start",
        },
    },

    shadowBoxWidth: {
        flexGrow: 1,

    },
    formAlignment: {
        marginBottom: "-30px"
    },
}));
