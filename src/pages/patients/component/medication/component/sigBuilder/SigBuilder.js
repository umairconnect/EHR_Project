import React, { useState, useEffect } from "react"
import { MDBInput, MDBDataTable, MDBIcon } from 'mdbreact';
import { PostDataAPI } from '../../../../../../Services/PostDataAPI';
import { GetUserInfo } from '../../../../../../Services/GetUserInfo';
import useStyles from './styles'
import { data as gridCnfg } from '../../../../../../components/SearchGrid/Data/SetupData';
import { Skeleton } from "@material-ui/lab";
import PrintIcon from "../../../../../../images/icons/PrintIcon.png"
import CloseIcon from "../../../../../../images/icons/math-plus.png"
import Info from "../../../../../../images/icons/info.png"
import Settings from "../../../../../../images/icons/settings.png"
import classNames from "classnames";
import {
    Search as SearchIcon,
} from "@material-ui/icons";
import {
    Button,
    Icon,
    Typography,
    Grid,
    Avatar,
    Dialog,
    DialogContent,
    FormLabel,
    IconButton,
    Card,
    InputBase,
    InputAdornment,
    TextField,
    Divider,
    ListItemText,
    ListItem,
    Box,
    MenuItem,
    Checkbox,
    FormControlLabel
} from "@material-ui/core"
import { DraggableComponent, FormBtn, FormGroupTitle } from "../../../../../../components/UiElements/UiElements";
import { InputBaseField, CheckboxField, TextareaField, SelectField, MultiSelectField } from "../../../../../../components/InputField/InputField";
export default function SigBuilder({ OpneClose, handleClose, onUpdate, ...props }) {
    var classes = useStyles();

    //dropdown lists
    const [prn, setPrn] = useState("");
    const [doseList] = useState([]);
    const [unitList] = useState([]);
    const [routList] = useState([]);
    const [frequencyList] = useState([]);
    const [directionList] = useState([]);
    const [durationList] = useState([]);

    const [checked, setChecked] = React.useState([]);


    useEffect(() => {
        var params = {
            code: "DDL_List_Item",
            parameters: ['sig_builder_Dose', 'sig_builder_Unit', 'sig_builder_Route', 'sig_builder_Frequency',
                'sig_builder_Directions', 'sig_builder_Duration']
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {
                result.data.map((item, i) => {
                    switch (item.text3) {
                        case 'sig_builder_Dose':
                            doseList.push({ value: item.text1, name: item.text2 });
                            break;
                        case 'sig_builder_Unit':
                            unitList.push({ value: item.text1, name: item.text2 });
                            break;
                        case 'sig_builder_Route':
                            routList.push({ value: item.text1, name: item.text2 });
                            break;
                        case 'sig_builder_Frequency':
                            frequencyList.push({ value: item.text1, name: item.text2 });
                            break;
                        case 'sig_builder_Directions':
                            directionList.push({ value: item.text1, name: item.text2 });
                            break;
                        case 'sig_builder_Duration':
                            durationList.push({ value: item.text1, name: item.text2 });
                            break;
                    }
                })
            }
        });
    }, []);


    function handleChange(e) {
        setPrn(e.target.checked);
    };
    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
        console.log(checked);
    };
    const handleUpdate = () => {
        let arrval = "";
        if (prn)
            arrval = "PRN ";
        checked.map((item) => {

            if (!!checked && checked.length >= 1) {
                arrval += item + " ";
            }
        });
        if (arrval === "PRN, ") { arrval = "PRN"; }
        onUpdate(arrval);
        handleClose();
    }
    return (
        <>
            <Dialog
                PaperComponent={DraggableComponent}
                classes={{ paper: classes.dialogPaper }}
                disableBackdropClick
                disableEscapeKeyDown
                open={OpneClose}
                {...props} >
                {/* <DialogContent
                    className={classes.dialogcontent}
                > */}
                <div className={classes.dialogcontent}>
                    <div className={classes.box}>
                        <div className={classes.header} id="draggable-dialog-title">
                            <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} /></span>
                            <FormGroupTitle>SIG Builder</FormGroupTitle>

                        </div>
                        <div className={classes.content}>
                            {/* <Grid container lg={12} direction="row"> */}
                            {/* <div id="draggable-dialog-title" style={{ minWidth: "100%" }}>
                            <Grid container direction="row" justify="center" alignItems="center" xs={12} sm={12} md={12} lg={12}>

                                <Grid container justify="flex-start" alignItems="center" xs={2} sm={2} md={2} lg={2} direction="row" >
                                    <Typography className={classes.lableInputBold}>
                                        SIG Builder
                                    </Typography>
                                </Grid>
                                <Grid direction="row" justify="flex-end" alignItems="center" xs={9} sm={9} md={9} lg={9} >
                                    <Divider className={classes.divider} />
                                </Grid>
                                <Grid container direction="row" justify="flex-end" alignItems="center" xs={1} sm={1} md={1} lg={1} >
                                    <Button aria-label="delete" size="small" onClick={handleClose}>
                                        <img src={CloseIcon} />
                                    </Button>
                                </Grid>


                            </Grid>
                        </div> */}
                            <Grid container direction="row" justify="center" alignItems="center" xs={12} sm={12} md={12} lg={12}>

                                <Grid container justify="flex-start" alignItems="center" xs={2} sm={2} md={2} lg={2} direction="row" >
                                    <CheckboxField
                                        color="primary"
                                        onChange={handleChange}
                                        name="prn"
                                        checked={prn}
                                        label="PRN"
                                    />
                                </Grid>

                                <Grid direction="row" justify="flex-end" alignItems="center" xs={10} sm={10} md={10} lg={10} >
                                    {/* <Divider className={classes.divider}/> */}
                                </Grid>

                            </Grid>

                            <Grid container direction="row" justify="flex-start" alignItems="flex-start" xs={12} sm={12} md={12} lg={12}>

                                <Grid item direction="column" justify="flex-start" alignItems="flex-start" xs={2} sm={2} md={2} lg={2} >
                                    <Grid xs={11} sm={11} md={11} lg={11} >
                                        <Typography className={classes.heading}>Dose</Typography>
                                        <Card classes={{
                                            root: classes.card,
                                            gutters: classes.list
                                        }}>
                                            <ul className={classes.itemList}>
                                                {
                                                    doseList.map((item, i) => {
                                                        return <li>
                                                            <CheckboxField
                                                                color="primary"
                                                                name={item.name}
                                                                value={item.name}
                                                                onChange={handleToggle(item.name)}
                                                                checked={checked.indexOf(item.name) !== -1}
                                                                label={item.name}
                                                            />
                                                        </li>
                                                    })
                                                }
                                            </ul>
                                        </Card>
                                    </Grid>
                                </Grid>

                                <Grid item direction="column" justify="flex-start" alignItems="flex-start" xs={2} sm={2} md={2} lg={2} >
                                    <Grid xs={11} sm={11} md={11} lg={11} >
                                        <Typography className={classes.heading}>Unit</Typography>
                                        <Card classes={{
                                            root: classes.card,
                                            gutters: classes.list
                                        }}>
                                            <ul className={classes.itemList}>
                                                {
                                                    unitList.map((item, i) => {
                                                        return <li>
                                                            <CheckboxField
                                                                color="primary"
                                                                name={item.name}
                                                                value={item.name}
                                                                onChange={handleToggle(item.name)}
                                                                checked={checked.indexOf(item.name) !== -1}
                                                                label={item.name}
                                                            />
                                                        </li>
                                                    })
                                                }
                                            </ul>
                                        </Card>
                                    </Grid>
                                </Grid>

                                <Grid item direction="column" justify="flex-start" alignItems="flex-start" xs={2} sm={2} md={2} lg={2} >
                                    <Grid xs={11} sm={11} md={11} lg={11} >
                                        <Typography className={classes.heading}>Route</Typography>
                                        <Card classes={{
                                            root: classes.card,
                                            gutters: classes.list
                                        }}>
                                            <ul className={classes.itemList}>
                                                {
                                                    routList.map((item, i) => {
                                                        return <li>
                                                            <CheckboxField
                                                                color="primary"
                                                                name={item.name}
                                                                value={item.name}
                                                                onChange={handleToggle(item.name)}
                                                                checked={checked.indexOf(item.name) !== -1}
                                                                label={item.name}
                                                            />
                                                        </li>
                                                    })
                                                }
                                            </ul>
                                        </Card>
                                    </Grid>
                                </Grid>

                                <Grid item direction="column" justify="flex-start" alignItems="flex-start" xs={2} sm={2} md={2} lg={2} >
                                    <Grid xs={11} sm={11} md={11} lg={11} >
                                        <Typography className={classes.heading}>Frequency</Typography>
                                        <Card classes={{
                                            root: classes.card,
                                            gutters: classes.list
                                        }}>
                                            <ul className={classes.itemList}>
                                                {
                                                    frequencyList.map((item, i) => {
                                                        return <li>
                                                            <CheckboxField
                                                                color="primary"
                                                                name={item.name}
                                                                value={item.name}
                                                                onChange={handleToggle(item.name)}
                                                                checked={checked.indexOf(item.name) !== -1}
                                                                label={item.name}
                                                            />
                                                        </li>
                                                    })
                                                }
                                            </ul>
                                        </Card>
                                    </Grid>
                                </Grid>

                                <Grid item direction="column" justify="flex-start" alignItems="flex-start" xs={2} sm={2} md={2} lg={2} >
                                    <Grid xs={11} sm={11} md={11} lg={11} >
                                        <Typography className={classes.heading}>Directions</Typography>
                                        <Card classes={{
                                            root: classes.card,
                                            gutters: classes.list
                                        }}>
                                            <ul className={classes.itemList}>
                                                {
                                                    directionList.map((item, i) => {
                                                        return <li>
                                                            <CheckboxField
                                                                color="primary"
                                                                name={item.name}
                                                                value={item.name}
                                                                onChange={handleToggle(item.name)}
                                                                checked={checked.indexOf(item.name) !== -1}
                                                                label={item.name}
                                                            />
                                                        </li>
                                                    })
                                                }
                                            </ul>
                                        </Card>
                                    </Grid>
                                </Grid>

                                <Grid item direction="column" justify="flex-start" alignItems="flex-start" xs={2} sm={2} md={2} lg={2} >
                                    <Grid xs={11} sm={11} md={11} lg={11} >
                                        <Typography className={classes.heading}>Duration</Typography>
                                        <Card classes={{
                                            root: classes.card,
                                            gutters: classes.list
                                        }}>
                                            <ul className={classes.itemList}>
                                                {
                                                    durationList.map((item, i) => {
                                                        return <li>
                                                            <CheckboxField
                                                                color="primary"
                                                                name={item.name}
                                                                value={item.name}
                                                                onChange={handleToggle(item.name)}
                                                                checked={checked.indexOf(item.name) !== -1}
                                                                label={item.name}
                                                            />
                                                        </li>
                                                    })
                                                }
                                            </ul>
                                        </Card>
                                    </Grid>
                                </Grid>

                            </Grid>

                            <Grid container direction="row" justify="flex-end" alignItems="center">

                                <Grid item xs={9} sm={9} md={9} lg={9} />

                                <Grid item xs={3} sm={3} md={3} lg={3} style={{ display: "flex", justifyContent: "flex-end" }}>
                                    <FormBtn id={"save"} size="medium" onClick={handleUpdate}>Update</FormBtn>

                                    <FormBtn id={"reset"} size="medium" onClick={handleClose}>Close</FormBtn>
                                </Grid>

                            </Grid>
                        </div>

                    </div>
                </div>

                {/* </Grid> */}
                {/* </DialogContent> */}
            </Dialog>
        </>
    )

}