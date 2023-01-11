import React, { useState, useEffect } from "react";
//material ui
import {
    Grid,
    Button,
    Typography
} from "@material-ui/core";
// components
import { FormBtn, Label, LinkS, ShadowBox } from "../../../../../components/UiElements/UiElements";
import SearchList from "../../../../../components/SearchList/SearchList";
import { data as gridCnfg } from '../../../../../components/SearchGrid/component/setupData';
import { formatCurrency } from '../../../../../components/Common/Extensions';

// styles
import "../../../../../components/antd.css";
import useStyles from "./styles";
//
import LoadingIcon from "../../../../../images/icons/loaderIcon.gif";
import '../../../../../components/SearchGrid/style.css';
import '../../../../../components/SearchGrid/antStyle.css';
import { Table, Empty } from "antd";
import { SelectField } from "../../../../../components/InputField/InputField";

function Speciality() {
    const classes = useStyles();
    const options = [
        { value: "0", label: "Option" },
        { value: "1", label: "Option 1" },
        { value: "2", label: "Option 2" },
    ]
    let list = [
        {
            key: 1,
            serviceDepartment: "Behavioral Health MCR",
            lessThanThirty: 0,
            sumOfThirtyOneToSixty: 0,
            sumOfSixtyOneToNinety: 0,
            sumOfNinetyOneToOneTwenty: 0,
            sumOfOneTwentyToOneEighty: 0,
            sumOfOneTwentyOneToThreeSixtyFive: 0,
            sumGreaterThanThreeSixtyFive: 0,
            sumOfAR: 0,
        },
        {
            key: 2,
            serviceDepartment: "Behaviral Health SNF",
            lessThanThirty: 0,
            sumOfThirtyOneToSixty: 0,
            sumOfSixtyOneToNinety: 0,
            sumOfNinetyOneToOneTwenty: 0,
            sumOfOneTwentyToOneEighty: 0,
            sumOfOneTwentyOneToThreeSixtyFive: 0,
            sumGreaterThanThreeSixtyFive: 0,
            sumOfAR: 0,
        }, {
            key: 1,
            serviceDepartment: "Behaviral Health SNF",
            lessThanThirty: 0,
            sumOfThirtyOneToSixty: 0,
            sumOfSixtyOneToNinety: 0,
            sumOfNinetyOneToOneTwenty: 0,
            sumOfOneTwentyToOneEighty: 0,
            sumOfOneTwentyOneToThreeSixtyFive: 0,
            sumGreaterThanThreeSixtyFive: 0,
            sumOfAR: 0,
        }, {
            key: 1,
            serviceDepartment: "Chiropratics",
            lessThanThirty: 0,
            sumOfThirtyOneToSixty: 0,
            sumOfSixtyOneToNinety: 0,
            sumOfNinetyOneToOneTwenty: 0,
            sumOfOneTwentyToOneEighty: 0,
            sumOfOneTwentyOneToThreeSixtyFive: 0,
            sumGreaterThanThreeSixtyFive: 0,
            sumOfAR: 0,
        }, {
            key: 1,
            serviceDepartment: "Chiropratics",
            lessThanThirty: 0,
            sumOfThirtyOneToSixty: 0,
            sumOfSixtyOneToNinety: 0,
            sumOfNinetyOneToOneTwenty: 0,
            sumOfOneTwentyToOneEighty: 0,
            sumOfOneTwentyOneToThreeSixtyFive: 0,
            sumGreaterThanThreeSixtyFive: 0,
            sumOfAR: 0,
        }, {
            key: 1,
            serviceDepartment: "Endocarinology",
            lessThanThirty: 0,
            sumOfThirtyOneToSixty: 0,
            sumOfSixtyOneToNinety: 0,
            sumOfNinetyOneToOneTwenty: 0,
            sumOfOneTwentyToOneEighty: 0,
            sumOfOneTwentyOneToThreeSixtyFive: 0,
            sumGreaterThanThreeSixtyFive: 0,
            sumOfAR: 0,
        }, {
            key: 1,
            serviceDepartment: "Family Practicianor",
            lessThanThirty: 0,
            sumOfThirtyOneToSixty: 0,
            sumOfSixtyOneToNinety: 0,
            sumOfNinetyOneToOneTwenty: 0,
            sumOfOneTwentyToOneEighty: 0,
            sumOfOneTwentyOneToThreeSixtyFive: 0,
            sumGreaterThanThreeSixtyFive: 0,
            sumOfAR: 0,
        },
    ];
    const [stateTotalAmount, setStateTotalAmount] = useState({
        totalLessThanThirty: 0,
        totalSumOfThirtyOneToSixty: 0,
        totalSumOfSixtyOneToNinety: 0,
        totalSumOfNinetyOneToOneTwenty: 0,
        totalSumOfOneTwentyToOneEighty: 0,
        totalSumOfOneTwentyOneToThreeSixtyFive: 0,
        totalSumGreaterThanThreeSixtyFive: 0,
        totalSumOfAR: 0
    });
    const [state, setState] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [rowsData, setRowsData] = useState([
        {
            key: 1,
            serviceDepartment: "Behavioral Health MCR",
            lessThanThirty: 0,
            sumOfThirtyOneToSixty: 0,
            sumOfSixtyOneToNinety: 0,
            sumOfNinetyOneToOneTwenty: 0,
            sumOfOneTwentyToOneEighty: 0,
            sumOfOneTwentyOneToThreeSixtyFive: 0,
            sumGreaterThanThreeSixtyFive: 0,
            sumOfAR: 0,
        },
        {
            key: 2,
            serviceDepartment: "Behaviral Health SNF",
            lessThanThirty: 0,
            sumOfThirtyOneToSixty: 0,
            sumOfSixtyOneToNinety: 0,
            sumOfNinetyOneToOneTwenty: 0,
            sumOfOneTwentyToOneEighty: 0,
            sumOfOneTwentyOneToThreeSixtyFive: 0,
            sumGreaterThanThreeSixtyFive: 0,
            sumOfAR: 0,
        }, {
            key: 1,
            serviceDepartment: "Behaviral Health SNF",
            lessThanThirty: 0,
            sumOfThirtyOneToSixty: 0,
            sumOfSixtyOneToNinety: 0,
            sumOfNinetyOneToOneTwenty: 0,
            sumOfOneTwentyToOneEighty: 0,
            sumOfOneTwentyOneToThreeSixtyFive: 0,
            sumGreaterThanThreeSixtyFive: 0,
            sumOfAR: 0,
        }, {
            key: 1,
            serviceDepartment: "Chiropratics",
            lessThanThirty: 0,
            sumOfThirtyOneToSixty: 0,
            sumOfSixtyOneToNinety: 0,
            sumOfNinetyOneToOneTwenty: 0,
            sumOfOneTwentyToOneEighty: 0,
            sumOfOneTwentyOneToThreeSixtyFive: 0,
            sumGreaterThanThreeSixtyFive: 0,
            sumOfAR: 0,
        }, {
            key: 1,
            serviceDepartment: "Chiropratics",
            lessThanThirty: 0,
            sumOfThirtyOneToSixty: 0,
            sumOfSixtyOneToNinety: 0,
            sumOfNinetyOneToOneTwenty: 0,
            sumOfOneTwentyToOneEighty: 0,
            sumOfOneTwentyOneToThreeSixtyFive: 0,
            sumGreaterThanThreeSixtyFive: 0,
            sumOfAR: 0,
        }, {
            key: 1,
            serviceDepartment: "Endocarinology",
            lessThanThirty: 0,
            sumOfThirtyOneToSixty: 0,
            sumOfSixtyOneToNinety: 0,
            sumOfNinetyOneToOneTwenty: 0,
            sumOfOneTwentyToOneEighty: 0,
            sumOfOneTwentyOneToThreeSixtyFive: 0,
            sumGreaterThanThreeSixtyFive: 0,
            sumOfAR: 0,
        }, {
            key: 1,
            serviceDepartment: "Family Practicianor",
            lessThanThirty: 0,
            sumOfThirtyOneToSixty: 0,
            sumOfSixtyOneToNinety: 0,
            sumOfNinetyOneToOneTwenty: 0,
            sumOfOneTwentyToOneEighty: 0,
            sumOfOneTwentyOneToThreeSixtyFive: 0,
            sumGreaterThanThreeSixtyFive: 0,
            sumOfAR: 0,
        },
    ]);
    const handleChange = (e) => {

        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    const handleSearchListChange = (name, item) => {

        const { id, value } = item;

        setState(prevState => ({
            ...prevState,
            locationId: value === '' ? '' : id,
            locationName: value
        }));

    }
    useEffect(() => {
        setIsLoading(true);
        setRowsData(
            list.map((item, i) => {
                item.serviceDepartment = <LinkS >{item.serviceDepartment}</LinkS>
                // setStateTotalAmount(prevState => ({
                //     ...prevState,
                //}));
                return { ...item }
            }))
    }, [])
    return (
        <div style={{ margin: "0px 10px" }}>
            {/* <ShadowBox shadowSize={3} className={classes.shadowBox}> */}

            <div className={classes.searchArea}>

                <Grid container className={classes.customGrid} direction="row" lg={12}>


                    <Label title="Aging Account Receivable by" size={2} />

                    <Grid item xs={12} sm={3} md={3} lg={3}>
                        <SelectField
                            id="agingAccountReceivableBy"
                            name="agingAccountReceivableBy"
                            value={state.agingAccountReceivableBy}
                            options={options}
                            onChange={handleChange}
                        />

                    </Grid>

                    <Label title="Group By" size={2} />

                    <Grid item xs={12} sm={5} md={5} lg={3}>
                        <SelectField
                            id="groupBy"
                            name="groupBy"
                            value={state.groupBy}
                            options={options}
                            onChange={handleChange}
                            placeholder="Select Group By"
                        />
                    </Grid>
                </Grid>

                <Grid container className={classes.customGrid} direction="row" lg={12}>

                    <Label title="Submission Status" size={2} />
                    <Grid item xs={12} sm={3} md={3} lg={3}>
                        <SelectField
                            id="submissionStatus"
                            name="submissionStatus"
                            value={state.submissionStatus}
                            options={options}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Label title="Date" size={2} />

                    <Grid item xs={12} sm={5} md={5} lg={3}>
                        <Grid container direction="row">
                            <Grid item xs={12} sm={5} md={5} lg={5}>
                                <input
                                    type="date"
                                    id="dateFrom"
                                    name="dateFrom"
                                    value={state.dateFrom}
                                    onChange={handleChange}
                                    className={classes.dateInput}
                                />
                            </Grid>
                            <Grid item xs={12} sm={2} md={2} lg={2}>
                                <Label title="To" size={12} />
                            </Grid>
                            <Grid item xs={12} sm={5} md={5} lg={5}>
                                <input
                                    type="date"
                                    id="dateTo"
                                    name="dateTo"
                                    value={state.dateTo}
                                    onChange={handleChange}
                                    className={classes.dateInput}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>

                <Grid container className={classes.customGrid} direction="row" lg={12}>

                    <Label title="For" size={2} />
                    <Grid item xs={12} sm={3} md={3} lg={3}>
                        <SelectField
                            id="forPatientType"
                            name="forPatientType"
                            value={state.forPatientType}
                            options={options}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12} sm={2} md={2} lg={2} />

                    <Grid item xs={12} sm={5} md={5} lg={3}>
                        <SearchList
                            id="patientId"
                            name="patientId"
                            value={state.patientId}
                            searchTerm={state.patientName}
                            code="patient_Search"
                            apiUrl="ddl/loadItems"
                            onChangeValue={(name, item) => handleSearchListChange(name, item)}
                            placeholderTitle="Search Patient"
                        />
                    </Grid>

                </Grid>


                <Grid container className={classes.customGrid} direction="row" lg={12}>

                    <Grid item xs={12} sm={7} md={7} lg={7} />

                    <Grid item xs={12} sm={5} md={5} lg={3}>
                        <Grid container direction="row" justify="flex-end" >

                            <FormBtn id="save" btnType="search" >Search</FormBtn>
                            <FormBtn id="reset" >Clear Filter</FormBtn>
                        </Grid>

                    </Grid>

                </Grid>
              

            </div>
            <ShadowBox shadowSize={3} className={classes.shadowBox}>
                <div className={classes.gridArea}>

                <Grid container direction="row" justify="flex-end" style={{ justifyContent: "right", marginBottom: "5px" }}>
                      {/* <Button className={classes.gridButton} >Print</Button>
                            <Button className={classes.divider}>|</Button> */}
                            <Button className={classes.gridButton} >Export</Button>
                    </Grid>

                    <div className="custom-grid">
                        <Table
                            rowExpandable={true}
                            expandable={{
                                expandIcon: () => <></>,
                            }}
                            defaultExpandAllRows={true}
                            scroll={true}
                            dataSource={rowsData}
                            checkStrictly={true}
                            pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: [5, 10, 20, 30] }}
                            columns={gridCnfg["AccountReceivableSpecialityReportColumns"]}
                            locale={{
                                emptyText: (
                                    <Empty
                                        image={isLoading && LoadingIcon}
                                        description={isLoading ? "Loading..." : "No Record Found"}
                                        imageStyle={{ height: 30, display: !isLoading ? "none" : "" }}
                                    />
                                )
                            }}
                            summary={() => (
                                rowsData && rowsData.length > 0 ?
                                    <Table.Summary fixed>
                                        <Table.Summary.Row>
                                            {/* <Table.Summary.Cell colSpan={2}></Table.Summary.Cell> */}
                                            <Table.Summary.Cell index={1} align="center">Total:</Table.Summary.Cell>
                                            <Table.Summary.Cell index={2} align="left">
                                                {<Typography className="grid-text">{stateTotalAmount?.totalLessThanThirty}</Typography>}
                                            </Table.Summary.Cell>
                                            <Table.Summary.Cell index={3} align="left">
                                                {<Typography className="grid-text">{stateTotalAmount?.totalSumOfThirtyOneToSixty}</Typography>}
                                            </Table.Summary.Cell>
                                            <Table.Summary.Cell index={4} align="left">
                                                {<Typography className="grid-text">{stateTotalAmount?.totalSumOfSixtyOneToNinety}</Typography>}
                                            </Table.Summary.Cell>
                                            <Table.Summary.Cell index={5} align="left">
                                                {<Typography className="grid-text">{stateTotalAmount?.totalSumOfNinetyOneToOneTwenty}</Typography>}
                                            </Table.Summary.Cell>
                                            <Table.Summary.Cell index={6} align="left">
                                                {<Typography className="grid-text">{stateTotalAmount?.totalSumOfOneTwentyToOneEighty}</Typography>}
                                            </Table.Summary.Cell>
                                            <Table.Summary.Cell index={7} align="left">
                                                {<Typography className="grid-text">{stateTotalAmount?.totalSumOfOneTwentyOneToThreeSixtyFive}</Typography>}
                                            </Table.Summary.Cell>
                                            <Table.Summary.Cell index={8} align="left">
                                                {<Typography className="grid-text">{stateTotalAmount?.totalSumGreaterThanThreeSixtyFive}</Typography>}
                                            </Table.Summary.Cell>
                                            <Table.Summary.Cell index={9} align="left">
                                                {<Typography className="grid-text">{stateTotalAmount?.totalSumOfAR}</Typography>}
                                            </Table.Summary.Cell>
                                        </Table.Summary.Row>
                                    </Table.Summary>
                                    : null
                            )}
                        />
                    </div>

                </div>
            </ShadowBox>
        </div >
    )
}

export default Speciality