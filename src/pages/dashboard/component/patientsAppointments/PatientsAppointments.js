import React, { useState, useEffect } from "react"; //, { useState }
import Grid from '@material-ui/core/Grid';
import { BoxContainer } from '../boxContainer/BoxContainer';
import Chart2 from "react-google-charts";
import { Chart } from "chart.js";
import { GetUserInfo } from '../../../../Services/GetUserInfo';
import { PostDataAPI } from '../../../../Services/PostDataAPI';
import { Typography } from "@material-ui/core";

// styles
import useStyles from "./styles";
export default function PatientsAppointments(props) {
    var classes = useStyles();
    const [userInfo] = useState(JSON.parse(GetUserInfo()).user);
    const [data, setData] = useState([
        ["Year", "Patient Appointments", { role: 'style' }],
        ["Jan", 0, "fill-color: #6161EA"],
        ["Feb", 0, "fill-color: #6161EA"],
        ["Mar", 0, "fill-color: #6161EA"],
        ["Apr", 0, "fill-color: #6161EA"],
        ["May", 0, "fill-color: #6161EA"],
        ["Jun", 0, "fill-color: #6161EA"],
        ["Jul", 0, "fill-color: #6161EA"],
        ["Aug", 0, "fill-color: #6161EA"],
        ["Sep", 0, "fill-color: #6161EA"],
        ["Oct", 0, "fill-color: #6161EA"],
        ["Nov", 0, "fill-color: #6161EA"],
        ["Dec", 0, "fill-color: #6161EA"],
    ]);
    var options = {
        responsive: true,
        legend: { position: "none" },
        width: '100%',
        bar: { groupWidth: "65%" },
        chartArea: {
        right: 5,
        top: 20,
        left: 40,
        },
        vAxis: {
            minValue: 1
    }
    //hAxis: { textPosition: 'none' },

    };
    const reloadData = () => {
        if (props.data != null) {
            setData([]);
            setData(current => [...current, ["Year", "Patient Appointments", { role: 'style' }]]);
            props.data.map((obj, i) => {
                setData(current => [...current, [obj.text1, parseInt(obj.text2), "fill-color: #6161EA"]]);
            });
        }
    }
    useEffect(() => {
        reloadData();
    }, [props.isUpdate]);

    return (
        <>
            {/* Patient Appointments component  */}
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <BoxContainer>
                     <Typography className={classes.heading}>
                        Patient Appointments 
                    </Typography>
                    <Chart2
                        width={'100%'}
                        height={210}
                        left={0}
                        chartType="ColumnChart"
                        loader={<div>Loading Chart</div>}
                        data={data}
                        options={options}
                    />
                </BoxContainer>
            </Grid>
    </>
  );
}

