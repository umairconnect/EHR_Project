import React, { useState, useEffect } from "react";
import {
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  ListItemSecondaryAction,
  Badge
  // Tooltip
} from "@material-ui/core";
import { Inbox as InboxIcon } from "@material-ui/icons";
import { Link } from "react-router-dom";
import classnames from "classnames";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
// styles
import useStyles from "./styles";


// components
// import Dot from "../Dot";

export default function SidebarLink({
  link,
  icon,
  label,
  children,
  location,
  isSidebarOpened,
  nested,
  type,
  BadgeValue
}) {
  var classes = useStyles();

  
  useEffect(() => {
 }, [])

  // local
  var [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  }


  function handleClose() {
    setAnchorEl(null);
  }
  var isLinkActive =
    link &&
    (location.pathname === link);//|| location.pathname.indexOf(link) !== -1

  if (type === "title")
    return (
      <Typography
        className={classnames(classes.linkText, classes.sectionTitle, {
          [classes.linkTextHidden]: !isSidebarOpened,
        })}
      >
        {label}
      </Typography>
    );

  if (type === "divider") return <Divider className={classes.divider} />;

  if (!children)
    return (
      <ListItem
        button
        component={link && Link}
        to={link}
        className={classes.link}
        classes={{
          root: classnames(classes.linkRoot, {
            [classes.linkActive]: isLinkActive && !nested,
            [classes.linkNested]: nested,
          }),
        }}
        title={label}
        disableRipple
      >
        <ListItemIcon
          className={classnames(classes.linkIcon, {
            [classes.linkIconActive]: isLinkActive,
          })}
        >
          {/* {nested ? <Dot color={isLinkActive && "primary"} /> : icon} */}
          {icon ? icon : <InboxIcon />}

          {BadgeValue ? <ListItemSecondaryAction>
            <Badge className={classes.linkBadge} badgeContent={BadgeValue == 0 ? null : BadgeValue}></Badge>
          </ListItemSecondaryAction> : null}
        </ListItemIcon>
        <ListItemText
          classes={{
            primary: classnames(classes.linkText, {
              [classes.linkTextActive]: isLinkActive,
              [classes.linkTextHidden]: !isSidebarOpened,
            }),
          }}
          primary={label}
        />
      </ListItem>
    );


  return (
    <>
      <ListItem
        button
        component={link && Link}
        onClick={toggleCollapse}
        className={classes.link}
        to={link}
        disableRipple
      >

        <ListItemIcon
          className={classnames(classes.linkIcon, {
            [classes.linkIconActive]: isLinkActive,
          })}
        >
          {isSidebarOpened ? icon ? icon : <InboxIcon /> :
            <span aria-owns={anchorEl ? "sub-menu" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
              onMouseOver={handleClick}>
              {icon ? icon : <InboxIcon />}</span>}

        </ListItemIcon>

        <ListItemText
          classes={{
            primary: classnames(classes.linkText, {
              [classes.linkTextActive]: isLinkActive,
              [classes.linkTextHidden]: !isSidebarOpened,
            }),
          }}
          primary={label}
        />
        {isOpen ? <ExpandLess className={classes.eIcon} /> : <ExpandMore className={classes.eIcon} />}
      </ListItem>

      {children && (
        <Collapse
          in={isOpen && isSidebarOpened}
          timeout="auto"
          unmountOnExit
          className={classes.nestedList}
        >
          <List component="div" disablePadding>

            {
              children.map(childrenLink => (
                <>
                  <SidebarLink
                    key={childrenLink && childrenLink.link}
                    location={location}
                    isSidebarOpened={isSidebarOpened}
                    classes={classes}
                    nested
                    {...childrenLink}
                  />

                  {childrenLink.label == "Financial Reports" ?
                    <>
                      {childrenLink.subMenu.map(item => (
                        <>
                          <Link className={item.link && (location.pathname === item.link) ? classes.activeLink : classes.subChildLink} to={item.link}>
                            {item.label}
                          </Link>
                        </>
                      ))
                      }
                    </> : childrenLink.label == "Clinical Reports" ? <>
                      {childrenLink.subMenu.map(item => (
                        <>
                          <Link className={classes.subChildLink} to={item.link}>
                            {item.label}
                          </Link>
                        </>
                      ))
                      }
                    </> : childrenLink.label == "Other Reports" ? <>
                      {childrenLink.subMenu.map(item => (
                        <>
                          <Link className={classes.subChildLink} to={item.link}>
                            {item.label}
                          </Link>
                        </>
                      ))
                      }
                    </> : ''
                  }




                </>
              ))}
          </List>
        </Collapse>
      )}
      <Menu
        id="sub-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        className={classes.subMenu}
      >
        {/* <MenuItem onClick={handleClose}>Claims</MenuItem> */}
        <List component="div" disablePadding onClick={handleClose}>
          {children.map(childrenLink => (
            <>
              <SidebarLink
                key={childrenLink && childrenLink.link}
                location={location}
                isSidebarOpened={isSidebarOpened}
                classes={classes}
                nested
                {...childrenLink}
              />

              {childrenLink.label == "Financial Reports" ?
                <>
                  {childrenLink.subMenu.map(item => (
                    <>
                      <Link className={isLinkActive ? classes.activeLink : classes.subChildLink} to={item.link}>
                        {item.label}
                      </Link>


                    </>
                  ))
                  }
                </> : childrenLink.label == "Clinical Reports" ? <>
                  {childrenLink.subMenu.map(item => (
                    <>
                      <Link className={classes.subChildLink} to={item.link}>
                        {item.label}
                      </Link>
                    </>
                  ))
                  }
                </> : childrenLink.label == "Other Reports" ? <>
                  {childrenLink.subMenu.map(item => (
                    <>
                      <Link className={classes.subChildLink} to={item.link}>
                        {item.label}
                      </Link>
                    </>
                  ))
                  }
                </> : ''
              }


            </>

          ))}
        </List>

      </Menu>
    </>
  );

  // ###########################################################

  function toggleCollapse(e) {
    if (isSidebarOpened) {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  }
}
