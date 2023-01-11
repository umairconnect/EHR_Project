import React, { useState, useEffect } from "react"
import useStyles from './styles'
import {
    Slide,
    Paper,
    Tabs,
    Tab,
} from "@material-ui/core";
import { GetUserInfo } from '../../../../../../Services/GetUserInfo';
import { PostDataAPI } from '../../../../../../Services/PostDataAPI';
import { ActionDialog } from "../../../../../../components/ActionDialog/ActionDialog";
import { withSnackbar } from '../../../../../../components/Message/Alert'


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            style={{
                width: "255px", height: "440px", margin: "0px", backgroundColor: "#FFFFFF",
                borderRadius: "0px", overflow: "initial"
            }}
            {...other}
        >
            {value === index && (
                <>{children}</>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
function RxList({ ...props }) {
    var classes = useStyles();
    const { showMessage } = props;
    const [tabvalue, setTabValue] = useState(0);
    const [userInfo] = useState(JSON.parse(GetUserInfo()).user);
    const [favMedicineProviderList, setFavMedicineProviderList] = useState([]);
    const [draftMedicationList, setDraftMedicationList] = useState([]);
    const [favMedicinePatientList, setFavMedicinePatientList] = useState([]);
    const [patientId] = useState(props.patientId);
    const [isFormDirty, setIsFormDity] = useState(true);

    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "confirm"
    });

    const ShowActionDialog = (actiontype, title, message, type, OnOkCallback, OnCancellCallback) => {
        setActionDialogProps(prevState => ({
            ...prevState,
            dialogactiontype: actiontype,
            actiondialogstate: true,
            actiondialogtitle: title,
            actiondialogmessage: message,
            actiondialogtype: type,
            OnOk: OnOkCallback,
            OnCancel: OnCancellCallback
        }));
    }

    const onTabChange = (e, newValue) => {
        setTabValue(newValue);
    };
    const LoadDraftMedication = () => {


        var params = {
            code: "patient_drafted_medicine",
            parameters: [props.patientId.toString()]
        }

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {

                setDraftMedicationList(
                    result.data.map((item, i) => {
                        return { value: item.id, label: item.text1 };
                    }));
            }
        });
      
    }
    const LoadFavMedicineList = () => {
        var params = {
            code: "fav_medicines",
            parameters: [userInfo.userID]
        }

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {
 
                setFavMedicineProviderList(
                    result.data.map((item, i) => {
                        return { value: item.id, label: item.text1 };
                    }));
            }
        });

        var params = {
            code: "medication_patient_recent_Drugs",
            parameters: [props.patientId?props.patientId.toString():""]
        }

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {
     
                setFavMedicinePatientList(
                    result.data.map((item, i) => {
                        return { value: item.id, label: item.text1 };
                    }));
            }
        });

    }

    const onClickDraft = () => {
        //

        console.log()
       
    }


    useEffect(() => {

        LoadFavMedicineList();
        
        if (props.patientId) {
            LoadDraftMedication();
        }
    }, []);


    return (
        <>
            <div className={classes.box}>
                <div className={classes.leftHeader}>
                    <Paper square classes={{ root: classes.muiPaper }}>
                        <Tabs
                            classes={{ root: classes.tabRoot }}
                            value={tabvalue}
                            onChange={onTabChange}
                            aria-label="icon tabs example"
                            className={classes.Htabs}
                        >
                            <Tab label="Patient Rx" aria-label="phone" {...a11yProps(0)} />
                            <Tab label="Provider Rx" aria-label="favorite" {...a11yProps(1)} />
                            <Tab label="Draft Rx" aria-label="favorite" {...a11yProps(1)} />
                        </Tabs>
                    </Paper>
                </div>
                <div className={classes.content}>
                    <TabPanel value={tabvalue} index={0} className={classes.tabPan}>
                        {tabvalue == 0 ? (
                            <ul className={classes.rXList}>
                                {
                                    favMedicinePatientList.map((item) => {
                                        return (
                                            <li onClick={() => props.onClick(item)}>
                                                {item.label}
                                            </li>
                                        )
                                    })
                                }
                            </ul>) : ""
                        }
                    </TabPanel>
                    <TabPanel value={tabvalue} index={1} className={classes.tabPan}>
                        {tabvalue == 1 ? (
                            <ul className={classes.rXList}>
                                {
                                    favMedicineProviderList.map((item) => {
                                        return (
                                            <li onClick={() => props.onClick(item)}>
                                                {item.label}
                                            </li>
                                        )
                                    })
                                }
                            </ul>) : ""
                        }
                    </TabPanel>

                    <TabPanel value={tabvalue} index={2} className={classes.tabPan}>
                        {tabvalue == 2 ? (
                            <ul className={classes.rXList}>
                                {
                                    draftMedicationList.map((item) => {
                                        return (
                                            
                                            <li onClick={()=>ShowActionDialog(true, "Delete", "Are you sure, you want to add this Rx?", "confirm", function () {
                                                //debugger
                                                props.onClick(item)
                                             }) }>
                                                {item.label}
                                            </li>
                                        )
                                    })
                                }
                            </ul>) : ""
                        }
                    </TabPanel>

                </div>
                <div className={classes.footer}>
                </div>
            </div>

            <ActionDialog
                title={actiondialogprops.actiondialogtitle}
                message={actiondialogprops.actiondialogmessage}
                type={actiondialogprops.actiondialogtype}
                actiondialogOpenClose={actiondialogprops.actiondialogstate}
                onSubmit={actiondialogprops.OnOk}
                onCancel={() => setActionDialogProps(prevState => ({
                    ...prevState,
                    actiondialogstate: false,
                }))
                }
            />


        </>
    )
    
}

export default withSnackbar(RxList)
