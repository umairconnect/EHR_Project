import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import {FormControl,Select,InputLabel} from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Grid,FormLabel,Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {PropTypes} from 'prop-types'
import {SelectField} from '../../../components/InputField'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  InputLabel:{
      marginRight:'100px',
      marginTop:'20px'
  },
  dialogHeader:{
    textAlign:'center',
    background: '#F2F2F2',
    borderRadius: '8px 8px 0px 0px',
  },
  actionButton:{
      marginRight:'200px',
      width: '127px',
      height: '40px',
      /* primary-ocean-blue */
      background: '#00B4E5',
      color:'#000000',
      borderRadius: '5px',
      '&:hover': {
      color:'#ffffff',
      background:'#00B4E5',
        // backgroundColor: '#ffffff',
      },
  }
}));
export default function MenuForm({provideroptions,locationoptions,formstate,closeForm,openForm}) {
  const classes=useStyles();
  const [state, setState] = useState({
    locationoptions:[{value:0,label:"Location"},{value:1,label:"Location 1"}],provideroptions:[{value:0,label:"Provider"},{value:1,label:"Provider 1"}]
  });
    // ["Provider","Provider 1"]);
//   const [location, setLocation] = React.useState(["Location","Location 1"]);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

  const handleClose = () => {
    closeForm(false);
  };
  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
    <div>
      <Dialog open={formstate} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle className={classes.dialogHeader} id="form-dialog-title">Change Provider/Location</DialogTitle>        
        <DialogContent>
            <Grid item lg={12} container direction="row">

                <Grid item lg={12} container direction="row">
                    <Grid item lg={6}
                        container
                        direction="row"
                        justify="flex-end"
                    >
                        <FormLabel className={classes.InputLabel}>Provider</FormLabel>
                    </Grid>
                    <Grid item lg={6} >
                        <SelectField
                            id="providerID"
                            name="providerID"
                            value={state.provideroptions[0]}
                            options={state.provideroptions}
                            onChange={handleChange}
                            placeholder="Select Provider"
                        />
                    </Grid>
                </Grid>

                <Grid item lg={12} container direction="row">
                    <Grid item lg={6}
                        container
                        direction="row"
                        justify="flex-end"
                    >
                        <FormLabel className={classes.InputLabel}>Location</FormLabel>
                    </Grid>
                    <Grid item lg={6} >
                        <SelectField
                                id="locationID"
                                name="locationID"
                                value={state.provideroptions[0]}
                                placeholder="Select Location"
                                options={state.provideroptions}
                                onChange={handleChange}
                            />
                    </Grid>
            </Grid>

            </Grid>       
        </DialogContent>
        <DialogActions>
          <Button className={classes.actionButton}  onClick={handleClose} color="primary"> 
                Change
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
MenuForm.propTypes = {
    closeForm: PropTypes.func.isRequired,
    openForm: PropTypes.func.isRequired,
    formstate: PropTypes.func.isRequired,
  };
