import React, { useState, useEffect } from "react";
import ChiefComplaintDialog from "../../../chiefComplaint/ChiefComplaintDialog";
import { PostDataAPI } from '../../../../../../Services/PostDataAPI';
import { GetDataAPI } from '../../../../../../Services/GetDataAPI';
import {ListTitle} from '../subComponents/subComponents';

// styles
import useStyles from "./styles";

export default function HPI(props) {

    var classes = useStyles();
    const { showMessage } = props;
    const [chiefComplaintDialog, setChiefComplaintDialog] = useState({ showHide: false });
    const [encounterId, setEncounterId] = useState(props.encounterId);
    const [listRowsData, setListRowsData] = useState([]);
    const [isDataExist, setIsDataExist] = useState(false);
  
    useEffect(() => {

        if (props.encounterId)
            initialization();

    }, [props.encounterId, chiefComplaintDialog]);

    const initialization = () => {

        getEncounterList();
    }

    const getEncounterList = e => {

        PostDataAPI("encounter/getEncounterById", props.encounterId).then((result) => {

            if (result.success && result.data != null) {

                if (result.data.hpiDetail) {
                    // const strippedString = result.data.hpiDetail != null ? result.data.hpiDetail.replace(/(<([^>]+)>)/gi, "") : "";
                    const strippedString = result.data.hpiDetail != null ? result.data.hpiDetail : "";
                    setListRowsData([{ listTitle: strippedString }]);
                    setIsDataExist(true);
                }
                else {
                    setListRowsData([]);
                    setIsDataExist(false);
                }
            }
            else if (!result.message && result.message != null) {
                
                showMessage("Error", result.message, "error", 3000);
            }
        })
    }

    return (
        <>
            <ListTitle title="HPI" disabled={props.disabled} checkData={isDataExist} onClick={() => setChiefComplaintDialog({ showHide: true })} />
             {listRowsData.length < 1 ?(
                !props.disabled ?<div className={classes.noRecord}>No HPI recorded yet</div>:<div className={classes.DisnoRecord}>No HPI recorded yet</div>):(
                        <ul className={classes.treeView} >
                            {listRowsData.map((item, i) => (
                                <li className={classes.treeViewLi} key={i}>
                                    <div className={classes.treeContent}>
                                        {!props.disabled ?<>
                                        <div className={classes.DistreeLabel} dangerouslySetInnerHTML={{__html: item.listTitle}}></div>
                                        </>:<>
                                        <div className={classes.DistreeLabel} dangerouslySetInnerHTML={{__html: item.listTitle}}></div></>}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )
                }
            { chiefComplaintDialog.showHide ?
                <ChiefComplaintDialog showHideDialog={chiefComplaintDialog.showHide} handleClose={() => { setChiefComplaintDialog({ showHide: false }); }} encounterId={props.encounterId} />
                : null
            }
        </>

    );
}

