import React, { useState, useEffect } from "react";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { ListTitle } from '../subComponents/subComponents';
import { PostDataAPI } from '../../../../../../Services/PostDataAPI';
// import { GetDataAPI } from '../../../../../../Services/GetDataAPI';
// import SuperBillDialog from "../../../superBill/SuperBillDialog";
import { withSnackbar } from "../../../../../../components/Message/Alert";

// styles
import useStyles from "./styles";
// import { LinkS } from "../../../../../../components/UiElements/UiElements";
import { Link } from "react-router-dom";

function SuperBill(props) {
    var classes = useStyles();
    // const { showMessage } = props;
    // const [encounterId, setEncounterId] = useState(props.encounterId);
    // const [patientId, setPatientId] = useState(props.patientId);
    const [superBillRowsData, setSuperBillRowsData] = useState([]);
    const [superBillDialogShowHide, setSuperBillDialogShowHide] = useState(true);
    // const [isDataExist, setIsDataExist] = useState(false);
    const [isDataId, setIsDataId] = useState(0);


    useEffect(() => {

        setIsDataId(0);
        if (props.encounterId || !superBillDialogShowHide)
            initialization();

    }, [props.encounterId, superBillDialogShowHide]);

    const initialization = () => {
        loadData();
    }

    const loadData = () => {

        var params = {
            code: "get_claim_super_bill_by_id",
            parameters: [props.encounterId ? props.encounterId.toString() : ""]
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {
                setSuperBillRowsData(
                    result.data.map((item, i) => {
                        if (item.id > 0 && isDataId == 0) { setIsDataId(item.id); }
                        return {
                            claimSuperbillId: item.id,
                            billingType: item.text1
                        };
                    }));
            }
        })
    }

    const setClaimId = (id) => {

        setIsDataId(id);
    }

    return (
        <>
            {
                props.disabled == false || isDataId > 0 ?
            <Link to={{
                pathname: '/app/addclaim',
                search: '?id=' + props.encounterId + '/' + props.patientId + '/' + isDataId,
                state: JSON.stringify({
                    encounterId: props.encounterId,
                    patientId: props.patientId,
                    claimId: isDataId
                })

            }}>
               
                 {isDataId < 1 ?
                    <ListTitle
                        title="Super Bill"
                        disabled={props.disabled}
                        checkData={false}
                    />
                    :
                    <ListTitle
                        title="View Super Bill"
                        disabled={props.disabled}
                        checkData={true}
                    />
                } 
            </Link>
            :<>
                {isDataId < 1 ?
                    <ListTitle
                        title="Super Bill"
                        disabled={props.disabled}
                        checkData={false}
                    />
                    :
                    <ListTitle
                        title="View Super Bill"
                        disabled={props.disabled}
                        checkData={true}
                    />
                }
            </>
            }


            {superBillRowsData.length < 1 ?
                (!props.disabled ? <div className={classes.noRecord}>No super bill recorded yet</div> : <div className={classes.noRecord}>No super bill recorded yet</div>) :
                <ul className={classes.treeView}>
                    {superBillRowsData.map((item, i) => (
                        !props.disabled ?
                            (<li key={i}>
                                <Link to={{
                                    pathname: '/app/addclaim',
                                    search: '?id=' + props.encounterId + '/' + props.patientId + '/' + item.claimSuperbillId,
                                    state: JSON.stringify({
                                        encounterId: props.encounterId,
                                        patientId: props.patientId,
                                        claimId: isDataId
                                    })

                                }}>
                                    <div className={classes.treeContent}>
                                        <div className={classes.treeIcon}><ChevronRightIcon /></div>
                                        <div className={classes.treeLabel}>{item.claimSuperbillId} - {item.billingType}</div>
                                    </div>
                                </Link>
                            </li>)
                            :
                            (<li key={i}>
                                <div className={classes.treeContent}>
                                    <div className={classes.DistreeIcon}><ChevronRightIcon /></div>
                                    <div className={classes.DistreeLabel}>{item.claimSuperbillId} - {item.billingType}</div>
                                </div>
                            </li>)

                    )
                    )}
                </ul>
            }

            {/* <SuperBillDialog showHideDialog={superBillDialogShowHide} handleClose={() => setSuperBillDialogShowHide(false)} encounterId={props.encounterId} patientId={props.patientId} claimId={isDataId} /> */}

        </>

    );
}


export default withSnackbar(SuperBill)