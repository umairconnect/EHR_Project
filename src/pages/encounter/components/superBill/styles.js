import { red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
    dialogPaper: {
        minWidth: "1260px",
        maxWidth: "1280px",
        maxHeight: "calc(100%-32px)"
    },
    DialogContent: {
        minWidth: "1260px",
        maxWidth: "1260px",
        padding: "20px 10px 10px",
    },
}));