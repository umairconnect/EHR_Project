import React, { useState, useEffect } from "react";
import { ListTitle, ListView } from '../subComponents/subComponents';
import { PostDataAPI } from '../../../../../../Services/PostDataAPI';
import { GetDataAPI } from '../../../../../../Services/GetDataAPI';
import AddIcon from '../../../../../../images/icons/add-icon.png';
import ChartNotesDialog from "../../../chartNotes/ChartNotesDialog"
import { withSnackbar } from "../../../../../../components/Message/Alert"

// styles
import useStyles from "./styles";

function ChartNotes(props) {

    var classes = useStyles();
    const { showMessage } = props;
    const [encounterId, setEncounterId] = useState(props.encounterId);
    const [showHideChartNotesDialog, setShowHideChartNotesDialog] = useState(false);
    const [chartNotesRowsData, setChartNotesRowsData] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [isDataExist, setIsDataExist] = useState(false);
    const [chartNotesState, setChartNotesState] = useState({
        dischargeDispositionCode : "",
        chartNotes: "",
        encounterID: 0
    });

    useEffect(() => {

        if (props.encounterId)
            loadData();

    }, [props.encounterId, showHideChartNotesDialog]);


    const loadData = () => {

        PostDataAPI("encounter/getEncounterById", props.encounterId).then((result) => {

            if (result.success && result.data != null) {

                if (result.data.chartNotes) {
                    const strippedString = result.data.chartNotes != null ? result.data.chartNotes : "";
                    setChartNotesRowsData([{ listTitle: strippedString }]);
                    setIsDataExist(true);
                }
                else {
                    setChartNotesRowsData([]);
                    setIsDataExist(false);
                }

                // To set data for dialog
                setChartNotesState({
                    dischargeDispositionCode: result.data.dischargeDispositionCode != null ? result.data.dischargeDispositionCode : "",
                    chartNotes: result.data.chartNotes != null ? result.data.chartNotes : "",
                    encounterID: !result.data.encounterID ? props.encounterId : result.data.encounterID
                });
            }
            else if (!result.message && result.message!=null) {
                
                showMessage("Error", result.message, "error", 3000);
            }
        })
    }


    return (
        <>
            <ListTitle title="Chart Notes" disabled={props.disabled} checkData={isDataExist} onClick={() => setShowHideChartNotesDialog(true)} />

            {
                chartNotesRowsData.length < 1 ? (
                    !props.disabled ? <div className={classes.noRecord}>No chart notes recorded yet</div> : <div className={classes.DisnoRecord}>No chart notes recorded yet</div>) : (
                        <ul className={classes.treeView} >
                            {chartNotesRowsData.map((item, i) => (
                                <li className={classes.treeViewLi} key={i}>
                                    <div className={classes.treeContent}>
                                        {!props.disabled ? <>
                                            <div className={classes.DistreeLabel} dangerouslySetInnerHTML={{ __html: item.listTitle }}></div>
                                        </> : <>
                                                <div className={classes.DistreeLabel} dangerouslySetInnerHTML={{ __html: item.listTitle }}></div></>}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )
            }

            <ChartNotesDialog showHideDialog={showHideChartNotesDialog} handleClose={() => { setShowHideChartNotesDialog(false); }}
                encounterId={props.encounterId} patientId={props.patientId} chartNotes={chartNotesState.chartNotes} dischargeDispositionCode={chartNotesState.dischargeDispositionCode} />

        </>

    );
}
export default withSnackbar(ChartNotes)