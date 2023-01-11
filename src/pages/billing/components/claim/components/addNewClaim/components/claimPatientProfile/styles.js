import { FormatSize, LineWeight } from "@material-ui/icons"
import { makeStyles } from "@material-ui/styles"

export default makeStyles((theme) => ({
    mainCard: {
        maxWidth: "100%",
        width: "100%",
        borderRadius: "5px",
        backgroundColor: "#F8F8F8",
    },
    mainContentArea: {
        width: "100%",
        minWidth: "100%",
        maxWidth: "100%",
        height: "auto",
        margin: "15px 0px 15px 0px",
        position: "relative",
        // transition: "width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms"
    },
    centerGrid: {
        // width:"100%",
        padding: "0px 30px 0px 0px",
        //marginTop:"15px",
        [theme.breakpoints.down("sm")]: {
            // margin:"5px 10px",
        },
        [theme.breakpoints.down("md")]: {
            //margin:"5px 10px",
        },
    },
    avatarImage: {
        backgroundColor: "transparent",
        //padding: "50px 0px 0px 50px",
        width: "100px",
        height: "100px"
    },
    avatarImageRoot: {
        backgroundColor: "transparent",
        margin: "0px 0px 0px 0px",
        width: "100%",
        height: "100%",
        maxWidth: "100px",
        maxHeight: "100px",
        "& img": {
            maxWidth: "100px",
            maxHeight: "100px",
        },
        [theme.breakpoints.down("sm")]: {
            width: "40px",
            height: "40px",
            margin: "30px 0px 0px 10px",
        },
    },
    customavatarImageRoot: {
        backgroundColor: "transparent",
        margin: "0px",
        width: "55px",
        height: "55px",
        margin: "-12px 0px 0px 0px"
    },
    patientName: {
        fontFamily: "Lato",
        fontSize: "14px",
        textAlign: "left",
        color: "#00B4E5",
        "& span": {
            cursor: "pointer"
        }
    },
    Detail: {
        fontFamily: "Lato",
        fontSize: "12px",
        textAlign: "left",
        color: "#25282B",
        paddingRight: "10px",
        maxWidth: "50%"
    },
    Btn: {
        // width:"112px",
        // height:"32px",
        borderRadius: "8px",
        border: "1px solid #11284B",
        margin: "0px 0px 0px 10px",
        color: "#11284B",
        backgroundColor: "#F9F9F9",
        boxSizing: "border-box",
        fontSize: 15,
        fontFamily: "Lato",
        textTransform: "none",
        padding: "0 12px",
        position: "relative",
        top: "2px",
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
        newAddBtnLink: {
            color: "11284B",
        },
    },
    linkItem: {
        color: "#11284B",
        textDecoration: "none",
        '&:hover': {
            backgroundColor: "#11284b",
            color: "white",
        }
    },
    shiftContent: {
        [theme.breakpoints.down("sm")]: {
            justifyContent: "flex-start"
        },
        // [theme.breakpoints.down("md")]: {
        //   justifyContent:"flex-start"},
    },
    closedViewItemsAera: {
        display: "block",
        width: "100%"
    },
    closedViewDetailsItemsAera: {
        display: "block",
        minWidth: "100%"
    },
    closedViewItemsInnerAera: {
        display: "flex"
    },
    insuranceLabel: {
        // fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "12px",
        color: "#52575C",
        paddingRight: "5px"
    },
    insuranceName: {
        // fontFamily: "Lato",
        fontStyle: "normal",
        fontweight: "normal",
        fontSize: "12px",
        color: "#00B4E5",
        cursor: "pointer"
    },
    altAvatarImage: {
        width: "55px",
        height: "55px"
    },
    dialogPaper: {
        maxWidth: '80%',
    },
    dialogcontent: {
        padding: "16px 24px 10px 24px"
    },
    box: {
        display: "flex",
        flexFlow: "column",
        height: "100%",
    },
    header: {
        flex: "0 1 auto",
        display: "flex",
        cursor: "move",
    },
    content: {
        flex: "1 1 auto",
        minHeight: "200px",
        overflow: "auto",
        marginBottom: "10px"
    },
    crossButton: {
        position: "relative",
        top: "-12px",
        right: "10px",
        cursor: "pointer",
        padding: "3px",
        zIndex: "2",
        display: "block",
        "& :hover": {
            backgroundColor: "#F4F4F4",
        }
    },
    userDp: {
        width: 55,
        borderRadius: "50%",
        border: "1px solid #f0eaea",
    },
}))