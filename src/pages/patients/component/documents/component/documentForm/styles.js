import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    dialogPaper: {
        minWidth: "900px"
    },
    dialogContent: {
        // minHeight: "660px",
        // minWidth: "950px",
        padding: "15px",
        // overflow: "auto"
    },
    box: {
        display: "flex",
        flexFlow: "column",
        // height: "100%",
        backgroundColor: "#FFFFFF"
    },
    header: {
        flex: "0 1 auto",
        cursor: "move"
    },
    content: {
        flex: "1 1 auto",
        // maxHeight: "450px",
        minHeight: "200px",
        overflow: "auto",
        marginBottom: "10px",
        // overflow: "initial !important",
        // height: "initial !important",
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
    image: {
        minWidth: "350px",
        maxWidth: "350px",
        minHeight: "350px",
        maxHeight: "350px",
    },
    imageArea: {
        minWidth: "350px",
        maxWidth: "350px",
        minHeight: "350px",
        maxHeight: "350px",
        marginBottom: "5px",
        border: "1px solid #DDDDDD",
    },
    imageLink: {
        minWidth: "90%",
        maxWidth: "100%",
        maxHeight: "100%",
        minHeight: "350px",
        marginBottom: "5px",
        borderRadius: "5px",
    },
    logo: {
        minWidth: "150px",
        maxWidth: "150px",
        maxHeight: "150px",
        minHeight: "150px",
        marginBottom: "5px",
        margin: "30px 0px 0px 100px",
        borderRadius: "5px",
    },
    lableInput: {
        lineHeight: "40px",
        paddingRight: 15,
        fontFamily: "Lato",
        color: "#25282B",
        fontSize: 14,
        marginBottom: 13,
        //[theme.breakpoints.down("sm")]: {
        //    lineHeight: "25px",
        //    paddingRight: 5,
        //},
        //[theme.breakpoints.down("md")]: {
        //    lineHeight: "25px",
        //    paddingRight: 5,
        //},
    },
    customLableInput: {
        lineHeight: "20px",
        paddingRight: 5,
        fontFamily: "Lato",
        color: "#25282B",
        fontSize: 14,
        marginBottom: 13,
        [theme.breakpoints.down("sm")]: {
            lineHeight: "20px",
            paddingRight: 5,
        },
        [theme.breakpoints.down("md")]: {
            lineHeight: "20px",
            paddingRight: 5,
        },
    },
    labelAlign: {
        justifyContent: "flex-end",
        [theme.breakpoints.down("xs")]: {
            justifyContent: "flex-start",
        },
    },
    header: {
        flex: "0 1 auto",
    },
    crossButton: {
        position: "absolute",
        top: "8px",
        right: "23px",
        cursor: "pointer",
        padding: "3px",
        zIndex: "2",
        display: "block",
        "& :hover": {
            backgroundColor: "#F4F4F4",
        }
    },
    uploadImageBox: {
        width: 90,
        height: 90,
        borderRadius: "50%",
        border: "1px solid #d9dfdf",
        backgroundColor: "#f3f3f3",
    },
    formLabelTitle: {
        lineHeight: "40px",
        paddingRight: 15,
        textAlign: "right",
        fontWeight: "bold",
        fontFamily: "Lato",
        color: "#3E3E3E",
        fontSize: 14,
        marginBottom: 13,
        textAlign: 'right',
        //[theme.breakpoints.down("sm")]: {
        //    lineHeight: "25px",
        //    paddingRight: 5,
        //},
        //[theme.breakpoints.down("md")]: {
        //    lineHeight: "25px",
        //    paddingRight: 5,
        //},
    },
    IconBtn: {
        marginLeft: "10px",
        color: "#FFFFFF",
        backgroundColor: "#00B4E5",
        "&:hover": {
            color: "#FFFFFF",
            backgroundColor: "#00B4E5",
        }
    },
    iconBtnRoot: {
        "&:hover $icon": {
            color: "#FFFFFF",
            backgroundColor: "#00B4E5",
        }
    },
    footerBtn: {
        margin: "-60px 0px 0px 115px"
    },
}));
