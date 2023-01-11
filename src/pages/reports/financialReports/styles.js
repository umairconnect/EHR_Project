import { makeStyles } from "@material-ui/core";

export default makeStyles(((theme) => ({
    shadowBox: {
        margin: "10px",
        // padding: "10px",
        borderRadius: "10px"
    },
    Htabs: {
        "& button": {
            textTransform: "capitalize",
            color: "#25282B",
            fontFamily: "Lato",
            // width: "80px",
            // maxWidth: "50px",
            fontSize: "14px",
            opacity: "1",
            height: "36px"
        },
        "& button.Mui-selected": {
            fontWeight: 700,
            color: "#11284B",
            border: "1px solid #A3A3A3",
            borderBottom: "none",
            borderRadius: "10px 10px 0px 0px",
        },
        "& button.Mui-selected:first-child": {
            borderRadius: "10px 10px 0px 0px",
        },
        "& .MuiTabs-indicator": {
            // backgroundColor: "#00B2E3",
            // color: "#11284B",
            backgroundColor: "#fff",
            color: "#fff",
        },
        "& .MuiTab-root": {
            minWidth: "80px",
            minHeight: "32px"
        }
    },
    tabRoot: {
        maxWidth: "100%",
        // top: '35px',
        position: 'relative',
        borderBottom: '1px solid #A3A3A3',
        marginBottom: '5px',
        minHeight: '36px',
        paddingLeft: "10px"
    },
    reimbursementAnalysisTab: {
        width: "250px"
    }
})))