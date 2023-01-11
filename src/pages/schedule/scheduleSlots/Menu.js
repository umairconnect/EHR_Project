import React from 'react';
import {IconButton}  from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import zIndex from '@material-ui/core/styles/zIndex';
import BtnIcon from '../../../images/BtnIcon.png'
import MenuForm from './MenuForm'
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginLeft: '100px',
    zIndex:5
  },
}));

export default function MenuListComposition() {
  const classes = useStyles();
  const [open, setOpen] = React.useState();
  const [formopen, setFormOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleBlock = () => {
    alert('Block is clicked')
  };
  const handleUnBlock = () => {
    alert('UnBlock is clicked')
  };
  const handleDelete = () => {
    alert('Delete is clicked')
  };
  const handleCloseForm = () => {
    setFormOpen(false);
  };
  const handleOpenForm = () => {
    setFormOpen(true);
  };

  return (
    <div className={classes.root}>
      <div>
      <IconButton aria-label="delete" className={classes.margin}
       ref={anchorRef}
       aria-controls={open ? 'menu-list-grow' : undefined}
       aria-haspopup="true"
       onClick={handleToggle}>
          {/* <Icon fontSize="large" /> */}
          <img src={BtnIcon}/>
        </IconButton>
        {/* <Button
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
           Menu 
        </Button> */}
        <MenuForm formstate={formopen} closeForm={handleCloseForm} openForm={handleOpenForm} />
        <Popper className={classes.paper} open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Paper>
                  <MenuList autoFocusItem={open} id="menu-list-grow">
                    <MenuItem onClick={handleBlock}>Block</MenuItem>
                    <MenuItem onClick={handleUnBlock}>Unblock</MenuItem>
                    <MenuItem onClick={handleDelete}>Delete</MenuItem>
                    <MenuItem onClick={handleOpenForm}>Change Location/Provider</MenuItem>
                  </MenuList>
              </Paper>
          )}
        </Popper>
      </div>
    </div>
  );
}
