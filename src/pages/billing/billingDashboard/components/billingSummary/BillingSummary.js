import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { BoxContainer } from "../../../../dashboard/component/boxContainer/BoxContainer";
import { Chart } from "chart.js";
import { Box, Typography } from "@material-ui/core";
import Style from "./styles";
import DropdownComponent from "./components/Dropdown";
import { GetDataAPI } from '../../../../../Services/GetDataAPI';
import { PostDataAPI } from '../../../../../Services/PostDataAPI';
import { MultiSelectField, SelectField } from "../../../../../components/InputField";

export default function BillingSummary({ showMessage, ...props }) {
    const classes = Style();
    const [speciality, setSpeciality] = useState([]);
    const [state, setState] = useState({ specializationID: "",selectedId:"" });

   const clearData = e => {
        state.selectedId = "";
        var ctx = document.getElementById("myChart").getContext("2d");
        new Chart(ctx, {})    
   }

    const handleChange = e => {



        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));


          //  state.selectedId = value;
            loadIncomeAnalysis(value);

      
    };

    const loadIncomeAnalysis = (value) => {

        clearData()

        var params = {
            SPName: "SP_BILLING_DASHBOARD_INCOME_ANALYSIS",
            speciality: value? value:state.selectedId
        }
        PostDataAPI("ddl/loadItemsBySP", params).then((result) => {
            var data1 = 0;
            var data2 = 0;
            var data3 = 0;
            var data4 = 0;
            var data5 = 0;
            if (result.success && result.data != null) {
                data1 = result.data[0].text1;
                data2 = result.data[0].text2;
                data3 = result.data[0].text3;
                data4 = result.data[0].text4;
                data5 = result.data[0].text5;
            }
            var ctx = document.getElementById("myChart").getContext("2d");
            var data = {
                labels: [
                    "Month to Date",
                    "Last Month",
                    "Quarter to Date",
                    "Last Quarter",
                    "Year to Date",
                ],
                datasets: [
                    {
                        backgroundColor: [
                            "#4572A7",
                            "#82312D",
                            "#654D7D",
                            "#305281",
                            "#2C7C97",
                        ],
                        data: [data1, data2, data3, data4, data5],
                        border: true,
                        borderColor: ["#4572A7", "#82312D", "#654D7D", "#305281", "#2C7C97"],
                        borderWidth: 20,
                        borderRadius: 5,
                        borderSkipped: false,
                    },
                ],
            };

            new Chart(ctx, {
                type: "bar",
                data: data,
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    legend: {
                        display: false,
                    },
                    barValueSpacing: 0,
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    min: 0,
                                },
                                gridLines: {
                                    display: true,
                                },
                            },
                        ],
                        xAxes: [
                            {
                                barPercentage: 0.25,
                                gridLines: {
                                    display: false,
                                },
                            },
                        ],
                    },
                },
            });
        })
    }

    const loadSpecialities = () => {
        GetDataAPI("user/getAllSpecialities", '').then((result) => {

            if (result.success && result.data != null) {
                setSpeciality(
                    result.data.map((item, i) => {
                        return { value: item.specializationID, label: item.name };
                    }));
            }

        })
    }

    useEffect(() => {
        loadSpecialities();
        loadIncomeAnalysis();
    }, []);

  return (
    <>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        <BoxContainer>
          <Box className={classes.box}>
            <Typography className={classes.heading}>Income Analysis</Typography>
            <Box className={classes.innerBox}>
                          <SelectField
                              id="specializationID"
                              name="specializationID"
                              value={state.specializationID}
                              placeholder="All Specialities"
                              options={speciality}
                              onChange={handleChange}
                              style={{ width: "192px" }}
                          />
            </Box>
          </Box>
          <canvas style={{ marginTop: "32px" }} id="myChart" />
        </BoxContainer>
      </Grid>
      <style>
     
      </style>
    </>
  );
}
