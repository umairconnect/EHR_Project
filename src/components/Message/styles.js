import {
  makeStyles
} from "@material-ui/styles";

export default makeStyles(theme => ({
  alertMessageBos: {
   width:"100%",
   marginBottom: theme.spacing(2),
   '& > * + *': {
    marginTop: theme.spacing(2),
  },
  },
  cancelButton:{
    backgroundColor: '#DDDDDD',
    borderColor: '#F3F3F3',
    color: '#11284b',
    marginRight: 8,
    minWidth:90,
    '&:hover': {
        backgroundColor: '#596270',
        borderColor: '#11284b',
        color: 'white',
    },
  },
  okButton:{
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

}));
