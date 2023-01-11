import React from "react";

import {
    List,
    ListItem,
    ListItemAvatar,
    Link as Hyperlink,
    Paper,
    Typography,
    Button,
    FormLabel,
    CircularProgress,
    Grid as DivGrid,
    Divider,
    FormHelperText
} from "@material-ui/core";
import ResetIcon from '../../images/icons/reset-icon.png'
import { Link } from "react-router-dom";
import SaveIcon from '@material-ui/icons/Save';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import DescriptionIcon from '@material-ui/icons/Description';
import SearchIcon from '@material-ui/icons/Search';
import ReplayIcon from '@material-ui/icons/Replay';
import DeleteIcon from '../../images/icons/deleteBtnIcon.png';
import PrintIcon from '../../images/icons/print.svg';
import useStyles from "./styles";
import Draggable from 'react-draggable';


function LinkItem({ itemLink, itemImage, itemTitle, itemContent, ...props }) {
    var classes = useStyles();


    return (
        <>
            <List className={classes.LinkItemBox} {...props}>
                <ListItem className={classes.itemList} alignItems="flex-start">
                    <Link className={classes.itemLinkBox} to={itemLink}>
                        <ListItemAvatar>
                            <img alt={itemTitle} src={itemImage} />
                        </ListItemAvatar>
                        <div className={classes.itemContentBox}>
                            <span className={classes.itemTextTitle}>{itemTitle}</span>
                            <p className={classes.itemTextContent}>{itemContent}</p>
                        </div>
                    </Link>
                </ListItem>
            </List>
        </>
    );
}
function LinkS({ onClick, href, children, target, ...props }) {
    var classes = useStyles();


    return (
        <>
            <Hyperlink className={classes.hyperlink} href={href} target={target} onClick={onClick} {...props}>
                {children}
            </Hyperlink>
        </>
    );
}

function ShadowBox({ shadowSize, outlined, children, ...props }) {
    var classes = useStyles();
    return (
        <>
            <Paper className={classes.shadowBox} elevation={shadowSize} variant={outlined}   {...props}>
                {children}
            </Paper>
        </>
    )
}
function ShadowBoxMin({ shadowSize, outlined, children, ...props }) {
    var classes = useStyles();
    return (
        <>
            <Paper className={classes.shadowBoxMin} elevation={shadowSize} variant={outlined}   {...props}>
                {children}
            </Paper>
        </>
    )
}
function FooterBtn({ children, ...props }) {
    var classes = useStyles();
    return (
        <>
            <div className={classes.footerBtn} {...props}>
                {children}
            </div>
        </>
    )
}
function FormGroupTitle({ greyBg, children, ...props }) {
    var classes = useStyles();
    return (
        <>
            <Typography variant="subtitle1" className={classes.formTitle} gutterBottom>
                <span className={props.greyBg ? classes.baseTitleGreyBg : classes.baseTitle}>{children}</span>
                <span className={classes.baseLine}> </span>
            </Typography>
        </>
    )
}
function FormBtn({ id, btnType, onClick, size, children, disabled, ...props }) {
    var classes = useStyles();
    //Class name ( classes.saveBtn, classes.resetBtn, classes.updateBtn, classes.deleteBtn )
    return (
        <>
            {id == "save" ?
                <Button id={id}
                    className={classes.saveBtn}
                    disabled={disabled}
                    onClick={onClick}
                    size={size}
                    startIcon={btnType === "back" ? <ArrowBackIosIcon /> : btnType === "search" ? <SearchIcon /> : btnType === "next" ? null : btnType === "logs" ? <DescriptionIcon /> : btnType === undefined ? <SaveIcon /> : null}
                    endIcon={btnType === "next" ? <ArrowForwardIosIcon /> : null}
                    {...props}>
                    {children}</Button>
                : ''
            }
            {id == "resetBtn" ?
                <Button
                    id={id} className={classes.resetBtn} disabled={disabled} onClick={onClick} size={size}
                    startIcon={<img src={ResetIcon} alt="close" />} {...props}>{children}</Button>
                : ''
            }
            {id == "reset" ?
                <Button
                    id={id} className={classes.resetBtn} disabled={disabled} onClick={onClick} size={size} {...props}>{children}</Button>
                : ''
            }
            {id == "close" ?
                <Button id={id} className={classes.resetBtn} disabled={disabled} onClick={onClick} size={size}
                    {...props}>{children}</Button>
                : ''
            }
            {id == "lightBlue" ?
                <Button id={id} className={classes.lightBlueBtn} disabled={disabled} onClick={onClick} size={size} {...props}>{children}</Button>
                : ''
            }
            {id == "update" ?
                <Button id={id} className={classes.updateBtn} disabled={disabled} onClick={onClick} size={size}

                    {...props}>{children}</Button>
                : ''
            }
            {id == "delete" ?
                <Button id={id} className={classes.deleteBtn} disabled={disabled} onClick={onClick} size={size}
                    startIcon={<img src={DeleteIcon} alt="deleteIcon" />}
                    {...props}>{children}</Button>
                : ''
            }

            {id == "senderx" ?
                <Button id={id} className={classes.erxBtn} disabled={disabled} onClick={onClick} size={size}
                    {...props}>{children}</Button>
                : ''
            }

            {id == "loadSenderx" ?
                <Button id={id} className={classes.erxBtn} disabled={disabled} onClick={onClick} size={size}
                    {...props}>
                    <CircularProgress className={classes.circularProgressBar} size={20} />
                    {children}
                </Button>
                : ''
            }

            {id == "print" ?
                <Button id={id} className={classes.printBtn} disabled={disabled} onClick={onClick} size={size}
                    startIcon={<img src={PrintIcon} alt="printIcon" />}
                    {...props}>{children}</Button> : ''}

            {id == "loadingPrint" ?
                <Button id={id} className={classes.printBtn} disabled={disabled} onClick={onClick} size={size}
                    {...props}>
                    <CircularProgress className={classes.circularProgressBar} size={20} />
                    {children}
                </Button> : ''}

            {id == "noIcon" ?
                <Button id={id}
                    className={classes.saveBtn}
                    disabled={disabled}
                    onClick={onClick}
                    size={size}
                    {...props}>
                    {children}</Button>
                : ''
            }
            {id == "loadingSave" ?
                <Button id={id} className={classes.saveBtn} size={size} onClick={onClick} disabled={disabled} {...props}>
                    <CircularProgress className={classes.circularProgressBar} size={20} />
                    {children}
                </Button>
                : ''
            }
            {id == "loadingDelete" ?
                <Button id={id} className={classes.deleteBtn} size={size} onClick={onClick} disabled={disabled} {...props}>
                    <CircularProgress className={classes.circularProgressBar} size={20} />
                    {children}
                </Button>
                : ''
            }
        </>
    )
}
function Label({ size, title, mandatory, isTextAreaInput, isDisabled, ...props }) {
    var classes = useStyles();
    return (
        <>
            <DivGrid item xs={12} sm={size} md={size} lg={size} container direction="row" className={classes.labelAlign}>
                <FormLabel disabled={isDisabled} className={isTextAreaInput ? classes.textAreaInput : classes.lableInput} {...props}>
                    {title}
                    {mandatory ?
                        <span className={classes.mandatorColor}>*</span> : null
                    }:
                </FormLabel>
            </DivGrid>
        </>
    )
}
function LabelnotColun({ size, title, mandatory, isTextAreaInput, isDisabled, ...props }) {
    var classes = useStyles();
    return (
        <>
            <DivGrid item xs={12} sm={size} md={size} lg={size} container direction="row" className={classes.labelAlign}>
                <FormLabel disabled={isDisabled} className={isTextAreaInput ? classes.textAreaInput : classes.lableInput} {...props}>
                    {title}
                </FormLabel>
            </DivGrid>
        </>
    )
}
function CustomLabel({ size, title, mandatory, ...props }) {
    var classes = useStyles();
    return (
        <>
            <DivGrid item xs={12} sm={size} md={size} lg={size} container direction="row" className={classes.labelAlign}>
                <FormLabel className={classes.customLableInput} {...props}>
                    {title}
                    {mandatory ?
                        <span className={classes.mandatorColor}>*</span>
                        : ""
                    }:
                </FormLabel>
            </DivGrid>
        </>
    )
}
function CustomDivider({ Orientation, isLight, Varient, ...props }) {
    var classes = useStyles();
    return (
        <>
            {/* <Typography variant="subtitle1" className={classes.formTitle} gutterBottom>
                <span className={classes.baseLine}> </span>
            </Typography> */}
            <Divider
                light={isLight}
                varient={Varient}
                className={classes.customDivider}
                orientation={Orientation}
            />
        </>
    )
}
function DraggableComponent(props) {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
}
function ErrorMessage({ children, textArea, ...props }) {
    var classes = useStyles();
    return (
        <>
            <FormHelperText className={textArea === true ? classes.errorMessageTextArea : classes.errorMessage}>
                <span>{children}</span>
            </FormHelperText>
        </>
    )
}
export { LinkItem, LinkS, ShadowBox, ShadowBoxMin, FooterBtn, FormGroupTitle, FormBtn, Label, LabelnotColun, CustomLabel, CustomDivider, DraggableComponent, ErrorMessage };

