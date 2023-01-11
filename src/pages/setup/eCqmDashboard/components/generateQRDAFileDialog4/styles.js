import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
    box: {
        display: "flex",
        flexFlow: "column",
        height: "100%",
        width: "100%"
    },
    header: {
        flex: "0 1 auto",
        cursor: "move"
    },
    content: {
        flex: "1 1 auto",
        maxHeight: "575px",
        // minHeight: "575px",
        overflow: "initial !important",
        marginBottom: "10px",
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
    gridButton: {
        fontFamily: "Lato",
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: "14px",
        color: "#00B2E3",
        textTransform: "none",
        padding: "6px 16px",
        textDecoration: "none",
        cursor: "pointer",
    },
    text: {
        fontFamily: 'Lato',
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: '14px',
        lineHeight: '38px',
        color: '#000000',
        // marginRight: '35px',
        // marginBottom: '5px',
    },
    title: {
        fontFamily: 'Lato',
        fontStyle: "normal",
        fontWeight: 600,
        fontSize: '14px',
        lineHeight: '17px',
        color: '#000000',
        padding: '15px 0'
    },
    tablelayout: {
        width: "100%",
        textAlign: "left",
        // margin: "0px 15px 10px 25px",
        border: "1px solid #e4e4e4",

        "& tr": {
            borderBottom: "1px solid #e4e4e4",
        },

        "& th": {
            fontFamily: "Lato",
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize: "14px",
            lineHeight: "14px",
            letterSpacing: "0.01em",
            color: "#000000d9",
            padding: "5px",
            fontWeight: "600",
        },
        "& td": {
            fontFamily: "Lato",
            fontStyle: "normal",
            fontSize: "14px",
            lineHeight: "14px",
            letterSpacing: "0.01em",
            color: "#000000d9",
            padding: "5px",
            padding: "5px",
            fontWeight: "normal",
        },
        "& thead": {
            background: "#F0F0F0",
        }
    },
}));