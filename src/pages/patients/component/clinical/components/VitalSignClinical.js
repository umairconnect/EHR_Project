import React, { useState, useEffect } from "react";
import { PostDataAPI } from '../../../../../Services/PostDataAPI';
import { MDBDataTable } from 'mdbreact';
import {
    Button,
    Grid,
    FormLabel
} from "@material-ui/core";


import useStyles from "./styles";

function VitalSignClinical(props) {
    var classes = useStyles();

    const [listRowsData, setListRowsData] = useState([]);
    const [dataId] = useState(props.dataId);

    const [vitalId, setVitalId] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [columns, setColumns] = useState([]);
    const [rowsData, setRowsData] = useState([]);
    const [vitalData, setVitalData] = useState([]);
    const [notShowVital, setNotShowVital] = useState(true);

    const tableData = {
        columns: columns,
        rows: rowsData,
    };


    useEffect(() => {

        loadData();

    }, []);


    const loadData = () => {

        setIsLoading(true);
        console.log(dataId)
        PostDataAPI("patient/vital/getPatientVitalsGrid", dataId).then((result) => {
            if (result.success) {

                if (result.data.columns) {
                    let spliceColumns = result.data.columns;
                    let splicedColumns = spliceColumns.splice(4, 50)
                    setColumns(result.data.columns);
                }
                if (result.data.items) {
                    setRowsData(result.data.items);
                }

            }
            setIsLoading(false);
        });
    }



    return (
        <>
            <div className={classes.marginBottom15}>

                <div className={classes.listTitle}>
                    <span>Vital Sign</span>
                </div>



                { columns.length > 0 ?

                    <div className="vitalClinicalDashbaord">
                        <MDBDataTable
                            striped
                            small
                            btn
                            searching={false}
                            paging={false}
                            data={tableData}
                        />
                    </div>
                    : <div className={classes.noRecord}>No vital sign found</div>
                }





            </div>
        </>
    )

}

export default VitalSignClinical;