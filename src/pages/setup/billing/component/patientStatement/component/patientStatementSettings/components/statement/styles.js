import { makeStyles } from "@material-ui/core";

export default makeStyles(theme => ({
    statementArea: {
        "& .MuiFormGroup-row": {
            marginTop: "-3px",
        },
        "& .MuiFormControlLabel-root": {
            marginRight: "40px"
        }
    },
    viewImage: {
        margin: "10px",
        height: "16px",
        width: "23px",
        cursor: "pointer"
    }
}))