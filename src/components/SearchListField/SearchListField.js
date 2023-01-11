import React, { useState, useEffect } from "react";

// styles
import {
    InputBase,
    InputAdornment,
    Grid,
    Typography,
    Box, Popper,
} from "@material-ui/core";
import {
    Search as SearchIcon
} from "@material-ui/icons";
import useStyles from "./styles";
import { Autocomplete } from '@material-ui/lab';
import { PostDataAPI } from '../../Services/PostDataAPI';
import CircularProgress from '@material-ui/core/CircularProgress';
import { GetUserInfo } from '../../Services/GetUserInfo';

export default function SearchList({ code, apiUrl, isDisabled, popperWidth, isUser, mandatory, searchId, InputRef, ...props }) {
    const { value } = props;
    var classes = useStyles();
    const [searchTerm, setSearchTerm] = useState(props.searchTerm);
    const [searchResults, setSearchResults] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = useState(open && searchResults.length <= 0);
    let userID = JSON.parse(GetUserInfo()).user.userID;
    useEffect(() => {
        if (true) {

            var params = {
                code: code,
                parameters: isUser ? [userID.toString(), searchTerm] : searchId ? [searchId.toString(), searchTerm] : [searchTerm]
            }
            setLoading(true)
            PostDataAPI(apiUrl, params).then((result) => {
                setLoading(false)
                if (result.success && result.data != null) {
                    result.data = removeDuplicateRecord(result.data, code)
                    console.log(result.data)
                    setSearchResults(
                        result.data.map((item, i) => {
                            return { id: item.text1, value: item.text2 };
                        }));
                }
            });
        }
    }, [searchTerm, value, props.searchTerm, code, searchId]);
    const handleOnChange = (event) => {
        let inputValue = event.target.value;
        setSearchTerm(inputValue);
        if (inputValue === "") {
            let emptyItem = { id: "", value: "", extraParam1: "", extraParam2: "" }
            props.onChangeValue(props.name, emptyItem, props.elemCode);
            setOpen(false);
        }
    };
    const onSelect = (event, item) => {
        props.onChangeValue(props.name, item, props.elemCode);
    }
    function removeDuplicateRecord(dataSet, code) {
        if (code === "refferingProvider" || code === "orderingProvider")
            dataSet = [...new Map(dataSet.map(o => [o["text2"], o])).values()];

        return dataSet;
    }
    const PopperMy = (props) => {
        if (popperWidth != undefined) {
            return (<Popper {...props} placement={'bottom-start'} style={{ width: 350 }} />)
        } else {
            return (<Popper {...props} />)
        }
    }
    const focusOpen = () => {
        if (true) {

            var params = {
                code: code,
                parameters: isUser ? [userID.toString(), searchTerm] : searchId ? [searchId.toString(), searchTerm] : [searchTerm]
            }
            setLoading(true)
            PostDataAPI(apiUrl, params).then((result) => {
                setLoading(false)
                if (result.success && result.data != null) {
                    result.data = removeDuplicateRecord(result.data, code)
                    console.log(result.data)
                    setSearchResults(
                        result.data.map((item, i) => {
                            return { id: item.text1, value: item.text2 };
                        }));
                }
            });
        }
    }
    return (
        <div className={classes.searchPanel} >
            {
                props.value ?

                    <Autocomplete
                        PopperComponent={PopperMy}
                        elevation={8}
                        disableClearable
                        classes={{
                            root: mandatory ? classes.InputBaseAutocompleteMandatory : classes.InputBaseAutocomplete,
                            inputRoot: classes.baseInputAutocomplete,
                        }}
                        getOptionLabel={(option) => option.id ? option.id : ""}
                        defaultValue={{ id: props.value }}
                        onChange={(event, value) => onSelect(event, value)}
                        options={searchResults}
                        disabled={isDisabled}
                        noOptionsText={loading ? 'Loading...' : "No Result Found"}
                        open={open}
                        onOpen={() => {
                            setOpen(true);
                        }}
                        onClose={() => {
                            setOpen(false);
                        }}
                        loading={loading}
                        filterOptions={(options) => options}
                        renderInput={(params) => (
                            <InputBase
                                {...params}
                                fullWidth
                                InputProps={{ ...params.InputProps, type: 'search' }}
                                ref={params.InputProps.ref}
                                inputRef={InputRef}
                                maxLength="280"
                                name={props.name}
                                placeholder={props.placeholderTitle}
                                value={value}
                                onChange={handleOnChange}
                                onFocus={focusOpen}
                                endAdornment={
                                    <InputAdornment position="start">
                                        <>
                                            {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                            {/* <SearchIcon /> */}
                                        </>
                                    </InputAdornment>
                                } />
                        )}
                        renderOption={(option) => {
                            return (
                                <Box className={classes.autoCompleteBox} fullWidth>
                                    <Grid container alignItems="flex-start" justify="flex-start" dirextion="row" className={classes.autoCompleteGrid}>
                                        <Grid container alignItems="flex-start" justify="flex-start" dirextion="row" xs={12} sm={12} md={12} lg={12}>
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
                            getOptionLabel={(option) => option.id ? option.id : ""}
                            defaultValue={{ id: props.value }}
                            onChange={(event, value) => onSelect(event, value)}
                            options={searchResults}
                            disabled={isDisabled}
                            noOptionsText={loading ? 'Loading...' : "No Result Found"}
                            open={open}
                            onOpen={() => {
                                setOpen(true);
                            }}
                            onClose={() => {
                                setOpen(false);
                            }}
                            loading={loading}
                            filterOptions={(options) => options}
                            renderInput={(params) => (
                                <InputBase
                                    {...params}
                                    fullWidth
                                    InputProps={{ ...params.InputProps, type: 'search' }}
                                    inputRef={InputRef}
                                    ref={params.InputProps.ref}
                                    maxLength="280"
                                    name={props.name}
                                    placeholder={props.placeholderTitle}
                                    value={value}
                                    onChange={handleOnChange}
                                    onFocus={focusOpen}
                                    endAdornment={
                                        <InputAdornment position="start">
                                            {loading ? <CircularProgress color="inherit" size={20} /> : <SearchIcon />}
                                        </InputAdornment>
                                    } />
                            )}
                            renderOption={(option) => {
                                return (
                                    <Box className={classes.autoCompleteBox} fullWidth>
                                        <Grid container alignItems="flex-start" justify="flex-start" dirextion="row" className={classes.autoCompleteGrid}>
                                            <Grid container alignItems="flex-start" justify="flex-start" dirextion="row" xs={12} sm={12} md={12} lg={12}>
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
