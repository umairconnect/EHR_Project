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
import { Link } from "react-router-dom";
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';
import { MDBInput, MDBDataTable } from 'mdbreact';
import { data as gridCnfg } from './Data/ClinicalData';
import { SearchPanelSetupData as SearchPanelData } from '../SearchPanel/Data/SetupData';
import { InputBaseField, SelectField } from '../../components/InputField'
import '@fortawesome/fontawesome-free/css/all.min.css';
import LoadingIcon from "../../images/icons/loaderIcon.gif";

import 'mdbreact/dist/css/mdb.css';
import { FormBtn } from '../../components/UiElements/UiElements'
import useStyles from "./styles";
import './styles.css'
//
import SearchGridForm from "../SearchPanel/SearchGridForm"
// import './style.css';

import { PostDataAPI } from '../../Services/PostDataAPI';
import { APICall } from '../../Services/APICall';

import { Table, Empty } from "antd";
import "../antd.css";
import "../SearchGrid/antStyle.css";
export default function ClinicalGrid({ onChange, ...props }) {
    // const {searchPanalParams}=props;

    const [rowsData, setRowsData] = useState([
        { patientName: "", dateOfService: "", renderingProvider: "", locked: "", supervisingSignedOff: "" }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchdataoptions, setSearchDataOptions] = useState(["", ""]);
    const [values, setValues] = useState({});
    //
    var classes = useStyles();
    var dataFilters = {};

    useEffect(() => {
        if (true) {
            // let data = ["test", "test 2"];

            dataFilters = {
                providerIds: props.filter.providerIds.toString(),
                locationIds: props.filter.locationIds.toString(),
                patientIds: props.filter.patientIds.toString(),
                userid: props.filter.userId,
                fromDate: props.filter.fromDate,
                toDate: props.filter.toDate,
                isexclude: props.filter.isexclude.toString(),
                isViewUnsignedOnly: props.filter.isViewUnsignedOnly.toString(),
                isPendingSuperBills: props.filter.isPendingSuperBills.toString()

            };

            loadGridData(dataFilters);
        };

    }, [props.updateState]);

    const loadGridData = (filtervalues) => {

        PostDataAPI(props.apiUrl, filtervalues).then((result) => {

            if (result.success) {
                setIsLoading(false);

                if (result.data) {

                    setRowsData(
                        result.data.map((item, i) => {
                            item.patientName = <Link style={{ minWidth: 140, display: "block", textDecoration: "none", fontSize: "13px", color:"#03B5E5" }}
                                onClick={() => props.rowClick(item.patientId)}>
                                {item.patientName}
                            </Link>

                            if (props.selection == "true")
                                item.check = <MDBInput type="checkbox" name={item[gridCnfg[props.code][0].field]} color="primary" /> /*onChange = { handleCheckBox }*/

                            if (props.dp == "true") {
                                item.dp = <img src={item['photoPath'] ? "." + item['photoPath'] : "./static/media/profile-pic.7e2ec63d.jpg"} alt="" className={classes.userDp} />
                            }

                            item.serviceDate = item.serviceDate ? item.serviceTime ? item.serviceDate + ' ' + item.serviceTime : item.serviceDate : '';

                            if (item.encounterId > 0) {
                                item.action = <Link
                                className={classes.viewNotesBtn}
                                    to={{
                                        pathname: '/app/encounter',
                                        search: '?id=' + item.userLocationId + '/' + item.patientId + '/' + item.patientAppointmentId,
                                        //search: '?id=' + dataId ,
                                        state: JSON.stringify({
                                            patientId: item.patientId,
                                            appoitmentId: item.patientAppointmentId,
                                            userLocationID: item.userLocationId,
                                            clinicalNotes: "clinical",
                                            stateFilters: dataFilters

                                        }),
                                        encounterId: item.encounterId
                                    }}>
                                    View Note
                                </Link>
                            }
                            else {
                                item.action =
                                    props.isEditable ? <Link
                                       className={classes.viewNotesBtn}
                                        to={{
                                            pathname: '/app/encounter',
                                            search: '?id=' + item.userLocationId + '/' + item.patientId + '/' + item.patientAppointmentId,
                                            //search: '?id=' + dataId ,
                                            state: JSON.stringify({
                                                patientId: item.patientId,
                                                appoitmentId: item.patientAppointmentId,
                                                userLocationID: item.userLocationId,
                                                clinicalNotes: "clinical",
                                                stateFilters: dataFilters

                                            }),
                                            encounterId: item.encounterId
                                        }}>
                                        Start Note
                                    </Link> :
                                    <span className={classes.viewNotesBtnDisable}>Start Note</span>
                            }
                            return { ...item }

                            //clickEvent: e => handleClick(e, item[gridCnfg[props.code][0].field])
                        }));
                }

            }
            else {
                console.log(result.message)
                setIsLoading(false);
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
        loadGridData(searchvalues);
    }

    //const handleCheckBox = (e) => {
    //    //    alert('clicked ' + e.target.checked);
    //    if (e.target.checked == true) {
    //        arrChecked.push(e.target.name)
    //    }
    //    else {
    //        const index = arrChecked.indexOf(e.target.name);
    //        if (index > -1) {
    //            arrChecked.splice(index, 1);
    //        }
    //    }

    //    if (onChange)
    //        onChange(e);
    //};

    return (
        <>
            {isLoading ? (
                <>
                    <Skeleton className={classes.bgColor} animation="wave" variant="rect" height={41} width="100%" style={{ marginBottom: 6 }} />
                    <Skeleton className={classes.bgColor} animation="wave" variant="rect" width="100%">
                        <div style={{ paddingTop: '27%' }} />
                    </Skeleton>
                </ >
            ) : (
                <>
                    <div className={props.dp == 'true' ? 'dp-table' : ''}>
                        {
                            // props.searchPanelParams ?
                            <>
                                <SearchGridForm defaultvalues={values} searchPanelParams={props.searchPanelParams} Apply={onSearchSubmit} />

                                <>
                                    <div className={props.dp == 'true' ? 'dp-table' : ''}>
                                        <div className="custom-grid">
                                            <Table
                                                // onRow={(record, rowIndex) => {
                                                //     return {
                                                //         onClick: (e) => handleRowClick(e, record.key),
                                                //     };
                                                // }}
                                                locale={{
                                                    emptyText: (
                                                        <Empty
                                                            image={isLoading && LoadingIcon}
                                                            description={isLoading ? "Loading..." : "No Record Found"}
                                                            imageStyle={{ height: 30, display: !isLoading ? "none" : "" }}
                                                        />
                                                    )
                                                }}
                                                checkStrictly={true}
                                                rowClassName={(record, index) => "claimRow"}
                                                scroll={true}
                                                pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: [5, 10, 20, 30] }}
                                                // pagination={{ pageSize: pageCount ? pageCount : 10 }}
                                                dataSource={rowsData}
                                                columns={gridCnfg["ClinicalNotes2"]}
                                            // rowSelection={isSelection ? { selectedRowKeys: selectedRows, onChange: onSelectChange } : null}
                                            />
                                        </div>
                                    </div>
                                </>
                                {/* <MDBDataTable
                                    striped
                                    small
                                    btn
                                    searching={false}
                                    data={tableData}
                                /> */}
                            </>
                            // :
                            // <>
                            //     <MDBDataTable
                            //         striped
                            //         small
                            //         btn
                            //         searching={props.searchShowHide}
                            //         data={tableData}
                            //     />
                            // </>
                        }
                    </div>
                </>

            )
            }
            {/* paging={false}  info={false} responsive btn fixed striped bordered scrollY entries={5} maxHeight="50vh" hover*/}

        </>
    );
}
