import React, { useState, useEffect } from "react";
import {
    CircularProgress,
    InputBase,
    Button,
    Popover,
    FormControl,
    FormLabel,
    Chip,
    Checkbox,
    FormControlLabel, TextField, Grid as NewGrid
} from "@material-ui/core";
import {
    Search as SearchIcon
} from "@material-ui/icons";
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';
import { MDBInput, MDBDataTable } from 'mdbreact';
import { data as gridCnfg } from './Data/SetupData';
import { SearchPanelSetupData as SearchPanelData } from '../SearchPanel/Data/SetupData';
import { InputBaseField, SelectField } from '../../components/InputField'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'mdbreact/dist/css/mdb.css';
import { FormBtn } from '../../components/UiElements/UiElements'
import useStyles from "./styles";
import './style.css'
//
import SearchGridForm from "../SearchPanel/SearchGridForm"
// import './style.css';

import { PostDataAPI } from '../../Services/PostDataAPI';
import { APICall } from '../../Services/APICall';
//
//
// const useStyles = makeStyles((theme) => ({
//     bgColor: {
//         backgroundColor: "rgb(217 223 223)",
//         '& > * + *': {
//             marginLeft: theme.spacing(2),
//         },
//     },
// }));
export default function Grid({ onChange, update, ...props }) {
    // const {searchPanalParams}=props;

    const [rowsData, setRowsData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchdataoptions, setSearchDataOptions] = useState(["", ""]);
    const [values, setValues] = useState({});
    //
    var classes = useStyles();
    const [arrChecked] = useState([]);

    const handleCheckBox = (e) => {
        //    alert('clicked ' + e.target.checked);
        if (e.target.checked == true) {
            arrChecked.push(e.target.name)
        }
        else {
            const index = arrChecked.indexOf(e.target.name);
            if (index > -1) {
                arrChecked.splice(index, 1);
            }
        }

        if (onChange)
            onChange(e);
    };

    useEffect(() => {
        if (true) {
            if (props.filter !== undefined) {
                loadGridData(props.filter);
            }
            else {
                loadGridData(values);
            }
        };
    }, [props.filter, update]);

    const loadGridData = (filtervalues) => {
        setIsLoading(true);
        PostDataAPI(props.apiUrl, filtervalues).then((result) => {
            setIsLoading(false);
            if (props.isRecordExist) {
                if (result.data.length > 0) {
                    props.isRecordExist(false)
                }
                else { props.isRecordExist(true) }
            }
            if (result.success) {
                //setRowsData(result.data);
                setRowsData(
                    result.data.map((item, i) => {
                        if (props.selection == "true")
                            item.check = <MDBInput type="checkbox" name={item[gridCnfg[props.code][0].field]} onChange={handleCheckBox} color="primary" />

                        if (props.dp == "true")
                            item.dp = <img src={item['photoPath'] ? "." + item['photoPath'] : "./static/media/profile-pic.7e2ec63d.jpg"} alt="" className={classes.userDp} />

                        return { ...item, clickEvent: e => handleClick(e, item[gridCnfg[props.code][0].field]) }
                    }));

            }
            else {
                console.log(result.message)
            }
        })
    }
    const handleClick = (e, dataId) => {
        // console.log('Data Id', dataId);
        if (props.rowClick)
            props.rowClick(dataId);

    };
    const tableData = {
        columns: gridCnfg[props.code],
        rows: rowsData,

    };
    const onSearchSubmit = (searchvalues) => {
        //setValues(searchvalues);
        loadGridData(searchvalues);
    }
    return (
        <>
            <SearchGridForm defaultvalues={values} searchPanelParams={props.searchPanelParams} Apply={onSearchSubmit} />
            {isLoading ? (
                <>

                    <Skeleton className={classes.bgColor} animation="wave" variant="rect" width="100%">
                        <div style={{ paddingTop: '27%' }} />
                    </Skeleton>
                </ >
            ) : (
                <>
                    {/* <SearchPanel setSearchValue={setSearchValue} placeholderTitle="Patient" options={searchdata} /> */}

                    <div className={props.dp == 'true' ? 'dp-table' : ''}>
                        {
                            props.searchPanelParams ?
                                <>

                                    <MDBDataTable
                                        striped
                                        small
                                        btn
                                        searching={false}
                                        data={tableData}
                                    />
                                </>
                                :
                                <>
                                    <MDBDataTable
                                        striped
                                        small
                                        btn
                                        searching={props.searchShowHide}
                                        data={tableData}
                                    />
                                </>
                        }
                    </div>
                </>

            )
            }
        </>
    );
}
