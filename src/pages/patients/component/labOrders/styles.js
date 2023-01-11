import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
    newAddBtn2: {
        width: "112px",
        height: "32px",
        borderRadius: "8px",
        border: "1px solid #11284B",
        margin: 0,
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
        newAddBtnLink: {
            // color:"#11284B"
            color: "white",
        }
    },
    dataTable: {
        width: "100%",
        marginTop: "10px"
    },
    btnIconRoot: {
        overflow: "visible"
    },
    BtnIcon: {
        width: "18px",
        height: "18px",
        cursor: "pointer"
    },
    faxButton: {
        color: "#11284B",
        height: "32px",
        minWidth: "30px",
        margin: "0px 0px 0px 5px",
        backgroundColor: "#F9F9F9",
        boxSizing: "border-box",
        border: "1px solid #11284B",
        borderRadius: "8px",
        //marginTop: "12px",
        // borderRight:"1px solid #C4C4C4",
        fontSize: 15,
        fontFamily: "Lato",
        textTransform: "none",
        // padding: "0 12px",
        padding: "0 12px 0 14px",
        position: "relative",
        '& .MuiButton-startIcon': {
            // margin: "0px"
        },
        newAddBtnLink: {
            color: "white",
        },
    },
    menuBtn: {
        backgroundColor: '#11284b',
        textTransform: 'none',
        borderColor: '#11284b',
        color: 'white',
        marginRight: 8,
        minWidth: 35,
        padding: "5px",
        fontFamily: "Lato",
        borderLeft: "1px solid #FFFFFF",
        '&:hover': {
            backgroundColor: '#596270',
            borderColor: '#11284b',
            color: 'white',
        },
        '& .MuiButton-endIcon': {
            margin: '0px'
        }
    },
    signBtn: {
        backgroundColor: '#11284b',
        textTransform: 'none',
        borderColor: '#11284b',
        color: 'white',
        minWidth: 90,
        padding: "6px 16px",
        fontFamily: "Lato",
        borderLeft: "1px solid #FFFFFF",
        '&:hover': {
            backgroundColor: '#596270',
            borderColor: '#11284b',
            color: 'white',
        },
    },
    btnGroup: {
        height: "40px",
        padding: "0px 10px 0px 10px",
        color: "#F6F6F6",
        background: "#F7F7F7",
        border: "1px solid #E1E1E1",
        "& .MuiButtonGroup-grouped": {
            minWidth: "25px"
        }
    },
    imgBtnIcon: {
        width: "18px",
        height: "18px",
        marginTop: "10px",
        cursor: "pointer"
    },
    splitBtn: {
        color: "black",
        margin: "8px -5px 0px -2px",
        cursor: "pointer"
    },
    customGrid: {
        marginBottom: "2px"
    }
}));