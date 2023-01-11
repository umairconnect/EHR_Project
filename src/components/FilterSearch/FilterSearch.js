import React, { useState } from "react";

// styles
import {
  InputBase,
  TextField ,
  Button ,
  Popover,
  FormControl, 
  Select,
  InputLabel,
  MenuItem,
} from "@material-ui/core";
import {
  Search as SearchIcon
} from "@material-ui/icons";
import useStyles from "./styles";
import classNames from "classnames";

export default function FilterSearch(props) {
  var classes = useStyles();
  //const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'searchPopver' : undefined;
  
  const onClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const onChange = (event) => {
    console.log(event.target.value);
  };
  const onFocus = (event) => {

    console.log(event.target.value);
  };
  const onKeyDown = (event) => {
  
    console.log(event.target.value);
  };
  const onKeyUp = (event) => {
   
    console.log(event.target.value);
  };
  const onBlur = (event) => {
    
    console.log(event.target.value);
    
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  return (
      <div className={classes.searchPanel} >
          <div className={classes.searchPanelBox}  onClick={onClick}>
                <div className={classes.searchIcn}>
                  <SearchIcon classes={{ root: classes.headerIcon }} />
                </div>
                <InputBase
                  placeholder= {props.placeholderTitle}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  id={id}
                  onClick={onClick}
                  onChange={onChange}
                  onFocus={onFocus}
                  onKeyDown={onKeyDown}
                  onKeyUp={onKeyUp}
                  onBlur={onBlur}
                  disabled 
                />
          </div>
            <Popover 
            classes={{
              root: classes.PopoverRoot,
              paper: classes.Popoverpaper,
            }} 
              id={id}
             open={open}
             anchorEl={anchorEl}
             onClose={handleClose}
             anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}>
              
                <FormControl className={classes.margin}>
                    <TextField
                      label="First Name"
                      id="First-Name"
                      defaultValue=""
                      variant="filled"
                      size="small"
                      InputProps={{
                        className: classes.input,
                        disableUnderline: true
                      }}
                      InputLabelProps={{
                        className: classes.textLabel,
                      }}
                    />
                  </FormControl>
                  <FormControl className={classes.margin}>
                    <TextField
                      label="Last Name"
                      id="Last-Name"
                      defaultValue=""
                      variant="filled"
                      size="small"
                      InputProps={{
                        className: classes.input,
                        disableUnderline: true
                      }}
                      InputLabelProps={{
                        className: classes.textLabel,
                      }}
                    />
                  </FormControl>
                   <FormControl className={classes.margin}>
                    <TextField
                      label="ID"
                      id="ID"
                      defaultValue=""
                      variant="filled"
                      size="small"
                      InputProps={{
                        className: classes.input,
                        disableUnderline: true
                      }}
                      InputLabelProps={{
                        className: classes.textLabel,
                      }}
                    />
                  </FormControl>
                   <FormControl className={classes.margin}>
                    <TextField
                      label="Cell Phone"
                      id="Cell-Phone"
                      defaultValue=""
                      variant="filled" 
                      size="small"
                      InputProps={{
                        className: classes.input,
                        disableUnderline: true
                      }}
                      InputLabelProps={{
                        className: classes.textLabel,
                      }}
                    />
                  </FormControl>
                   <FormControl className={classes.margin}>
                    <TextField
                      label="Follow Up"
                      id="Follow-Up"
                      defaultValue=""
                      variant="filled"
                      size="small"
                      className={classes.inputText}
                      InputProps={{
                        className: classes.input,
                        disableUnderline: true
                      }}
                      InputLabelProps={{
                        className: classes.textLabel,
                      }}
                    />
                  </FormControl>
                  <FormControl size="small" variant="filled"  className={classes.margin}>
                    <InputLabel htmlFor="status"
                        className= {classes.textLabel}
                    >Status</InputLabel>
                    <Select disableUnderline  size="small" 
                        className= {classes.input}
                        inputProps={{
                          id: 'status',
                        }}
                      >
                      <option  value="Confirm">Confirm</option >
                      <option  value="Cancel">Cancel</option >
                    </Select>
                  </FormControl>
                  <div  className={classes.footerButton}>
                    <Button size="normal" onClick={handleClose} className={classes.sApply}>
                      Apply
                    </Button >
                    <Button size="normal" onClick={handleClose} className={classes.sClose}>
                      Close
                    </Button >
                  </div >
                 
            </Popover >
  

      </div>
  );
}
