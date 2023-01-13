import React, { useState, useEffect } from "react";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { ListTitle, ListView } from '../subComponents/subComponents';
import { withSnackbar } from "../../../../../../components/Message/Alert";
/*import ReferralDialog from "../../../referral/ReferralDialog";*/
import ReferralDialog from "../../../../../patients/component/demographics/components/sendReferral/component/newReferral/NewReferralDialog"
import { PostDataAPI } from '../../../../../../Services/PostDataAPI';
import { formatDate } from '../../../../../../components/Common/Extensions';

// styles
import useStyles from "./styles";

function Referral(props) {
    var classes = useStyles();
    const { showMessage } = props;
    const [isDataExist, setIsDataExist] = useState(false);
    const [referralRowsData, setReferralRowsData] = useState([]);
    const [referralDialogShowHide, setReferralDialogShowHide] = useState(false);
    const loadData = () => {
        PostDataAPI("patientrefferal/loadGrid", props.patientId).then((result) => {

            if (result.success && result.data) {
                setReferralRowsData(result.data.map((item, i) => {
                    return {
                        listTitle: item.refProviderName + " | " + formatDate(item.createDate),
                        refferalId: item.refferalId,
                        linkPath: item.linkPath,
                        link: item.link,
                        documentName: item.documentName,
                        documentPath:item.documentPath
                    };
                }));

            }
            else {
                setReferralRowsData([]);

            }
        })

    }
    useEffect(() => {
        loadData();
    }, []);
    const handleClose = () => {
        loadData();
        setReferralDialogShowHide(false)
    }
    return (
        <>
            <ListTitle title="Referrals" checkData={isDataExist} onClick={() => setReferralDialogShowHide(true)} disabled={props.disabled} />


            {referralRowsData.length < 1 ?
                (!props.disabled ?
                    <div className={classes.noRecord}>No referral recorded yet</div>
                    :
                    <div className={classes.DisnoRecord}>No referral recorded yet</div>) :
                <ul className={classes.treeView}>
                    {referralRowsData.map((item, i) => (
                        /*!props.disabled ? No need to disabled on the basis of encounter signed*/
                        (<li key={i}>
                            <div className={classes.treeContent}>
                                <div className={classes.DistreeIcon}><ChevronRightIcon /></div>
                                <div className={classes.DistreeLabel}> {item.listTitle}
                                    {item.linkPath ?
                                        <> | <a target={"_blank"} href={item.linkPath}> {item.link.length > 20 ? item.link.substring(0, 17) + '...' : item.link} </a>
                                        </> : ''
                                    }
                                    {item.documentPath ?
                                        <> | <a target={"_blank"} href={'./' + item.documentPath} download> Referral Document </a>
                                        </> : ''
                                    }
                                </div>

                            </div>
                        </li>)

                    )
                    )}
                </ul>
            }

            <ReferralDialog dialogOpenClose={referralDialogShowHide}
                handleClose={handleClose}
                encounterId={props.encounterId}
                patientId={props.patientId}
                isEditable={props.isEditable} />

        </>
    )
}

export default Referral
