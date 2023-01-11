import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    tableArea: {
        width: "100%",
        margin: "10px 0px"
    },
    tableHeading: {
        height: "41px",
        minWidth: "100%",
        background: "#11284B",
        border: "1px solid #E1E1E1",
        boxSizing: "border-box",
        padding: "10px 7px 7px 20px"
    },
    tableHeader: {

        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "16px",
        lineHeight: "19px",
        color: "#F2F2F2",
    },
    actionBtn: {
        backgroundColor: '#11284b',
        textTransform: 'none',
        borderColor: '#11284b',
        color: 'white',
        marginRight: 8,
        minWidth: 90,
        padding: "3px 8px",
        fontFamily: "Lato",
        '&:hover': {
            backgroundColor: '#596270',
            borderColor: '#11284b',
            color: 'white',
        },
    },
    allTasksCard: {
        margin: "5px 10px",
        background: "#FFFFFF",
        border: "1px solid #E1E1E1",
        boxSizing: "border-box",
        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
    },
    allTasksInnerCard: {
        margin: "10px 40px",
    },

}));