import React, { useState, useEffect } from "react";

// styles
import {
    InputBase,
    InputAdornment,
    Grid,
    Typography,
    Box, Popper
} from "@material-ui/core";
import {
    Search as SearchIcon
} from "@material-ui/icons";

import useStyles from "./styles";
import { Autocomplete } from '@material-ui/lab';
import { PostDataAPI } from '../../Services/PostDataAPI';
import CircularProgress from '@material-ui/core/CircularProgress';
import { GetUserInfo } from '../../Services/GetUserInfo';
import CloseIcon from "../../images/icons/math-plus.png";

export default function SearchList({ code, apiUrl, isDisabled, popperWidth, isUser, mandatory, searchId, ...props }) {
    const { value } = props;
    var classes = useStyles();
    const [searchTerm, setSearchTerm] = useState(props.searchTerm);
    const [searchResults, setSearchResults] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = useState(open && searchResults.length <= 0);
    let userID = JSON.parse(GetUserInfo()).user.userID;

    const [listLoaded, setListLoaded] = React.useState(false);
    const [timeCount, setTimeCount] = React.useState(0);
    const [timerStarted, setTimerStarted] = React.useState(false);
    const [Multikey, setMultikey] = useState(0);

    const [clearIcon, setClearIcon] = useState(false);


    useEffect(() => {
        if (props.reload == true) {
            loadList();
        }
       

    }, [searchTerm, value, props.searchTerm, code, searchId]);

    const setLoadTimer = () => {
        setTimeout(() => {
            console.log("timeCount: " + timeCount);
            if (timeCount == 1) {
                setTimerStarted(false);
                setTimeCount(0);
                loadList();
            }
            else {
                setLoadTimer();
            }
        }, 500);
        setTimeCount(1);
    }

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

    const loadList = () => {
        setListLoaded(true);

       
        var params = {
            code: code,
            parameters: isUser ? [userID.toString(), searchTerm] : searchId ? [searchId.toString(), searchTerm] : [searchTerm]
        }
        setLoading(true)
        PostDataAPI(apiUrl, params).then((result) => {
            setLoading(false)
            if (result.success && result.data != null) {
                result.data = removeDuplicateRecord(result.data, code)

                setSearchResults(
                    result.data.map((item, i) => {
                        return { id: item.text1, value: item.text2, extraParam1: item.text3, extraParam2: item.text4, extraParam3: item.text5, };
                    }));

                // to handle custom serach
                if (props.getInputValue && result.data.length === 0)
                    props.getInputValue(searchTerm);
            }
            else {
                // to handle custom serach
                if (props.getInputValue && result.data == null)
                    props.getInputValue(searchTerm);

            }

        });

       
    }
    const onBlur = () => {
        if(Multikey === 0) {
            setMultikey(1);
        } else {
            setMultikey(0);
        }
    
        setSearchTerm("");
        setOpen(false);
        setClearIcon(false)
        setSearchResults([]);

    }
    const handleOnFocus = (e) => {

        loadList();
        setSearchTerm("");
        setSearchResults([]);

        setListLoaded(false)
        if (listLoaded == false)//!searchResults || searchResults.length < 1)
            loadList();


    }
    const handleOnChange = (event) => {


        loadList();

        let inputValue = event.target.value;
        setSearchTerm(inputValue);


        if (inputValue === "") {
            let emptyItem = { id: 0, value: "", extraParam1: "", extraParam2: "" }
            props.onChangeValue(props.name, emptyItem, props.elemCode);
            setOpen(false);
            setClearIcon(false)
        } else (
            setClearIcon(true)
        )



    };
    const onSelect = (event, item) => {
        props.onChangeValue(props.name, item, props.elemCode);
        setClearIcon(true);
        setSearchResults([]);
    }
    function removeDuplicateRecord(dataSet, code) {
        if (code === "refferingProvider" || code === "orderingProvider")
            dataSet = [...new Map(dataSet.map(o => [o["text2"], o])).values()];

        return dataSet;
    }
    const PopperMy = (props) => {
        if (popperWidth != undefined) {
            return (<Popper placement={'bottom-start'} {...props} style={{ width: 350 }} />)
        } else {
            return (<Popper {...props} />)
        }
    }
    return (
        <div className={classes.searchPanel} >
            {
                props.searchTerm ?

                    <Autocomplete
                        PopperComponent={PopperMy}
                        elevation={8}
                        disableClearable
                        classes={{
                            root: mandatory ? classes.InputBaseAutocompleteMandatory : classes.InputBaseAutocomplete,
                            inputRoot: classes.baseInputAutocomplete,
                        }}

                        getOptionLabel={(option) => option.value ? option.value : ""}
                        defaultValue={{ value: props.searchTerm }}
                        onChange={(event, value) => onSelect(event, value)}
                        options={searchResults}
                        disabled={isDisabled}
                        noOptionsText={loading ? 'Loading...' : "No Result Found"}
                        open={open}
                        onBlur={onBlur}
                        key={props.reRender}
                        onOpen={() => {
                            setOpen(true);
                        }}
                        onClose={() => {
                            setOpen(false);
                        }}
                        loading={loading}
                        //filterOptions={(options) => options}
                        // freeSolo
                        renderInput={(params) => (
                            <InputBase
                                {...params}
                                fullWidth={true}
                                Inputprops={{ ...params.InputProps, type: 'search' }}
                                ref={params.InputProps.ref}
                                maxLength="280"
                                name="searchlist"
                                placeholder={props.placeholderTitle}
                                value={searchTerm}
                                onChange={handleOnChange}
                                onFocusCapture={handleOnFocus}
                                endAdornment={
                                    <InputAdornment position="start">
                                        <>
                                            {loading ? <CircularProgress color="inherit" size={20} /> :
                                                <>
                                                    {clearIcon ?
                                                        <img className={classes.closeIcon} onClick={clearSearch} src={CloseIcon} /> : <SearchIcon />
                                                    }

                                                </>
                                            }
                                            {/* <SearchIcon /> */}
                                        </>
                                    </InputAdornment>
                                } />
                        )}
                        renderOption={(option) => {
                            return (
                                <Box className={classes.autoCompleteBox} fullwidth="true">
                                    <Grid container alignItems="flex-start" justify="flex-start" dirextion="row" className={classes.autoCompleteGrid}>
                                        <Grid container item alignItems="flex-start" justify="flex-start" dirextion="row" xs={12} sm={12} md={12} lg={12}>
                                            <Typography className={classes.NameTypography} align="left">
                                                {option.value}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            );
                        }}
                    /> :
                    <div style={{ width: "100%" }}>
                        <Autocomplete
                            PopperComponent={PopperMy}
                            elevation={8}
                            disableClearable
                            classes={{
                                root: mandatory ? classes.InputBaseAutocompleteMandatory : classes.InputBaseAutocomplete,
                                inputRoot: classes.baseInputAutocomplete,
                            }}
                            getOptionLabel={(option) => option.value ? option.value : ""}
                            defaultValue={{ value: props.searchTerm }}
                            onChange={(event, value) => onSelect(event, value)}
                            options={searchResults}
                            disabled={isDisabled}
                            noOptionsText={loading ? 'Loading...' : "No Result Found"}
                            open={open}
                            key={[props.reRender, Multikey]}
                            onBlur={onBlur}
                            onOpen={() => {
                                setOpen(true);
                            }}
                            onClose={() => {
                                setOpen(false);
                            }}
                            loading={loading}
                            //filterOptions={(options) => options}
                            // freeSolo
                            renderInput={(params) => (
                                <InputBase
                                    {...params}
                                    fullWidth={true}
                                    InputProps={{ ...params.InputProps, type: 'search' }}
                                    ref={params.InputProps.ref}
                                    maxLength="280"
                                    name="searchlist"
                                    placeholder={props.placeholderTitle}
                                    value={searchTerm}
                                    onChange={handleOnChange}
                                    onFocusCapture={handleOnFocus}
                                    endAdornment={
                                        <InputAdornment position="start">


                                            {loading ? <CircularProgress color="inherit" size={20} /> :
                                                <>
                                                    {clearIcon && props.searchTerm > 0 ?
                                                        <img className={classes.closeIcon} onClick={clearSearch} src={CloseIcon} /> : <SearchIcon />
                                                    }

                                                </>
                                            }

                                        </InputAdornment>
                                    } />
                            )}
                            renderOption={(option) => {
                                return (
                                    <Box className={classes.autoCompleteBox} fullwidth="true">
                                        <Grid container alignItems="flex-start" justify="flex-start" dirextion="row" className={classes.autoCompleteGrid}>
                                            <Grid container item alignItems="flex-start" justify="flex-start" dirextion="row" xs={12} sm={12} md={12} lg={12}>
                                                <Typography className={classes.NameTypography} align="left">
                                                    {option.value}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                );
                            }}
                        />
                    </div>
            }
        </div>

    );
}
