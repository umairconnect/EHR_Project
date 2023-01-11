import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
    dialogPaper: {
        width: "80%",
        // height: "95vh",
        // minHeight: '90vh',
        maxWidth: '80%',
        maxHeight: "calc(100% - 14px)",
    },
    tempDialogPaper: {
        width: "30%",
        maxWidth: '30%',
        padding: "22px 20px"
    },
    //New Styles.
    DialogContent: {
        minWidth: "950px",
        display: "flex",
    },
    DialogContentLeftSide: {
        flex: "1",
        backgroundColor: "#F4F4F4",
        padding: "12px 10px 5px 10px",
        maxWidth: "400px",
        flexBasis: "400px",
        // minHeight:"521px",
    },
    DialogContentRightSide: {
        flex: "1",
        backgroundColor: "#fff",
        padding: "20px 10px 5px 10px",
        // minHeight:"521px",
    },
    box: {
        display: "flex",
        flexFlow: "column",
        height: "100%",
    },
    header: {
        flex: "0 1 auto",
        cursor: "move"
    },
    content: {
        flex: "1 1 auto",
        maxHeight: "575px",
        minHeight: "575px",
        overflow: "initial !important",
        marginBottom: "10px"
    },
    Templatecontent: {
        flex: "1 1 auto",
        marginBottom: 0,
        padding: "10px",
        overflow: "initial !important",
    },
    footer: {
        flex: "0 1 40px",
    },
    footerRight: {
        display: "flex",
        float: "right",
        marginRight: "-8px"
    },
    crossButton: {
        position: "absolute",
        top: "8px",
        right: "10px",
        cursor: "pointer",
        padding: "3px",
        zIndex: "2",
        display: "block",
        "& :hover": {
            backgroundColor: "#F4F4F4",
        }
    },
    lableInput: {
        paddingRight: 19,
        fontFamily: "Lato",
        color: "#25282B",
        fontSize: 14,
        paddingTop: "10px",
        minHeight: "40px",
        textAlign: "right",
        display: "block"
    },
    deleteIcon: {
        float: "right",
        cursor: "pointer",
        paddingTop: 10,
        "& img": {
            width: "18px",
            height: "18px",
        }
    },
    lableInput: {
        cursor: "pointer",
        margin: "4px 0px 10px 15px",
        fontFamily: "Lato",
        fontWeight: "bold",
        color: "#11284B",
        fontSize: 14,
        //paddingTop:"10px",
        //lineHeight:"40px",
        //minHeight:"40px",
        display: "block"
    },
    orderTest: {
        minWidth: "100%",
        // width: "100%",
        // height: "200px",
        // width: "100%",
    },
    orderTestHeader: {
        backgroundColor: "#E0E0E0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        minWidth: "100%",
        height: "30px",
        "& .MuiTypography-subtitle1": {
            margin: "0px 0px 0px 10px",
            cursor: "pointer",
            fontFamily: "Lato",
            fontWeight: "bold",
            color: "#11284B",
            fontSize: 14,
        }
    },
    orderTestContent: {
        backgroundColor: "#FFFFFF"
    },
    orderList: {
        margin: "5px 1px 10px 1px",
        //padding:"0 15px 0 7px",
        padding: "0px",
        listStyle: "none",
        // maxHeight: "128px",
        // height: "85px",
        // overflow: "auto",

        "& li": {
            // position: "relative",
            height: "40px",
            fontSize: "12px",
            color: "#000",
            fontWeight: "700",
            // lineHeight: "40px",
            // margin: 0,
            // outline: 0,
            padding: "0 12px 0 12px",
            // listStyle: "none",
            marginTop: 2,
            borderRadius: "0px",
            boxShadow: "0px 1px 1px 0 rgb(0 0 0 / 10%)",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
    },
    editIcon: {
        // top: "50%",
        // right: "50px",
        // position: "absolute",
        // transform: "translateY(-50%)",
        // width: "14px",
        // display: "inline-flex",
        // cursor: "pointer",
        "& .MuiFormControlLabel-root": {
            marginRight: 0,
        }
    },
    deleteIcon: {
        //float: "right",
        cursor: "pointer",
        // right: "15px",
        // paddingTop: "5px",
        // position: "absolute",
        // paddingTop: 5,
        "& img": {
            width: "18px",
            height: "18px",
        }
    },
    formTitle: {
        position: 'relative',
        width: "100%",
        color: "#25282B",
        fontSize: 15,
        fontWeight: "600",
        marginBottom: 12,
        paddingBottom: "5px"
    },
    baseLine: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 1,
        backgroundColor: "#DDDDDD",
        zIndex: 1
    },
    orderTestCheckBox: {
        // top: "32%",
        marginTop: "-40px",
        right: "50px",
        float: "right",
        // position: "absolute",
        // transform: "translateY(-50%)",
        //width:"14px",
        display: "inline-flex",
        cursor: "pointer",
    },
    lableInputOrderTest: {
        margin: "9px 6px 0px 0px",
        cursor: "pointer",
        fontFamily: "Lato",
        fontWeight: "bold",
        color: "#11284B",
        fontSize: 14,
        display: "block"
    },
    orderDisgnosisCheckBox: {
        top: "32%",
        right: "79px",
        position: "absolute",
        transform: "translateY(-50%)",
        width: "14px",
        display: "inline-flex",
        cursor: "pointer",
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
        borderLeft: "1px solid #fff",
        '&:hover': {
            backgroundColor: '#596270',
            borderColor: '#11284b',
            color: 'white',
        },
        '& .MuiButton-endIcon': {
            margin: '0px'
        }
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
    signBtn: {
        backgroundColor: '#11284b',
        textTransform: 'none',
        borderColor: '#11284b',
        color: 'white',
        minWidth: 90,
        padding: "3px",
        fontFamily: "Lato",
        padding: "6px 16px",
        borderLeft: "1px solid #FFFFFF",
        marginRight: "8px",
        '&:hover': {
            backgroundColor: '#596270',
            borderColor: '#11284b',
            color: 'white',
        },
        "&:disabled": {
            backgroundColor: '#596270',
            borderColor: '#11284b',
            color: 'white',
          },
    },
    // btnDisable: {
    //     backgroundColor: '#11284b',
    //     textTransform: 'none',
    //     borderColor: 'white',
    //     color: 'rgba(0, 0, 0, 0.26) !important',
    //     minWidth: 90,
    //     padding: "3px",
    //     fontFamily: "Lato",
    //     padding: "6px 16px",
    //     borderLeft: "1px solid #FFFFFF",
    //     marginRight: "8px",
        
    // },
}))