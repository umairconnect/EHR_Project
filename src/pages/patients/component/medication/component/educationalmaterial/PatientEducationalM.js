import React, { useState, useEffect, useRef } from "react"
import useStyles from './styles'
import CloseIcon from "../../../../../../images/icons/math-plus.png"
import CompanyLogo from "../../../../../../images/logo.png"
import LoadingIcon from "../../../../../../images/icons/loaderIcon.gif";
import * as Icons from "@material-ui/icons";
import { PostDataAPI } from '../../../../../../Services/PostDataAPI';
import { withSnackbar } from '../../../../../../components/Message/Alert'
import { Scrollbars } from "rc-scrollbars";

import {
    Button,
    Grid,
    Dialog,
} from "@material-ui/core";

import { DraggableComponent, FormGroupTitle, FormBtn } from "../../../../../../components/UiElements/UiElements";

function PatientEducationalM({ educationalClose, educationalOpen, ...props }) {
    const { showMessage } = props;
    var classes = useStyles();

    const sammaryContent = useRef(null);


    const [educationalMaterials, setEducationalMaterials] = useState([]);
    const [data, setData] = useState({});
    const [patientDetailState, setPatientDetailState] = useState({});

    const [isLoading, SetIsLoading] = useState(false);

    const [isSaving, setIsSaving] = useState(false);

    const loadEducationalMaterial = e => {
        // GET request using fetch with error handling
        var medLinePlusLink = "https://connect.medlineplus.gov/service?mainSearchCriteria.v.cs=2.16.840.1.113883.6.90&mainSearchCriteria.v.c=" + props.code + "&knowledgeResponseType=application/json";
        //var medLinePlusLink = "https://connect.medlineplus.gov/service?mainSearchCriteria.v.cs=2.16.840.1.113883.6.103&mainSearchCriteria.v.c=250.33&knowledgeResponseType=application/json";
        if (props.category == "medicine")
            medLinePlusLink = "https://connect.medlineplus.gov/service?mainSearchCriteria.v.cs=2.16.840.1.113883.6.88&mainSearchCriteria.v.c=" + props.code + "&knowledgeResponseType=application/json";

        SetIsLoading(true)
        fetch(medLinePlusLink)
            .then(async response => {
                SetIsLoading(true)
                const data = await response.json();
                setEducationalMaterials(data.feed.entry);

                if (data) {
                    SetIsLoading(false)
                }

            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const shareWithPatient = e => {
        setIsSaving(true);
        var copyLink = "";
        educationalMaterials.map((item, i) => {
            item.link.map((item2, j) => {
                copyLink = item2.href;
            });
        })

        if (copyLink != "") {
            
            let obj = {

                patientEmail: patientDetailState.emailAddress,
                patientName: patientDetailState.firstName,
                linkToShare: copyLink
            };
            PostDataAPI('patient/diagnosis/sendMedPlusLinkToPatient', obj, true).then((result) => {
                if (result.success == true) {
                    console.log("email send successfully");
                    showMessage("Success", "Educational Material shared successfully.", "success", 3000);
                    setIsSaving(false);
                }
                else {
                    console.log("email send failed");
                    showMessage("Error", "Educational Material shared failed. Please try again", "error", 3000);
                    setIsSaving(false);
                }
            })
        }
        else {

        }

    }

    const copyLink = e => {
        var copyLink = "";
        educationalMaterials.map((item, i) => {
            item.link.map((item2, j) => {
                copyLink = item2.href;
            });
        })
        console.log(copyLink);
        navigator.clipboard.writeText(copyLink)
    }

    const getPatientDetails = e => {
        PostDataAPI("patient/getPatient", parseInt(props.patientId)).then((result) => {
            if (result.success && result.data != null) {

                setPatientDetailState(result.data);
            }
        })
    }  


      const PrintSummeryC = () => {
        var divElementContents = document.getElementById("printContent").innerHTML;
        var windows = window.open('', '', 'height=700, width=850');
        windows.document.write('<html>');
        windows.document.write('<body >');
        windows.document.write(divElementContents);
        windows.document.write('</body></html>');
        windows.document.close();
        windows.print();
    }


    useEffect(() => {

        setData(prevState => ({
            ...prevState,
            ['code']: props.code,
            ['name']: props.name,
            ['category']: props.category
        }));
        loadEducationalMaterial();
        getPatientDetails();
    }, [])

    return (
        <>
            <Dialog
                PaperComponent={DraggableComponent}
                classes={{ paper: classes.dialogPaper }}
                open={educationalOpen}
                onClose={educationalClose}
                maxWidth="sm"

            >

                <div className={classes.dialogcontent}>
                    <div className={classes.box}>
                        <div className={classes.header}>
                            <span className={classes.crossButton} onClick={educationalClose}><img src={CloseIcon} /></span>
                            <img src={CompanyLogo} style={{ width: "230px", paddingBottom: "20px" }} />

                        </div>

                        <div className={classes.content}>


                            <Grid container direction="row" xs={12} sm={12} md={12} lg={12}>

                                <Scrollbars className={classes.summaryHeight} >
                                    <div refs={sammaryContent} className={classes.summaryContain} id="printContent">

                                        <FormGroupTitle>Patient Educational Material</FormGroupTitle>

                                        <Grid container direction="row" xs={12} sm={12} md={12} lg={12}>
                                            <h3><b>ICD-10 Code: {data.code} - {data.name} </b></h3>
                                        </Grid>


                                        {isLoading ?
                                            <>
                                                <img className={classes.loader} src={LoadingIcon} alt="Loading..." />
                                            </> : ''
                                        }


                                        {educationalMaterials.map((item, i) => {
                                            return (
                                                <>
                                                    {item.summary._value ?
                                                        <>
                                                            <h2><b>Summary:</b> </h2>
                                                        </>
                                                        : ''}
                                                    <p dangerouslySetInnerHTML={{ __html: item.summary._value }}>
                                                    </p>
                                                    <hr style={{ opacity: "0.3" }} />
                                                </>
                                            )

                                        })}
                                    </div>
                                </Scrollbars>
                            </Grid>

                            <Grid container direction="row" xs={12} sm={12} md={12} lg={12}>
                                {isSaving ?
                                    <FormBtn id="loadingSave" className={classes.footerBtn}>  Share with Patient </FormBtn>
                                    :
                                    <Button className={classes.footerBtn} onClick={shareWithPatient}>
                                        <Icons.Share /> Share with Patient
                                    </Button>
                                }



                                <Button className={classes.footerBtn} onClick={copyLink}>
                                    <Icons.FileCopy /> Copy Link
                                </Button>

                                <Button className={classes.footerBtn} onClick={PrintSummeryC}>
                                    <Icons.Print /> Print</Button>


                            </Grid>

                        </div>
                    </div>
                </div>



            </Dialog>
        </>
    )

} export default withSnackbar(PatientEducationalM)
