import React, { useState, useEffect } from "react";
import {
    Popover,
    FormControl,
    FormLabel,
    Chip,
    Checkbox,
    FormControlLabel,
    InputBase,

    Grid as NewGrid
} from "@material-ui/core";
import {
    Search as SearchIcon
} from "@material-ui/icons";
import { SearchPanelSetupData as SearchPanelData } from '../SearchPanel/Data/SetupData';
import { InputBaseField, SelectField } from '../../components/InputField'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'mdbreact/dist/css/mdb.css';
import useStyles from "./styles";
import { FormBtn } from '../../components/UiElements/UiElements'
import SearchList from "../../components/SearchList/SearchList";

// import { PostDataAPI } from '../../Services/PostDataAPI';
// import { GetUserInfo } from '../../Services/GetUserInfo';

// import { APICall } from '../../Services/APICall';



//




export default function SearchGridForm({ isDeleted, defaultvalues, searchPanelParams, onChange, Apply, onAddNew, ToggleButton, MenuBtnRef, ...props }) {

    const [searchdataoptions, setSearchDataOptions] = useState(["", ""]);
    //Seach Panel
    const [anchorEl, setAnchorEl] = React.useState(false);
    const open = Boolean(anchorEl);
    const id = open ? 'searchPopver' : undefined;
    const [chipdata, setChipData] = useState([]);

    const [state, setState] = useState([]);
    //
    var classes = useStyles();

    const [values, setValues] = useState(defaultvalues);
    useEffect(() => {
        setSearchDataOptions(SearchPanelData[searchPanelParams]);
        //Apply Search.
        if (Object.keys(values).length > 0) {
            onApply();
        }
    }, []);
    useEffect(() => {
        if (isDeleted) {
            setTimeout(() => {
                setValues([]);
                let chipvalues = [];
                Object.entries([]).map((item) => {
                    const obj = { name: item[0], value: item[1] }
                    chipvalues.push(obj);
                }); setChipData(chipvalues);
            }, 1500)
        }
    }, [isDeleted])
    const onClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    const handleCheckedChange = e => {
        const { name, checked } = e.target;
        setValues(prevState => ({
            ...prevState,
            [name]: checked
        }));
    }
    const handleClose = () => {
        setAnchorEl(false);
    };
    const onApply = (event) => {
        if (event)
            event.preventDefault();
        let chipvalues = [];

        Object.entries(values).map((item) => {
            const obj = { name: item[0], value: item[1] }
            chipvalues.push(obj);
        }); setChipData(chipvalues);
        Apply(values);
        setAnchorEl(false);
    };
    const handleDelete = (chiptoDelete) => () => {
        //Update Chipdata by removing items
        const updatedchipvalues = chipdata.filter((item) => item.name !== chiptoDelete);
        setChipData(updatedchipvalues);
        //Update Form Fields by removing items
        var newvaluesArray = values;
        delete newvaluesArray[chiptoDelete];
        setValues(newvaluesArray);
        onApply();
    };
    const getLabel = (name) => {

        let label = "";
        searchdataoptions.map((item) => {
            if (item.name === name) {
                label = item.label + ": ";
            }
        })
        return label;
    }
    const getSelectValueLabel = (name, value) => {
        let valueLabel = "";
        searchdataoptions.map((item) => {
            if (item.name === name) {
                if (item.selectoptions != null || item.selectoptions != undefined) {
                    item.selectoptions.map((item2) => {
                        if (item2.value.toString() === value) {
                            valueLabel = item2.label;
                        }
                    })
                } else { valueLabel = value; }
            } else { valueLabel = value; }
        })
        return valueLabel;
    }
    const onChangeInput = () => {

    }
    const handleSearchListChange = (name, item) => {

        const { id, value } = item;

        if (name == 'patientId') {
            setState(prevState => ({
                ...prevState,
                providerId: value == '' ? '' : id,
                providerName: value
            }));

        }

        setValues(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    return (
        <>
            {

                searchPanelParams ?
                    <div className={classes.searchPanel} >
                        <NewGrid item container direction="row" lg={12}>
                            <NewGrid item container justify="flex-start" direction="row" xs={12} sm={5} md={3} lg={2} />
                            <NewGrid item container direction="row" justify="flex-end" xs={12} sm={3} md={6} lg={7}>
                                {
                                    <>
                                        {

                                            chipdata.map((chip, i) => {

                                                if (chip.value !== null && chip.value !== "" && chip.value !== undefined && chip.value !== false && getLabel(chip.name) != "") {
                                                    if (chip.value.length <= 1) {
                                                        return (
                                                            <Chip
                                                                // key={i}
                                                                size="small"
                                                                key={chip.name}
                                                                label={`${getLabel(chip.name)} ${getSelectValueLabel(chip.name, chip.value)}`}
                                                                onDelete={handleDelete(chip.name)}
                                                                className={classes.chip}

                                                            />
                                                        )
                                                    }
                                                    else if (chip.value === true || chip.value === false) {
                                                        return (
                                                            <Chip
                                                                // key={i}
                                                                size="small"
                                                                key={chip.name}
                                                                label={`${getLabel(chip.name)}`}
                                                                onDelete={handleDelete(chip.name)}
                                                                className={classes.chip}

                                                            />
                                                        )
                                                    }
                                                    else {
                                                        return (
                                                            <Chip
                                                                // key={i}
                                                                size="small"
                                                                key={chip.name}
                                                                label={`${getLabel(chip.name)} ${chip.value}`}
                                                                onDelete={handleDelete(chip.name)}
                                                                className={classes.chip}

                                                            />
                                                        );
                                                    }
                                                }
                                            })
                                        }
                                    </>
                                }
                            </NewGrid>
                            <NewGrid item container justify="flex-end" direction="row" xs={12} sm={4} md={3} lg={3}>
                                <div className={classes.searchPanelBox} onClick={onClick}>
                                    <div className={classes.searchIcn}>
                                        <SearchIcon classes={{ root: classes.headerIcon }} />
                                    </div>
                                    <InputBaseField
                                        MaxLength="280"
                                        value="Enter Search Query"
                                        focused="true"
                                        formcontrol="true"
                                        input="true"
                                        classes={{
                                            root: classes.inputRoot,
                                            input: classes.inputInput
                                        }}
                                        id={id}
                                        onClick={onClick}
                                        IsDisabled={true}
                                        onChange={onChangeInput}
                                    />
                                </div>
                            </NewGrid>
                        </NewGrid>
                        {searchdataoptions != null || searchdataoptions != undefined ?

                            <Popover
                                elevation={1}
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
                                <form onSubmit={onApply}>
                                    {searchdataoptions.length > 0 ?
                                        searchdataoptions.map((option, i) => {
                                            if (option.type === 'date' || option.type === 'time') {
                                                if (option.column === 2) {
                                                    return (
                                                        <>
                                                            {
                                                                option.title ? <FormControl key={i} className={classes.margin}>
                                                                    <FormLabel className={classes.lableInput}>{option.title}</FormLabel>
                                                                </FormControl>
                                                                    : ''
                                                            }
                                                            <FormControl key={i} className={classes.InputDateTime}>
                                                                <FormLabel key={option.id} className={classes.lableInput}>{option.label}</FormLabel>
                                                                {
                                                                    option.type === "date" ?
                                                                        option.name === "from_date" ?
                                                                            <InputBase
                                                                                id={option.id}
                                                                                label={option.label}
                                                                                name={option.name}
                                                                                type={option.type}
                                                                                // defaultValue={defaultvalues.today}
                                                                                value={values[option.name]}
                                                                                onChange={handleInputChange}
                                                                                InputLabelProps={{
                                                                                    shrink: true,
                                                                                }}
                                                                            />
                                                                            :
                                                                            <InputBase
                                                                                id={option.id}
                                                                                label={option.label}
                                                                                name={option.name}
                                                                                type={option.type}
                                                                                // defaultValue={defaultvalues.lastday}
                                                                                value={values[option.name]}
                                                                                onChange={handleInputChange}
                                                                                InputLabelProps={{
                                                                                    shrink: true,
                                                                                }}
                                                                            />
                                                                        :
                                                                        <InputBase
                                                                            // classname={classes.baseInput}
                                                                            id={option.id}
                                                                            label={option.label}
                                                                            name={option.name}
                                                                            type={option.type}
                                                                            value={values[option.name]}
                                                                            onChange={handleInputChange}
                                                                            InputLabelProps={{
                                                                                shrink: true,
                                                                            }}
                                                                        />
                                                                }

                                                            </FormControl>
                                                        </>
                                                    )
                                                }
                                            }
                                            else if (option.name === 'patientName') {
                                                return (
                                                    <FormControl key={i} className={classes.margin}>
                                                        <FormLabel className={classes.lableInput}>{option.label}</FormLabel>
                                                        <SearchList
                                                            id={option.name}
                                                            name={option.name}
                                                            value={state.providerId}
                                                            searchTerm={state.providerName}
                                                            onChangeValue={(name, item) => handleSearchListChange(name, item)}
                                                            code="patient_Search"
                                                            apiUrl="ddl/loadItems"
                                                            onChange={handleInputChange}
                                                            placeholderTitle="Search Patient"
                                                        />
                                                    </FormControl>
                                                )
                                            }
                                            else if (option.type === 'text') {
                                                return (
                                                    <FormControl key={i} className={classes.margin}>
                                                        <FormLabel className={classes.lableInput}>{option.label}</FormLabel>

                                                        <InputBaseField
                                                            MaxLength="250"
                                                            placeholder={option.label}
                                                            type={option.type}
                                                            value={values[option.name]}
                                                            id={option.name}
                                                            name={option.name}
                                                            variant="filled"
                                                            size="small"
                                                            onChange={handleInputChange}
                                                        />

                                                    </FormControl>
                                                )
                                            }

                                            else if (option.type === 'number') {
                                                return (
                                                    <>
                                                        <FormControl key={i} className={classes.margin}>
                                                            <FormLabel className={classes.lableInput}>{option.label}</FormLabel>
                                                            <InputBaseField
                                                                MaxLength="250"
                                                                placeholder={option.label}
                                                                type={option.type}
                                                                value={values[option.name]}
                                                                id={option.name}
                                                                name={option.name}
                                                                variant="filled"
                                                                size="small"
                                                                onChange={handleInputChange}
                                                            />
                                                        </FormControl>
                                                    </>
                                                )
                                            }
                                            else if (option.type === 'select') {
                                                return (
                                                    <FormControl key={i} className={classes.margin}>
                                                        <FormLabel className={classes.lableSelectField}>{option.label}</FormLabel>
                                                        <SelectField
                                                            disableUnderline
                                                            placeholder={option.label}
                                                            value={values[option.name]}
                                                            name={option.name}
                                                            onChange={handleInputChange}
                                                            options={option.selectoptions}
                                                        />
                                                    </FormControl>
                                                )
                                            }
                                            else if (option.type === 'checkbox') {
                                                return (
                                                    <FormControl key={i} size="small" variant="filled" className={classes.margin}>
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    checked={values[option.name]}
                                                                    onChange={handleCheckedChange}
                                                                    name={option.name}
                                                                    color="primary"
                                                                />
                                                            }
                                                            label={option.label}
                                                        />
                                                    </FormControl>
                                                )
                                            }
                                        }) : ''
                                    }
                                    <div className={classes.footerButton}>
                                        <FormBtn id="save" type="submit" btnType="order" size="medium">
                                            Apply
                                        </FormBtn >
                                        <FormBtn id="reset" size="medium" onClick={handleClose}>
                                            Close
                                        </FormBtn >
                                    </div >
                                </form>

                            </Popover > : ''
                        }
                    </div> : ''
            }
        </>

    )
}