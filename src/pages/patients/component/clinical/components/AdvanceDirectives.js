import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import AddIcon from "../../../../../images/icons/add-icon.png";
import { PostDataAPI } from '../../../../../Services/PostDataAPI';
import AdvanceDirectiveDialog from './dialogs/AddAdvanceDirectives'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

export default function AdvanceDirectives(props) {
    const classes = useStyles();
    const { showMessage } = props;
    const [patientId] = useState(parseInt(props.patientId));
    const [advanceDirectiveId, setAdvanceDirectiveId] = useState(-1);
    const [newDirectiveDialog, setNewDirectiveDialog] = useState(false);
    const [listRowsData, setListRowsData] = useState([]);
    const [isEditable] = useState(props.isEditable)

    const loadData = () => {
        console.log(props);
        var params = {
            code: "patient_advance_directives",
            parameters: [props.patientId.toString()]
        };
        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {
                console.log(result.data)
                setListRowsData(
                    result.data.map((item, i) => {
                        return {
                            details: item.text1,
                            recordedDate: item.text2,
                            itemId: item.id
                        };
                    }));
            }
            else if (!result.message) {
                showMessage("Error", result.message, "error", 3000);
            }
        })
    }

    const addDialog = () => {
        setNewDirectiveDialog(true)
    }
    const closeDirectivesDialog = () => {
        setAdvanceDirectiveId(-1);
        setNewDirectiveDialog(false)
    }

    const editAdvanceDirective = (item) => {
        setAdvanceDirectiveId(item.itemId);
        setNewDirectiveDialog(true);
    }

    useEffect(() => {
        setAdvanceDirectiveId(-1);
        initialization();
    }, []);
    const initialization = () => {
        setAdvanceDirectiveId(-1);
        loadData();
    }

    return (
        <>
            <div className={classes.listTitle}>
                <span>Advance Directives</span>
                <span className={classes.addNew} title="Add Advance Directives">{isEditable ? <img src={AddIcon} onClick={addDialog} alt="Add New" />:""}</span>
            </div>


            <div className={classes.advContent}>

                <ul className={classes.treeView}>
                    {listRowsData.length > 0 ?
                        <ul className={classes.treeView}>
                            {listRowsData.map((item, i) => (

                                (<li className={classes.treeViewLi} key={i}  onClick={() => editAdvanceDirective(item)} >
                                    <div className={classes.treeContent}>
                                        <div className={classes.treeIcon}><ChevronRightIcon /></div>
                                        <div className={classes.treeLabel}>{item.details} | {item.recordedDate}</div>
                                    </div>
                                </li>)

                            )
                            )}
                        </ul> : <div className={classes.noRecord}>
                        No advance directive  recorded yet </div>
                    }

                </ul>

            </div>



            {newDirectiveDialog ?
                (<AdvanceDirectiveDialog
                    patientId={patientId}
                    advanceDirectiveId={advanceDirectiveId}
                    initialization={initialization}
                    closeDirectivesDialog={closeDirectivesDialog}
                    isEditable={isEditable}
                />)
                : ('')
            }

        </>
    )

}