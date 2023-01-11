import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import AddIcon from "../../../../../images/icons/add-icon.png";
import AddhealthConcern from './dialogs/AddHealthConcern'
import { PostDataAPI } from '../../../../../Services/PostDataAPI';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

function HealthConcern({ patientId, ...props }) {
    const classes = useStyles();
    const { showMessage } = props;
    const [isEditable] = useState(props.isEditable)
    const [addHConcern, setAddHConcern] = useState(false);

    const [isEdit, setIsEdit] = useState(false)

    const addDialog = () => {
        setHealthConcernId(0);
        setAddHConcern(true);
        setIsEdit(false)
    }
    const closeDirectivesDialog = () => {
        loadData();
        setAddHConcern(false);
    }
    const [healthConcernId, setHealthConcernId] = useState(0);
    const [listRowsData, setListRowsData] = useState([]);
    const loadData = () => {
        var params = {
            code: "patient_health_concerns",
            parameters: [patientId.toString()]
        }
        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {
                console.log(result.data);
                setListRowsData(
                    result.data.map((item, i) => {
                        return {

                            listTitle: `${item.text1} | ${item.text2}`,
                            listId: parseInt(item.id),
                            value: item.text3,
                            type: item.text1
                            //status: item.text3
                        };
                    }));

            }
            else if (!result.message) {
                showMessage("Error", result.message, "error", 3000);
            }
        })
    }
    const editHealthConcern = (id) => {
        setHealthConcernId(id);
        setAddHConcern(true);
        setIsEdit(true)
    }
    useEffect(() => {
        loadData();
    }, []);
    return (
        <>
            <div className={classes.listTitle}>
                <span>Health Concern</span>
                <span className={classes.addNew} title="Add Advance Directives">{isEditable ? <img src={AddIcon} onClick={addDialog} alt="Add New" />:''}</span>
            </div>


            <div className={classes.advContent}>

                {listRowsData.length > 0 ?
                    <ul className={classes.treeView}>
                        {listRowsData.map((item, i) => (


                            (<li className={classes.treeViewLi} key={i} onClick={() => editHealthConcern(item.listId)}>
                                <div className={classes.treeContent}>
                                    <div className={classes.treeIcon}><ChevronRightIcon /></div>
                                    <div className={classes.treeLabel}> {item.listTitle}</div>
                                </div>
                            </li>)

                        )
                        )}
                    </ul> : <div className={classes.noRecord}>No health concern recorded yet</div>
                }

            </div>


            {addHConcern ?
                <AddhealthConcern closeDirectivesDialog={closeDirectivesDialog}
                    patientId={patientId}
                    healthConcernId={healthConcernId}
                    healthConcernData={listRowsData}
                    isEditable={props.isEditable}
                    isEdit={isEdit}
                    isEditable={ isEditable}
                >
                </AddhealthConcern>
                : ''
            }

        </>
    )

}

export default HealthConcern;