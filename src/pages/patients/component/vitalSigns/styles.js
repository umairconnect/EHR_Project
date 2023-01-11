import { makeStyles } from "@material-ui/styles"
export default makeStyles(theme => ({
    positionRelative: {
        position: "relative",
    },
    dialogPaper: {
        // width: "130vh",
        // minHeight: '75vh',
        maxWidth: '1920px',
    },
    dialogtitle: {
        padding: "10px 24px 0px 24px"
    },
    dialogcontent: {
        minWidth: "850px",
        padding: "16px 24px 10px 24px"
    },
    dialogactions: {
        padding: "2px 8px 8px 8px"
    },
    NoVitalMsg: {
        textAlign: "center",
        marginTop: "10%",
        fontFamily: "Lato",
        fontSize: "23px",
        color: "#9e9e9e",
    },
    titleArea: {
        display: "inline-block"
    },
    labelTitle: {
        right: 0,
        textAlign: "right"
    },
    labeladdfavorite: {
        cursor: "pointer",
        lineHeight: "15px",
        paddingLeft: 10,
        fontWeight: 700,
        fontFamily: "Lato",
        color: "#00B4E5",
        // textDecoration: "underline",
        fontSize: 14,
        [theme.breakpoints.down("sm")]: {
            lineHeight: "10px",
            paddingRight: 5,
        },
        [theme.breakpoints.down("md")]: {
            lineHeight: "20px",
            paddingRight: 5,
        },
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
    footer: {
        flex: "0 1 40px",
    },
    footerRight: {
        float: "right",
        margin: '10px 8px 0px 0px'
    },
    //
}));

