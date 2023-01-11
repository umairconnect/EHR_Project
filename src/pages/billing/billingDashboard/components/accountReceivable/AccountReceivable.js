import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { BoxContainer, BoxContainerSm } from "../../../../dashboard/component/boxContainer/BoxContainer";
import { Chart } from "chart.js";
import useStyles from "./styles";
import { Typography } from "@material-ui/core";
import { PostDataAPI } from '../../../../../Services/PostDataAPI';

export default function AccountReceiable(props) {
    const classes = useStyles();
    const graphLabels = [
        "<31",
        "31 - 60",
        "61 - 90",
        "91 - 120",
        "121 - 180",
        "181- 365",
        ">365",
    ];
    const _colors = ["#AA4643", "#FB9600", "#4D78AB", "#23A817", "#6F84FD"]

    const [graphDataSet, setGraphDataSet] = useState([
        {
            label: "Cardiology",
            data: [21000.65, 8000, 28000, 5000, 9000, 28000, 6000],
            backgroundColor: "#AA4643",
        }
    ]);

    function loadBillingDashBoardAccountReceivables() {
        var params = {
            SPName: "SP_BILLING_DASHBOARD_ACCOUNT_RECEIVABLE"
        }
        PostDataAPI("ddl/loadItemsBySP", params).then((result) => {

            if (result.success && result.data != null) {
                
                var _graphDataSet = [];
                result.data.map((item, i) => {
                    _graphDataSet.push({
                        label: item.text1,
                        data: [item.text2, item.text3, item.text4, item.text5, item.text6, item.text7, item.text8],
                        backgroundColor: _colors[i],
                    });
                });

                var ctx = document.getElementById("chartJs").getContext("2d");

                const data = {
                    labels: graphLabels,
                    datasets: _graphDataSet
                };
                new Chart(ctx, {
                    type: "bar",
                    data: data,
                    options: {
                        responsive: true,
                          maintainAspectRatio: false,
                        plugins: {
                            title: {
                                display: true,
                                text: "Custom Chart Title",
                                padding: {
                                    top: 10,
                                    bottom: 10,
                                },
                            },
                        },

                        legend: {
                            display: true,
                            position: "bottom",
                            labels: {
                                boxWidth: 10,
                                font: {
                                    size: 2
                                }
                            }
                        },

                        barValueSpacing: 0,
                        scales: {
                            yAxes: [
                                {

                                    ticks: {
                                        min: 0,
                                        //stepSize: 10000
                                    },
                                    gridLines: {
                                        display: true,
                                    },
                                },
                            ],
                            xAxes: [
                                {
                                    barPercentage: 0.85,
                                    gridLines: {
                                        display: false,
                                    },
                                    grid: {
                                        offset: true,
                                    },
                                },
                            ],
                        },
                    },
                });
            }
        });
    }
    useEffect(() => {
        loadBillingDashBoardAccountReceivables();
    }, []);
    return (
        <>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <BoxContainerSm>
                    <Typography className={classes.heading}>
                        Account Receivable <span>(Top Five)</span>
                    </Typography>

                    <div id="canvasWrapper" style={{position: "relative", height: "23vh"}}>
                        <canvas id="chartJs" />
                    </div>
                </BoxContainerSm>
            </Grid>
            <style></style>
        </>
    );
}
