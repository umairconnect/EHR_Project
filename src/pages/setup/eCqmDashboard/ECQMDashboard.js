import React, { useState, useEffect } from "react";
//material ui
import {
    Button,
    Grid,
    Box,
    Typography,
    LinearProgress
} from "@material-ui/core";

//images
import UserIcon from "../../../images/icons/user.png";
import BlockIcon from "../../../images/icons/block.png";

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useHistory } from "react-router-dom";

// components
import PageTitle from "../../../components/PageTitle/PageTitle";
import { FormBtn, Label } from "../../../components/UiElements/UiElements";
import { data as gridCnfg } from '../../../components/SearchGrid/component/setupData';
import { Table, Empty } from "antd";

import LoadingIcon from "../../../images/icons/loaderIcon.gif";
import SearchList from "../../../components/SearchList/SearchList";

import { withSnackbar } from '../../../components/Message/Alert';
import GenerateQRDAIIIFile from "./components/generateQRDAIIIFile/GenerateQRDAIIIFile";
import ECQMReportingGroup from "./components/eCQMReportingGroup/ECQMReportingGroup";
import { InputBaseField, CheckboxField, SelectField } from "../../../components/InputField/InputField";
import { PostDataAPI } from '../../../Services/PostDataAPI';


// styles
import useStyles from "./styles";
import '../../../components/SearchGrid/style.css';
import '../../../components/antd.css';
import '../../../components/SearchGrid/antStyle.css';
const ECQMDashboard = ({ showMessage, ...props }) => {
    const options = [
        { label: 'Option 1', value: 1 },
        { label: 'Option 2', value: 2 },
        { label: 'Option 2', value: 3 },
    ];
    const history = useHistory();

    const classes = useStyles();
    const [groups, setGroups] = useState([]);
    const [performanceYearsList, setPerformanceYearsList] = useState([]);
    const currentYear = new Date().getFullYear().toString();
    const [state, setState] = useState({ year: currentYear});

    const [isLoading, setIsLoading] = useState(false);
    const [rowsData, setRowsData] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);

    const [qrdaDialogState, setQrdaDialogState] = useState(false);
    const [ecqmReportingGroupState, setEcqmReportingGroupState] = useState(false);

    const onSelectChange = (selectedRowKeys) => {
        setSelectedRows(selectedRowKeys);
    }
    const handleChange = (e) => {

        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    const openQrdaDialog = () => {
        setQrdaDialogState(true)
    }
    const openEcqmReportingDialog = () => {
        setEcqmReportingGroupState(true)
    }
    const handleSearchListChange = (name, item) => {
        const { id, value, extraParam2 } = item;

        setState(prevState => ({
            ...prevState,
            eCQMId: id,
            eCQMName: value
        }));

    }

    const loadData = () => {
        var filtervalues = [
            state.groupId,
            state.year,
            state.eCQMId
        ];
        PostDataAPI("ecqm/loadGrid", filtervalues).then((result) => {

            if (result.success && result.data != null) {
                setRowsData(
                    result.data.map((item, i) => {
                        item.key = item.eCQMDashboardId
                        item.score =
                            <Box display="flex" alignItems="center">
                                <Box width="100%" mr={1}>
                                    <LinearProgress variant="determinate" value={item.score}
                                        classes={{
                                            root: classes.root,
                                            bar: classes.bar,
                                        }} />
                                </Box>
                                <Box minWidth={35}>
                                    <Typography variant="body2" color="textSecondary">{`${Math.round(item.score)}%`}</Typography>
                                </Box>
                            </Box>
                        item.nmt = <span>
                            <img
                                src={UserIcon}
                                alt='user-icon'
                                className={classes.userIcon} />
                            {`${item.numerator}/${item.denominator}`}
                        </span>

                        item.exc = <span>
                            <img
                                src={BlockIcon}
                                alt='block-icon'
                                className={classes.userIcon} />
                            {`${item.exclusion}/${item.exception}`}
                        </span>
                        return { ...item }
                    }));
            }

        });

    }
    const loadGroupsData = () => {

        var params = {
            code: "get_ecqm_group",
            parameters: []
        }
        PostDataAPI("ddl/loadItems", params).then((result) => {
            if (result.success && result.data != null) {
                setGroups(
                    result.data.map((item, i) => {
                        return { value: item.text1, label: item.text2 };
                    }));
            }
        });

    }
    const loadPerformanceYearsList = () => {
        let _years = [];
        let currentYear = new Date().getFullYear();
        for (var i = 0; i < 10; i++) {
            _years.push({ value: currentYear - i, label: currentYear - i });
        }

        setPerformanceYearsList(_years);

    }
    const handleReportingGroupSave = () => {
        loadGroupsData();
        setEcqmReportingGroupState(false);
    }
    const CalculateeCQM = e => {
        if (!state.groupId || state.groupId == '') {
            showMessage("Warning", "Please select group to calculate eCQMs", "error", 3000);
            return;
        }
        if (!state.year || state.year == '') {
            showMessage("Warning", "Please select performance year to calculate eCQMs", "error", 3000);
            return;
        }
        let method = "ecqm/add";
        //if (dataId.dataId ? dataId.dataId : dataId > 0)
        //    method = "ecqm/updateReportingGroup";
        var obj = {
            groupId: parseInt(state.groupId),
            year: state.year
        }
        PostDataAPI(method, obj, true).then((result) => {
            //setSaveLoading(false);
            if (result.success == true) {
                //setErrorMessages([]);
                //if (dataId < 1) {
                //if (result.success && result.data != null) {

                //setPayer(result.data);
                loadData();
                showMessage("Success", "eCQMs calculated successfully.", "success", 2000);
                //handleSave();

                //}
                //}
                //else if (dataId > 0 || dataId != "") {
                //    if (result.success) {
                //        showMessage("Success", "Payer updated successfully.", "success", 3000);
                //        props.getChangePage(false);
                //    }
                //}
            }
            else {
                showMessage("Error", result.message, "error", 3000);
            }
        })

    };
    useEffect(() => {
        loadGroupsData();
        loadPerformanceYearsList();
        loadData();
    }, [])

    return (
        <>
            <PageTitle title="eCQM Dashboard" />
            <div style={{ margin: "20px" }}>

                <div className={classes.searchArea}>
                    <Grid container className={classes.customGrid} direction="row" lg={12} alignItems="baseline">
                        <Grid item xs={6} lg={6} md={6} sm={6} >
                            <Grid container className={classes.customGrid} direction="row" lg={12} alignItems="baseline">
                                <Label title="Group" size={4} />
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <SelectField
                                        id="groupId"
                                        name="groupId"
                                        value={state.groupId}
                                        onChange={handleChange}
                                        options={groups}
                                        placeholder="Select Facility Group"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={6} lg={6} md={6} sm={6} >
                            <Grid container className={classes.customGrid} direction="row" lg={12} alignItems="baseline">
                                <Label title="Performance Year" size={3} />
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <SelectField
                                        id="year"
                                        name="year"
                                        value={state.year}
                                        onChange={handleChange}
                                        options={performanceYearsList}
                                        placeholder="Select Performance Year"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>

                    <Grid container className={classes.customGrid} direction="row" lg={12} alignItems="baseline">

                        <Grid item xs={6} lg={6} md={6} sm={6} >
                            <Grid container className={classes.customGrid} direction="row" lg={12} alignItems="baseline">
                                <Label title="Measures" size={4} />
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <SearchList
                                        name="eCQMId"
                                        value={state.eCQMId}
                                        searchTerm={state.eCQMName}
                                        code="get_ecqms"
                                        apiUrl="ddl/loadItems"
                                        onChangeValue={(name, item) => handleSearchListChange(name, item)}
                                        placeholderTitle="Search by Measure ID or Name"
                                    />
                                </Grid>

                            </Grid>
                        </Grid>

                        <Grid item xs={6} lg={6} md={6} sm={6} >
                            <Grid container className={classes.customGrid} direction="row" lg={12} alignItems="baseline">
                                <Grid item xs={12} sm={9} md={9} lg={9} style={{ textAlign: "right" }}>
                                    <FormBtn id="save" onClick={CalculateeCQM}>Calculation</FormBtn>
                                    <FormBtn id="save" btnType="search" onClick={loadData}>Search</FormBtn>
                                </Grid>
                                <Grid item xs={12} sm={3} md={3} lg={3} />
                            </Grid>
                        </Grid>

                    </Grid>
                </div>



                <div className={classes.gridArea}>
                    <div className={classes.gridButtonsArea}>
                        <Button className={classes.gridButton} onClick={openEcqmReportingDialog}>Create Group</Button>
                        {/* <Button className={classes.gridButton} onClick={openQrdaDialog}>Generate QRDA File</Button> */}
                    </div>
                    <div className="custom-grid">
                        <Table
                            scroll={true}
                            checkStrictly={true}
                            dataSource={rowsData}
                            columns={gridCnfg["ECQMDashbaord"]}
                            locale={{
                                emptyText: (
                                    <Empty
                                        image={isLoading && LoadingIcon}
                                        description={isLoading ? "Loading..." : "No Record Found"}
                                        imageStyle={{ height: 30, display: !isLoading ? "none" : "" }}
                                    />
                                )
                            }}
                            rowSelection={{ selectedRowKeys: selectedRows, onChange: onSelectChange }}
                            pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: [10, 20, 30, 40] }}
                        />
                    </div>
                </div>
            </div>

            {
                qrdaDialogState &&
                <GenerateQRDAIIIFile
                    dialogState={openQrdaDialog}
                    handleClose={() => setQrdaDialogState(false)}
                />
            }
            {
                ecqmReportingGroupState &&
                <ECQMReportingGroup
                    dialogState={openEcqmReportingDialog}
                    handleClose={() => setEcqmReportingGroupState(false)}
                    handleSave={handleReportingGroupSave}
                />
            }

        </>
    )
}

export default withSnackbar(ECQMDashboard)
