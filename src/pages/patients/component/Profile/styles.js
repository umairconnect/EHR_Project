import { FormatSize, LineWeight } from "@material-ui/icons"
import { makeStyles } from "@material-ui/styles"

export default makeStyles((theme) => ({
    collapseArea: {
        maxWidth: "100%",
        width: "100%",
        minHeight: "20%",
        maxWidth: "100%",
        height: "100%",
        borderRadius: "5px",
        backgroundColor: "#F8F8F8",
        border: "1px solid #E1E1E1",
        margin: "0px 0px 10px 0px",
        // transition: "width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms"   
    },
    mainCard: {
        //height:"185px",
        maxWidth: "100%",
        width: "100%",
        borderRadius: "5px",
        backgroundColor: "#F8F8F8",
        // border: "1px solid #E1E1E1",
        // margin:"0px 0px 10px 0px",
        // transition: "width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms"        
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
        // padding: "50px 0px 0px 50px",
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
    Name: {
        fontFamily: "Lato",
        fontSize: "14px",
        textAlign: "left",
        color: "#25282B",
    },
    Detail: {
        fontFamily: "Lato",
        fontSize: "12px",
        textAlign: "left",
        color: "#25282B",
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
                color: "white"
            },
        },
        newAddBtnLink: {
            color: "11284B",
        },
    },
    linkItem: {
        color: "#11284B",
        '&:hover': {
            backgroundColor: "#11284b",
            color: "white",
        },
        '&:disabled': {
            color: "#c7c3c3"
        }
    },
    Icon: {
        padding: "0px 20px 0px 0px"
    },
    PersonalDetail: {
        marginTop: 4,
        padding: "0px 10px 0px 5px",
        fontFamily: "Lato",
        fontSize: "12px",
        textAlign: "left",
        color: "#52575C",
        wordBreak: "break-all"
    },
    boxRoot: {
        margin: "0px 0px 10px 0px"
    },
    Title: {
        // marginTop: "10px",
        lineHeight: "28px",
        fontFamily: "Lato",
        fontSize: "12px",
        float: "left",
        color: "#25282B",
        fontWeight: 700,
        marginRight: "5px"
    },
    TitleDetail: {
        color: "#1054AE",
        padding: "0 10px 0 0",
        fontFamily: "Lato",
        fontSize: "12px",
        color: "#52575C",
        lineHeight: "28px",
        fontWeight: 400,
    },
    customTitleDetail: {
        color: "#1054AE",
        margin: 0,
        fontFamily: "Lato",
        lineHeight: "28px",
        fontSize: "12px",
        fontWeight: 400,
        "& hover": {
            color: "#00B4E5",
        }
    },
    customTitleDetail2: {
        color: "#979797",
        margin: 0,
        fontFamily: "Lato",
        lineHeight: "28px",
        fontSize: "12px",
        fontWeight: 400,
    },
    customTitleblack:{
        color: "#25282B",
        margin: 0,
        fontFamily: "Lato",
        lineHeight: "28px",
        fontSize: "12px",
        fontWeight: 400,
    },
    DateDetail: {
        minWidth: "67px",
        color: "#1054AE",
        margin: "0px 0px 0px 10px",
        fontFamily: "Lato",
        fontSize: "12px",
        textAlign: "left",
        color: "#52575C",
    },
    btnIconRoot: {
        overflow: "visible"
    },
    BtnIcon: {
        marginTop: "4px",
        width: "18px",
        height: "18px"
    },
    groupBtnIcon: {
        // marginTop:"8px",
        width: "18px",
        height: "18px"
    },
    cardButton: {
        color: "#11284B",
        borderRadius: "0px",
        backgroundColor: "#F9F9F9",
        boxSizing: "border-box",
        borderRight: "1px solid #C4C4C4",
        fontSize: 15,
        fontFamily: "Lato",
        textTransform: "none",
        padding: "0 12px",
        position: "relative",
        // '&:hover': {
        //   backgroundColor:"#11284b",
        //   color: "white",
        // },
        newAddBtnLink: {
            color: "white",
        },

    },
    secondaryCardRoot: {
        borderRadius: "10px",
        border: "1px solid #C4C4C4",
        backgroundColor: "#F8F8F8"
    },
    secondaryCard: {
        marginTop: 10,
        borderRadius: "20px",
        border: "1px solid #C4C4C4",
        backgroundColor: "#F8F8F8",
        "& button:last-child": {
            border: "none",
        }
    },
    missingColor: {
        marginTop: 4,
        padding: "3px 10px 0px 5px",
        fontFamily: "Lato",
        fontSize: "12px",
        textAlign: "center",
        color: '#fa7223',
    },
    shiftContent: {
        [theme.breakpoints.down("sm")]: {
            justifyContent: "flex-start"
        },
        // [theme.breakpoints.down("md")]: {
        //   justifyContent:"flex-start"},
    },
    controlContent: {
        flexBasis: "57%",
        maxWidth: "57%",
        [theme.breakpoints.down("sm")]: {
            justifyContent: "flex-start"
        },
    },
    infoContent: {
        flexBasis: "43%",
        maxWidth: "43%",
    },
    providerLocationArea: {
        width: "100%",
        display: "flex"
    },
    providerLocationLeftArea: {
        flex: 1,
        display: "flex",
        alignItems: 'center'
    },
    providerLocationRightArea: {
        flex: 2,
        display: "flex",
        alignItems: 'center'
    },
    arrowIcon: {
        cursor: "pointer",
        margin: "5px 0px 0px 30px",
        position: "absolute",
        right: "5px",
        // top: "-15px",
    },
    closedViewItemsAera: {
        display: "flex"
    },
    patientNameInfoArea: {
        minWidth: "185px"
    },
    closedViewItemsInnerAera: {
        paddingLeft: "10px",
        "& span": {
            display: "flex"
        }
    },
    dialogPaper: {
        // width: "95%",
        minHeight: '95vh',
        // maxHeight: 800,
        // maxHeight: "90vh",
        maxWidth: '80%',
        // overflow: "auto"
    },
    dialogtitle: {
        padding: "10px 24px 0px 24px"
    },
    dialogcontent: {
        padding: "16px 24px 10px 24px"
    },
    dialogactions: {
        padding: "2px 8px 8px 8px"
    },
    titleArea: {
        display: "inline-block"
    },
    labelTitle: {
        right: 0,
        textAlign: "right"
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
    altSmallAvatarImage: {
        width: "55px",
        height: "55px"
    },
    altLargeAvatarImage: {
        width: "100px",
        height: "100px"
    },
    //
    box: {
        display: "flex",
        flexFlow: "column",
        height: "100%",
    },
    header: {
        flex: "0 1 auto",
    },
    content: {
        flex: "1 1 auto",
        // maxHeight: "450px",
        paddingRight: "15px",
        minHeight: "200px",
        overflow: "initial !important",
        height: "initial !important",
    },
    //
}))