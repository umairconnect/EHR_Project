import {
  makeStyles
} from "@material-ui/styles";

export default makeStyles(theme => ({
  pageTitleContent: {
    textAlign: "center",
    marginTop: "10%"
  },
  formTitle: {
    position: 'relative',
    width: "100%",
    color: "#25282B",
    fontSize: 15,
    marginBottom: 20,
  },
  baseLine: {
    content: '',
    position: 'absolute',
    left: 100,
    right: 0,
    top: 14,
    height: 1,
    backgroundColor: "#DDDDDD",
  },
  baseInput: {
    border: "1px solid #DDDDDD",
    borderRadius: "4px",
    padding: " 3px 12px",
    width: "100%",
    fontFamily: "Lato",
    backgroundColor: "white",
    marginBottom: 4,
    fontSize: "14px",
  },
  lableInput: {
    lineHeight: "40px",
    paddingRight: 15,
    fontFamily: "Lato",
    color: "#25282B",
    fontSize: 14,
    marginBottom: 13,
  },
  lableText: {
    lineHeight: "40px",
    paddingRight: 15,
    fontFamily: "Lato",
    color: "#828282",
    fontSize: 12,
    marginBottom: 20,
  },
  lableTextarea: {
    lineHeight: "25px",
    paddingRight: 15,
    fontFamily: "Lato",
    color: "#25282B",
    fontSize: 14,
    marginBottom: 20,
  },
  baseTextarea: {
    border: "1px solid #DDDDDD",
    borderRadius: "4px",
    padding: " 5px 12px",
    width: "100%",
    fontFamily: "Lato",
    resize: "none",
    marginBottom: 20,
    '&:focus': {
      border: "1px solid #DDDDDD",
    },
    },
    mandatorColor: {
        color: "#ff0000"
    },
    resetBtn: {
        backgroundColor: '#DDDDDD',
        borderColor: '#F3F3F3',
        color: '#11284b',
        marginRight: 8,
        minWidth: 90,
        '&:hover': {
            backgroundColor: '#596270',
            borderColor: '#11284b',
            color: 'white',
        },
    },
    updateBtn: {
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

    saveBtn: {
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

    deleteBtn: {
        backgroundColor: '#dd3232',
        borderColor: '#dd3232',
        color: 'white',
        marginRight: 8,
        minWidth: 90,
        '&:hover': {
            backgroundColor: '#596270',
            borderColor: '#11284b',
            color: 'white',
        },
    },
    labelAlign: {
        justifyContent: "flex-end",
        [theme.breakpoints.down("xs")]: {
            justifyContent: "flex-start",
        },
  },
}));
