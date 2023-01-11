import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import AddIcon from "../../../../../images/icons/add-icon.png";
import { PostDataAPI } from '../../../../../Services/PostDataAPI';
import { withSnackbar } from '../../../../../components/Message/Alert'
import AddImplantableDevice from "../../../component/implantableDevices/components/addImplantableDevice/AddImplantableDevice";
import {
    Grid,
} from "@material-ui/core";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

function ImplantableDevices({ dataId, ...props }) {
    const { showMessage } = props;
    const classes = useStyles();
    const [isEditable] = useState(props.isEditable)
    const [dialogOpenClose, setDialogOpenClose] = useState(false);
    const [listRowsData, setListRowsData] = useState([]);
    const [implantableDeviceId, setImplantableDeviceId] = useState(0);

    const addDialog = () => {
        setDialogOpenClose(true);
        setImplantableDeviceId(0);
    }

    const editImplatableDevice = (id) => {
        setImplantableDeviceId(id);
        setDialogOpenClose(true);
    }

    useEffect(() => {
        console.log(dataId);
        initialization();
    }, []);

    const initialization = () => {
        loadPatientImplantbleDevices();
    }

    const loadPatientImplantbleDevices = () => {
        PostDataAPI('patient/medicalEquipment/loadGrid', parseInt(dataId)).then((result) => {
            if (result.success && result.data != null) {
                console.log(result.data)
                setListRowsData(result.data);
            }
        })
    }

    const handleCloseImplantableForm = () => {
        setDialogOpenClose(false);
        loadPatientImplantbleDevices();
    }

    return (
        <>
            <div className={classes.listTitle} style={{ paddingTop: "12px" }}>
                <span>Implantable Devices</span>
                <span className={classes.addNew} title="Add Implantable Devices">{isEditable ? <img src={AddIcon} onClick={addDialog} alt="Add New" />:''} </span>
            </div>


            <div className={classes.advContent}>
                {listRowsData.length > 0 ?
                    <>{
                        listRowsData.map((item, i) => (
                            <>
                            
                            <ul className={classes.treeView}>
                                    <li>
                                        <div className={classes.treeContent}  onClick={() => editImplatableDevice(item.patientMedicalEquipmentId)}>
                                            <div className={classes.treeIcon}><ChevronRightIcon /></div>
                                            <p className={classes.treeLabel} style={{ margin: "0" }}> UDI: {item.deviceUdi} </p>
                                        </div>
                                    </li>
                                </ul>
                                <div style={{ paddingLeft: "30px" }}>
                                    <p class={classes.messageDetails}><b>Brand Name:</b> {item.brandName}</p>
                                </div>

                            </>
                        ))
                    }</>

                    : <div className={classes.noRecord} style={{color:"#5D8AB5"}}>No implantable device found</div>
                }
            </div>

            {
                dialogOpenClose ?
                    <AddImplantableDevice
                        showHideDialog={addDialog}
                        patientId={dataId}
                        dataId={implantableDeviceId}
                        handleClose={handleCloseImplantableForm}
                        isEditable={ isEditable}
                    />
                    : ""
            }




        </>
    )

}
export default withSnackbar(ImplantableDevices);