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
    noteText: {
        fontFamily: 'Lato',
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: '14px',
        lineHeight: '20px',
        color: '#000000',
        marginRight: '35px',
        marginBottom: '5px',
    },
    title: {
        fontFamily: 'Lato',
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '17px',
        color: '#000000',
        padding: '15px 0'
    },
    measureList: {
        listStyle: 'none',
        // padding: 0,
        margin: 0,
        "& li": {
            display: 'flex',
            "& div": {
                height: "10px",
                width: "12px",
                backgroundColor: "#00B4E5",
                marginTop: "12px",
                marginRight: "15px",
            },
            "& .MuiTypography-root": {
                fontFamily: 'Lato',
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '30px',
                color: '#000000',
            }
        }
    }
}));