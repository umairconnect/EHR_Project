import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
    dialogPaper: {
        width: "75%",
        height: "93vh",
        minHeight: '93vh',
        maxWidth: '150vh',
        minWidth: "650px"
    },
    dialogtitle: {
        padding: "10px 24px 0px 24px",
        cursor: "move"
    },
    dialogcontent: {
        padding: "16px 24px 0px 24px"
    },
    dialogactions: {
        padding: "2px 8px 8px 8px"
    },
    okButton: {
        backgroundColor: '#11284b',
        borderColor: '#11284b',
        color: 'white',
        marginRight: 8,
        minWidth: 90,
        '&:hover': {
            backgroundColor: '#596270',
            borderColor: '#11284b',
            color: 'white',
        },
    },
}))