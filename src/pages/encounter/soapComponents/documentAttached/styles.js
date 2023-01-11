import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    listTitle: {
        display: "flex",
        alignItems: "flex-start",
        "& img": {
            marginLeft: "5px",
            marginRight: "5px",
        },
        "& span": {
            fontFamily: 'Lato',
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "17px",
            color: "#00B2E3",
            margin: "2px 10px",
            display: "flex",
            alignItems: "center",
        },
    },
    addNew: {
        cursor: "pointer",
    },
    soapBox: {
        margin: "10px 0px",
        padding: "12px 10px",
        background: "#F8F8F8",
        border: "1px solid #E1E1E1",

        "& h3": {
            fontFamily: 'Lato',
            fontStyle: "normal",
            fontWeight: 700,
            fontSize: "16px",
            lineHeight: "19px",
        },
        "& textarea": {
            padding: "10px",
        }
    },
  
}));