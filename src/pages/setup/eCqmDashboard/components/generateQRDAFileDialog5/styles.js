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
        "& svg": {
            height: "50px",
            width: "50px",
        },
        "& a": {
            margin: "0 5px"
        }
    },
    footer: {
        flex: "0 1 40px",
        float: 'center'
    },
    footerRight: {
        display: "flex",
        // float: "right",
        justifyContent: "center",
        // marginRight: "-8px"
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
    title: {
        fontFamily: 'Lato',
        fontStyle: "normal",
        fontWeight: 600,
        fontSize: '14px',
        lineHeight: '17px',
        color: '#000000',
        padding: '15px 0'
    },
    text: {
        fontFamily: 'Lato',
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: '12px',
        lineHeight: '20px',
        color: '#000000',
    }
}));