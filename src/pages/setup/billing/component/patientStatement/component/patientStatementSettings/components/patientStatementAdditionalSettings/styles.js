import { makeStyles } from "@material-ui/core";

export default makeStyles(theme => ({
    additionalSettingsArea: {
        "& .MuiFormGroup-row": {
            marginTop: "-3px",
        },
        "& .MuiFormControlLabel-root": {
            marginRight: "40px"
        }
    },
    customFormTitle: {
        position: 'relative',
        width: "100%",
        color: "#25282B",
        fontSize: 15,
        fontWeight: "600",
        marginBottom: 12,
    },
    labelAlign: {
        justifyContent: "flex-end",
        textAlign: "right",
        lineHeight: "37px",
        [theme.breakpoints.down("xs")]: {
            justifyContent: "flex-start",
            textAlign: "left",
        },
    },
    cityLableInput: {
        paddingRight: 10,
        fontFamily: "Lato",
        color: "#25282B",
        fontSize: 14,
        marginBottom: 13,
        paddingTop: "15%",
        minHeight: "40px",
        textAlign: "right",
    },
    mandatorColor: {
        color: "#ff0000",
        fontSize: 16,
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        lineHeight: "10px"
    },
    addressArea: {
        padding: "20px",
        borderBottom: "1px solid #EAEAEA",
        "&:hover": {
            backgroundColor: '#F5F5F5',
        },
    },
    attachmentBtn: {
        padding: "8px",
    },
    innerContainer: {
        margin: "15px 0px 5px",
        minWidth: "85%"
    }
}))