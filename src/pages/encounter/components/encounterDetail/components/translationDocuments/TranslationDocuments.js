import React, { useState, useEffect } from "react";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { ListTitle, ListView } from '../subComponents/subComponents';
import { PostDataAPI } from '../../../../../../Services/PostDataAPI';
import { GetDataAPI } from '../../../../../../Services/GetDataAPI';
import AddIcon from '../../../../../../images/icons/add-icon.png';
import TranslationDocumentsDialog from "../../../translationDocuments/TranslationDocumentDialog";
// import CognitiveStatusDialog from "../../../cognitiveStatus/CognitiveStatusDialog"
import { withSnackbar } from "../../../../../../components/Message/Alert";
import { FormLabel } from "@material-ui/core";
import { LinkS } from "../../../../../../components/UiElements/UiElements";

// styles
import useStyles from "./styles";
function TranslationDocuments(props) {
    var classes = useStyles();
    const { showMessage } = props;
    const [isUpdateList, setIsUpdateList] = useState(false);
    const [encounterId, setEncounterId] = useState(props.encounterId);
    const [translationDocumentId, setTranslationDocumentId] = useState(0);
    const [translationDocumentIdRowsData, setTranslationDocumentIdRowsData] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [showHideTranslationDocumentDialog, setShowHideTranslationDocumentDialog] = useState(false);
    const [isDataExist, setIsDataExist] = useState(false);


    useEffect(() => {
        if (props.encounterId) {

            loadTranslationDocument();
        }

    }, [props.encounterId, showHideTranslationDocumentDialog, isUpdateList]);

    const Update = () => setIsUpdateList(isUpdateList ? false : true)

    function loadTranslationDocument() {

        var data = {
            patientEncounterId: props.encounterId,
            patientId: parseInt(props.patientId)
        }
        PostDataAPI("translation/document/getTranslationDocuments", data).then((result) => {

            if (result.success && result.data != null) {

                console.log(result.data)
                setTranslationDocumentIdRowsData(result.data);
                if (result.data.length > 0) {
                    setIsDataExist(true);
                } else {
                    setIsDataExist(false);
                }


            } else {
                setTranslationDocumentIdRowsData([]);

                setIsDataExist(false);
            }
        })
    }


    return (
        <>
            <ListTitle title="Translation Documents" disabled={props.disabled} checkData={isDataExist} onClick={() => setShowHideTranslationDocumentDialog(true)} />

            {translationDocumentIdRowsData.length < 1 ?
                (!props.disabled ? <div className={classes.noRecord}>No translation documents attached</div> : <div className={classes.DisnoRecord}>No translation documents attached</div>) :
                <ul className={classes.treeView}>
                    {translationDocumentIdRowsData.map((item, i) => (
                        !props.disabled ?
                            (<li key={i}>
                                <div className={classes.treeContent}>
                                    <div className={classes.DistreeLabel}>
                                        {/* <div className={classes.DistreeIcon}><ChevronRightIco/n /></div> */}
                                        {item.name ?
                                            <LinkS target={"_blank"} href={"." + item.documentPath}>{item.name}</LinkS>
                                            : ""

                                        }
                                    </div>
                                </div>
                            </li>)
                            :
                            (<li key={i}>
                                <div className={classes.treeContent}>
                                    {/* <div className={classes.DistreeIcon}><ChevronRightIcon /></div> */}
                                    <div className={classes.DistreeLabel}> {item.name}</div>
                                </div>
                            </li>)

                    )
                    )}
                </ul>
            }

            {showHideTranslationDocumentDialog ?
                <TranslationDocumentsDialog
                    encounterId={props.encounterId}
                    patientId={props.patientId}
                    fileList={translationDocumentIdRowsData}
                    update={Update}
                    showHideDialog={showHideTranslationDocumentDialog}
                    handleClose={() => setShowHideTranslationDocumentDialog(false)}
                />
                : ""}
        </>
    )
}

export default withSnackbar(TranslationDocuments)
