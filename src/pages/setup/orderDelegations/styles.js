import {
    makeStyles
} from "@material-ui/styles"

export default makeStyles((theme) => ({
    positionRelative: {
        position: "relative",
    },
    container: {
        padding: "0px 15px",
        background: "#FFFFFF",
        border: "1px solid #E1E1E1",
        boxShadow: "0px 2px 10px rgb(0 0 0 / 10%)",
        borderRadius: "8px",
    },
    mainContent: {
        flex: "1",
        backgroundColor: "#fff",
        padding: "12px 10px 5px 10px"
        // padding: "20px 10px 5px 10px",
        // minHeight:"521px",
    },
    box: {
        display: "flex",
        flexFlow: "column",
        height: "100%",
    },
    header: {
        flex: "0 1 auto",
        display: "flex",
        cursor: "move"
    },
    content: {
        flex: "1 1 auto",
        minHeight: "450px",
        overflow: "auto",
        marginBottom: "10px",
        padding: "10px 0px",
        borderRadius: "5px",
        border: "1px solid #DDDDDD",
    },
    contentRight: {
        flex: "1 1 auto",
        minHeight: "450px",
        overflow: "auto",
        marginBottom: "10px",
        padding: "10px 10px 10px 20px",
        borderRadius: "5px",
        border: "1px solid #DDDDDD",
    },
    contentRightScrollbar: {
        minHeight: "450px"
    },
    innerContentRight: {
        paddingRight: "20px"
    },
    footer: {
        flex: "0 1 40px",
    },
    footerRight: {
        float: "right",
        marginRight: "-8px"
    },
    sectionTitle: {
        color: "#25282B",
        width: "100%",
        position: "relative",
        fontSize: "15px",
        fontWeight: 700,
        lineHeight: "28px"
    },
    leftSideHeader: {
        //  backgroundColor:"#00B2E3",
        fontWeight: "bold",
        fontSize: "14px",
        // color: "#11284B",
        borderRadius: "10px 10px 0 0",
        height: "47px",
        //  padding: "10px 15px",
    },

    usersList: {
        listStyle: "none",
        margin: 0,
        padding: 0,
        display: "flex",
        flexDirection: "column",
        minWidth: "100%",
        "& li": {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 14,
            miHeight: "55px",
            padding: "5px 10px",
            textAlign: "center",
            color: "#52525C",
            fontFamily: "Lato",
            borderBottom: "1px solid #DDDDDD",
            "& span": {
                display: "flex",
                alignItems: "center"
            }
        }
    },
    userPicture: {
        width: 36,
        borderRadius: "50%",
        border: "1px solid #11284b",
    },
    userSpan: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: "20px",
        alignContent: "flex-start",
        alignItems: "flex-start",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    userSpanContent: {
        flexDirection: 'column',
        textAlign: "left",
        paddingLeft: "15px",
    },
    userName: {
        fontFamily: 'Lato',
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: "14px",
        lineHeight: "20px",
        color: "#52575C",
    },
    userType: {
        fontFamily: 'Lato',
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: "10px",
        color: "#5D8AB5",
    },
    deleteIcon: {
        width: "18px",
        height: "18px",
        cursor: "pointer"
    },
    actionSpan: {

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
    newAddBtn2: {
        width: "112px",
        height: "32px",
        borderRadius: "8px",
        border: "1px solid #11284B",
        margin: "0px 0px 10px 5px",
        color: "#11284B",
        backgroundColor: "#F9F9F9",
        boxSizing: "border-box",
        fontSize: 15,
        fontFamily: "Lato",
        textTransform: "none",
        padding: "0 12px",
        // position: "absolute",
        // top: "2px",
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
}))
