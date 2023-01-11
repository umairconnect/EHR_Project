import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
    shadowBox: {
        margin: "0px 15px",
        padding: "20px 15px",
        borderRadius: "10px"
    },
    box: {
        display: "flex",
        flexFlow: "column",
        height: "100%",
    },
    header: {
        flex: "0 1 auto",
        cursor: "move",
        padding: "0px 8px 0px 15px"
    },
    content: {
        flex: "1 1 auto",
        minHeight: "200px",
        overflow: "!important",
    },
    footer: {
        flex: "0 1 40px",
    },
    footerRight: {
        float: "right",
        marginRight: "-8px"
    },
    divider: {
        width: "100%",
        height: "1px",
        borderTop: "1px solid #E8E8E8",
        margin: "6px 0px 16px"
    },
    divider2: {
        width: "100%",
        height: "1px",
        borderTop: "1px solid #E8E8E8",
        margin: "12px 0px 8px"
    },
    addIcon: {
        margin: "10px 0px 0px 10px",
        cursor: "pointer"
    },
    providerList: {
        margin: "5px 1px 10px 1px",
        padding: "0px",
        listStyle: "none",
        display: "flex",
        flexWrap: "wrap",
        "& li": {
            color: '#5D8AB5',
            // height: "35px",
            minHeight: "30px",
            outline: 0,
            // padding: "0 12px 0 12px",
            padding: "5px 30px 5px 12px",
            position: "relative",
            fontSize: "12px",
            background: "#f6f6f6",
            fontWeight: "700",
            border: "1px solid #E1E1E1",
            boxSizing: "border-box",
            boxShadow: "0px 2px 10px rgb(0 0 0 / 10%)",
            borderRadius: "25px",
            minWidth: "115px",
            // maxWidth: "220px",
            // width: "120px",
            margin: "4px 4px 4px 0px"
        },
    },
    percentLabel: {
        height: "100%",
        // marginTop: "6%",
        textAlign: "end",
        right: "20px",
        position: "relative",
        color: "#3E3E3E",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "14px",
        display: "flex",
        alignItems: "center",
        justifyContent: 'center'
    },
    btnSpan: {
        display: "flex",
        width: "100%"
    },
    attachmentBtn: {
        // position: "absolute",
        padding: "8px",
        // right: "50px",
    }, addNew: {
        cursor: "pointer",
        color: "#00B4E5",
        lineHeight: "40px",
        minWidth: "150px",
        fontSize: "14px",
        "& img": {
            width: "17px",
            height: "17px",
            margin: "3px 5px 5px 10px",
        }
    },
    Btn1: {
        backgroundColor: '#11284b',
        textTransform: 'none',
        borderColor: '#11284b',
        color: 'white',
        marginRight: 8,
        minWidth: 90,
        padding: "6px 16px",
        fontFamily: "Lato",
        height: "35.63px",
        '&:hover': {
            backgroundColor: '#596270',
            borderColor: '#11284b',
            color: 'white',
        },
        "&:disabled": {
            backgroundColor: '#596270',
            borderColor: '#11284b',
            color: 'white',
        }
    },
    Btn: {
        borderRadius: "8px",
        border: "1px solid #11284B",
        margin: "0px 0px 0px 10px",
        color: "#11284B",
        backgroundColor: "#F9F9F9",
        boxSizing: "border-box",
        fontSize: 15,
        fontFamily: "Lato",
        textTransform: "none",
        padding: "6px 16px",
        height: "35.63px",
        position: "relative",
        '& a svg': {
            float: "left",
            marginRight: 5,
        },
        '&:hover': {
            backgroundColor: "#11284b",
            color: "white",
            '& a': {
                color: "white",
            },
        },
    },
    scrollbarsInnerGrid: {
        margin: "10px 0px"
    },
    deleteIcon: {
        cursor: "pointer",
        // right: "7px",
        // paddingTop: "5px",
        // position: "absolute",
        color: "#FD5F5F",
        // justifyContent: "center",
        right: "-7px",
        position: "absolute",
        paddingTop: 0,
        top: "50%",
        transform: "translate(-50%,-45%)",
        "& svg": {
            transform: "rotate(45deg)",
        },
    },
    posSpan: {
        width: "95px",
        maxWidth: "95px",
        display: "inline-block",
        "& .MuiAutocomplete-root": {
            "& .MuiInputBase-root": {
                "& .MuiInputAdornment-root": {
                    display: "none"
                }
            },
        },
    },
    Icon: {
        width: "18px",
        height: "18px",
        cursor: "pointer"
    },
}));