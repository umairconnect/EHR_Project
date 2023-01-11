import React, { useState, useEffect } from "react";

// styles
import {
    InputBase,
    MenuList,
    MenuItem,
    Menu,
    TextField,
    List,
    ListItem,
    ClickAwayListener,
    Popper,
    Paper,
    Popover,
    InputAdornment,
    IconButton,
    Grid,
    Typography,
    Avatar,
    Box
} from "@material-ui/core";
import { ProfileImage } from "../../images/profile-pic.jpg"
import CloseIcon from "../../images/icons/math-plus.png";
import {
    Search as SearchIcon, AccountCircle
} from "@material-ui/icons";
//import Skeleton from '@material-ui/lab/Skeleton';
import useStyles from "./styles";
import classNames from "classnames";
import { Autocomplete } from '@material-ui/lab';
import { PostDataAPI } from '../../Services/PostDataAPI';
import { GetDataAPI } from '../../Services/GetDataAPI';
import { InputBaseField } from '../InputField/InputField'
import CircularProgress from '@material-ui/core/CircularProgress';
export default function PatientSearchList(props) {
    const { value } = props;
    var classes = useStyles();
    const anchorRef = React.useRef(null);
    const [open, setOpen] = useState(false);
    const [defvalue, setDefValue] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(1);
    const [Multikey, setMultikey] = useState(0);
    const [loading, setLoading] = useState(open && searchResults.length <= 0);
    const [clearIcon, setClearIcon] = useState(false);

    const clearSearch = (e) => {
        let inputValue = e.target.value;

        let emptyItem = { id: 0, value: "", extraParam1: "", extraParam2: "" }
        props.onChangeValue(props.name, emptyItem, props.elemCode);

        
        setSearchTerm("");
        setMultikey(1);
        setOpen(false);
        setClearIcon(false)
        setTimeout(() => {
            setMultikey(0);
        }, 100)

    }


    useEffect(() => {
        if (true) {
            // let data = ["a","l","i"];
            let data = { searchname: searchTerm };
            // PostDataAPI('patient/GetPatient', searchTerm).then((result) => {
            GetDataAPI('patient/GetSearchPatients', "name=" + searchTerm).then((result) => {
                if (result.success) {

                    if (result.data != null) {
                        console.log(result.data);
                        //
                        result.data.map((item, i) => {
                            if (item.d1 !== null) {
                                item.text2 = getAgeByDOB(item.d1.split('T')[0]);
                                item.d1 = new Date(item.d1).toLocaleDateString('en-US');
                            }

                        });

                        setSearchResults(
                            result.data
                        );
                    }

                }
                else {
                    console.log(result.message)
                }
            })
        }
        //setSearchResults(results);
    }, [searchTerm, value]);

    const getDefaultValue = (value) => {
        console.log(value);
        if (value && value != "" && value != null) {
            searchResults.map((i) => {
                if (i.text1 === value) {
                    console.log(i);
                    setDefValue(i);
                }
            })
        }
    }
    const onClick = (event) => {
        if (searchTerm != null && searchTerm.length >= 1) {
            setAnchorEl(true);
        } else {
            setAnchorEl(false);
        }

        if (true) {
            // let data = ["a","l","i"];
            let data = { searchname: searchTerm };
            // PostDataAPI('patient/GetPatient', searchTerm).then((result) => {
            GetDataAPI('patient/GetSearchPatients', "name=" + searchTerm).then((result) => {
                if (result.success) {

                    if (result.data != null) {
                        console.log(result.data);
                        //
                        result.data.map((item, i) => {
                            if (item.d1 !== null) {
                                item.text2 = getAgeByDOB(item.d1.split('T')[0]);
                                item.d1 = new Date(item.d1).toLocaleDateString('en-US');
                            }

                        });

                        setSearchResults(
                            result.data
                        );
                    }

                }
                else {
                    console.log(result.message)
                }
            })
        }
    };
    const handleOnChange = (event) => {
        console.log("onChange" + event.target.name);
        let inputValue = event.target.value;
        // if(inputValue.length!=null && inputValue.length >= 1){
        //     // setOpen(true);
        //     setAnchorEl(true);
        // }else{
        //   setAnchorEl(false);
        //   // setOpen(false);
        // }
        setSearchTerm(inputValue);
       
        setClearIcon(true)

        if (inputValue === "") {
            let emptyItem = { id: 0, value: "", extraParam1: "", extraParam2: "" }
            props.onChangeValue(props.name, emptyItem, props.elemCode);
            setOpen(false);
            setClearIcon(false)
        } else (
            setClearIcon(true)
        )

    };
    const onFocus = (event) => {
        // console.log("onFocus");
    };
    const onKeyDown = (event) => {
        // console.log("onKeyDown");
        if (searchTerm != null && searchTerm.length >= 1) {
            setAnchorEl(true);
        } else {
            setAnchorEl(false);
        }
    };
    const onKeyUp = (event) => {
        // console.log("onKeyUp");
    };
    const handleClose = () => {
        setAnchorEl(false);
    };
    const onBlur = (event) => {
        // console.log("onBlue");
        setOpen(false);
    };
    const handleMenuItemClick = (event, index) => {

        const item = searchResults[index];
        console.log("item.firstName" + item.id);
        setSearchTerm(item.text1);
        if (item != null && item.id != null && item.id != "") {
            props.onChangeValue(item.id,item);
        }
        setAnchorEl(false);
    };
    const keyPressed = (e) => {
        console.log(e);
        if (e.key === 38 || e.key === 40) {
            setAnchorEl(false);
        }
    }
    const onSelect = (event, value) => {
        let _id = '';
        let _value = '';
        if (value == null) {
            let emptyItem = { id: _id, value: _value, extraParam1: "", extraParam2: "" }
            props.onChangeValue('',emptyItem);
            return;
        }
        searchResults.map((item) => {
            if (value.text1 != null && item.text1 === value.text1) {
                _id = item.id;
                _value = value.text1;
            }
        });
        if (_id != null && _id != "") {
            let _item = { id: _id, value: _value, extraParam1: "", extraParam2: "" }
            props.onChangeValue('',_item);
            console.log(_item);
            console.log(props);
        }
        setClearIcon(true);
    }

    const handleOnFocus = (e) => {
        setSearchTerm("");
     


    }

    function getAgeByDOB(birthDate) {
        var result = '';
        if (birthDate.trim() != '' && birthDate != undefined) {

            var mdate = birthDate;
            var yearThen = parseInt(mdate.substring(0, 4), 10);
            var monthThen = parseInt(mdate.substring(5, 7), 10);
            var dayThen = parseInt(mdate.substring(8, 10), 10);

            var today = new Date();
            var birthday = new Date(yearThen, monthThen - 1, dayThen);
            var differenceInMilisecond = today.valueOf() - birthday.valueOf();

            var year_age = Math.floor(differenceInMilisecond / 31536000000);
            var day_age = Math.floor((differenceInMilisecond % 31536000000) / 86400000);
            var month_age = Math.floor(day_age / 30);
            day_age = day_age % 30;


            if (isNaN(year_age) || isNaN(month_age) || isNaN(day_age))
                result = '';
            else if (year_age > 0)
                result = year_age + ' years, ' + month_age + ' months, ' + day_age + ' day(s)';
            else if (year_age === 0 && month_age > 0)
                result = month_age + ' months, ' + day_age + ' day(s)';
            else if (year_age > 0 && month_age === 0)
                result = year_age + ' years, ' + day_age + ' day(s)';
            else if (day_age === 0)
                result = '';
            else {
                result = day_age + ' day(s)';
            }

        }
        return result;
    }

    return (
        <div className={classes.searchPanel} >
            {/* <div className={classes.searchPanelBox}  > */}

            <Autocomplete
                elevation={8}

                classes={{
                    root: classes.InputBaseAutocomplete,
                    inputRoot: classes.baseInputAutocomplete,
                    // paper:classes.autoCompletePaper
                }}
                key={[props.reRender, Multikey]}
                getOptionLabel={(option) => option.text1}
                defaultValue={{ text1: props.name }}
                onChange={(event, value) => onSelect(event, value)}
                noOptionsText={loading ? 'Loading...' : "No Result Found"}
                // options={searchResults.map((option) => option.text1)}
                options={searchResults}
                loading={loading}
                renderInput={(params) => (
                    <InputBase
                        {...params}
                        fullWidth
                        InputProps={{ ...params.InputProps, type: 'search' }}
                        ref={params.InputProps.ref}
                        maxLength="280"
                        name="searchname"
                        onFocusCapture={handleOnFocus}
                        placeholder={props.placeholderTitle}
                        value={searchTerm}
                        onChange={handleOnChange}
                        endAdornment={
                            <InputAdornment position="start">
                                <>
                                    {loading ? <CircularProgress color="inherit" size={20} /> :
                                        <>
                                            {clearIcon && value ? 
                                                <img className={classes.closeIcon} onClick={clearSearch} src={CloseIcon} /> : <SearchIcon />
                                            }

                                        </>
                                    }
                                </>
                            </InputAdornment>
                        } />
                )}
                renderOption={(option) => {
                    return (
                        <Box className={classes.autoCompleteBox} fullWidth>
                            <Grid container alignItems="flex-start" justify="flex-start" dirextion="row" spacing={1} className={classes.autoCompleteGrid}>
                                <Grid item xs={2} sm={2} md={2} lg={2}>
                                    <Avatar className={classes.icon} src={option.p1 ? "." + option.p1 : ""} />
                                </Grid>
                                <Grid container xs={10} sm={10} md={10} lg={10} direction="row" justify="flex-start">
                                    <Grid container direction="row" xs={8} sm={12} md={12} lg={12}>
                                        <Grid item xs={6} sm={7} md={7} lg={7}>
                                            <Typography className={classes.NameTypography} align="left">
                                                {option.text1}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4} sm={5} md={5} lg={5}>
                                            <Typography className={classes.NumberTypography} align="right">
                                                {option.id1}
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={8} sm={12} md={12} lg={12}>
                                        <Typography className={classes.AgeTypography} align="left" >
                                            {option.d1} {option.text2 == "" ? "" : " | "}{option.text2}
                                        </Typography>
                                    </Grid>
                                </Grid>

                                {/* <Grid item xs={2} sm={2} md={2} lg={2}>
                <Typography align="right" className={classes.NumberTypography}>
                 {option.id1}
                </Typography>
              </Grid> */}
                            </Grid>
                        </Box>
                    );
                }}
            />
        </div>

    );
}
