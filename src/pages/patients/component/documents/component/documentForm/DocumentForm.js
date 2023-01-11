import React, { useState, useEffect, useRef } from "react";

// styles
import useStyles from "./styles";
import {
  Grid,
  FormHelperText,
  Dialog,
  DialogContent,
  DialogContentText,
  FormLabel,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "../../../../../../images/icons/math-plus.png";
import {
  DraggableComponent,
  FooterBtn,
  FormBtn,
  FormGroupTitle,
  Label,
} from "../../../../../../components/UiElements";
import {
  InputBaseField,
  TextareaField,
  SelectField,
} from "../../../../../../components/InputField"; //CheckboxField,
import { PostDataAPI } from "../../../../../../Services/PostDataAPI";
import { withSnackbar } from "../../../../../../components/Message/Alert";
import SearchList from "../../../../../../components/SearchList/SearchList";
import PdfPreview from "../../../../../../images/pdf-preview.png";
import DocPreview from "../../../../../../images/word-logo.png";
import ExcelPreview from "../../../../../../images/excel-logo.png";
import { ActionDialog } from "../../../../../../components/ActionDialog/ActionDialog";
import LogDialog from "../../../../../../components/LogDialog/LogDialog";

import { LinkS } from "../../../../../../components/UiElements";
import { Scrollbars } from "rc-scrollbars";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import ZoomOutIcon from "@material-ui/icons/ZoomOut";

function DocumentForm({ dialogOpenClose, handleClose, actiontype, ...props }) {
  // handle styles
  var classes = useStyles();
  const { showMessage } = props;

  const [logdialogstate, setLogDialogState] = useState(false);
  const [patientId] = useState(props.dataId);
  const [providerId] = useState(props.providerId);
  const [documentId] = useState(props.id);
  // Create reference of DOM object
  const imgRef = useRef(null);
  const [imageSize, setImageSize] = useState({ height: "", width: "" });

  //dropdown lists
  const [typeList, setTypeList] = useState([]);
  const [providerList, setProviderList] = useState([]);
  const [documentSubTypeList, setDocumentSubType] = useState([]);

  const [severityList, setSeverityList] = useState([]);
  //end dropdown lists

  const [state, setState] = useState({
    documentId: 0,
    patientID: patientId,
    patientName: "",
    providerId: providerId,
    documentTypeCode: "",
    documentTitle: "",
    documentPath: "",
    comments: "",
    documentDate: "",
    documentName: "",
    documentStatusCode: "",
    isDeleted: false,
    createdBy: 0,
    updatedBy: 0,
    createDate: new Date().toISOString(),
    docType: "",
  });
  const [errorMessages, setErrorMessages] = useState({
    errorDocumentTypeCode: false,
    errorDocumentTitle: false,
  });

  //State For Action Dialog
  const [actiondialogprops, setActionDialogProps] = useState({
    actiondialogstate: false,
    actiondialogtitle: "Title",
    actiondialogmessage: "Message",
    actiondialogtype: "confirm",
  });

  const [documentTypeCodes, setDocumentTypeCodes] = useState([]);
  const [documentStatusCodes, setDocumentStatusCodes] = useState([]);
  const [documentImage, setDocumentImage] = useState({
    file: null,
    fileToSend: null,
    fileName: null,
  });
  let user_info = JSON.parse(sessionStorage.getItem("user_info"));
  let userId = user_info.user.userID;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const resetForm = () => {
    initializeState();
    loadDocumentTypeList();


    var docID = documentId;
    if (docID != props.id)
      docID = props.id
    if (docID > 0) loadData();
  };

  const initializeState = () => {
    setState({
      documentId: 0,
      patientID: patientId,
      patientName: "",
      patientName: "",
      providerId: "",
      documentTypeCode: "",
      documentTitle: "",
      documentPath: "",
      comments: "",
      documentDate: "",
      documentName: "",
      docType: "",
      documentStatusCode: "",
      isDeleted: false,
      createdBy: 0,
      updatedBy: 0,
      createDate: new Date().toISOString(),
    });
  };

  const loadData = () => {

    var docID = documentId;
    if (docID != props.id)
      docID = props.id

    PostDataAPI("patient/document/get", parseInt(docID)).then((result) => {
      if (result.success && result.data != null) {
        handleLoadFormatData(result.data);
        setState(result.data);
      } else if (!result.message) {
        showMessage("Error", result.message, "error", 3000);
      }
    });
  };

  const loadDocumentTypeList = () => {
    var params = {
      code: "DDL_List_Item",
      parameters: ["document_sub_type"],
    };

    PostDataAPI("ddl/loadItems", params).then((result) => {
      if (result.success && result.data != null) {
        setDocumentSubType(
          result.data.map((item, i) => {
            return { value: item.text1, label: item.text2 };
          })
        );
      }
    });
  };
  // Event handler callback for zoom in
  const handleZoomIn = () => {
    setImageSize({
      height: imageSize.height + 10,
      width: imageSize.width + 10,
    });
  };
  // Event handler callback zoom out
  const handleZoomOut = () => {
    //// Fetching current height and width
    //const height = imgRef.current.clientHeight;
    //const width = imgRef.current.clientWidth;
    // Assigning original height and width
    setImageSize({
      height: imageSize.height - 10,
      width: imageSize.width - 10,
    });
  };
  const onImgLoad = ({ target: img }) => {
    setImageSize({ height: img.offsetHeight, width: img.offsetWidth });
  };
  useEffect(() => {
    console.log("imgRef.current" + imgRef.current);
    //if(imgRef!==null){
    //    
    //    setImageSize({height:imgRef.current.clientHeight,width:imgRef.current.clientWidth});
    //}
    resetForm();

    var params = {
      code: "document_providers",
      parameters: [userId.toString()],
    };

    PostDataAPI("ddl/loadItems", params).then((result) => {
      if (result.success && result.data != null) {
        setProviderList(
          result.data.map((item, i) => {
            return { value: item.id, label: item.text1 + " " + item.text2 };
          })
        );
      }
    });

    if (documentId > 0 && actiontype != "New Document") {
      loadData();
    }
  }, [dialogOpenClose]);

  function uploadSingleFile(e) {
    setDocumentImage({ file: null, fileToSend: null, fileName: null });

    setDocumentImage({
      file: URL.createObjectURL(e.target.files[0]),
      fileToSend: e.target.files[0],
      fileName: e.target.files[0].name,
    });
  }

  const handleSearchTypeChange = (name, item) => {
    const { id, value } = item;
    setState((prevState) => ({
      ...prevState,
      [name]: id,
    }));
    //  var label = e.target.options[e.target.selectedIndex].text;

    setState((prevState) => ({
      ...prevState,
      allergyName: value,
    }));
  };

  const handleProviderNameChange = (name, item) => {
    const { id, value } = item;
    setState((prevState) => ({
      ...prevState,
      [name]: id,
    }));
    //  var label = e.target.options[e.target.selectedIndex].text;

    // setState(prevState => ({
    //     ...prevState,
    //     "allergyName": value
    // }));
  };

  const Save = () => {
    var validated = true;

    if (!state.documentTypeCode || state.documentTypeCode.trim() == "") {
      setErrorMessages((prevState) => ({
        ...prevState,
        errorDocumentTypeCode: true,
      }));
      validated = false;
    }
    if (!state.documentTitle || state.documentTitle.trim() == "") {
      setErrorMessages((prevState) => ({
        ...prevState,
        errorDocumentTitle: true,
      }));
      validated = false;
    }

    if (validated == false) return;

    var method = "patient/document/add";
    if (state.documentId > 0) method = "patient/document/update";

    const formData = new FormData();
    for (var key in state) {
      if (
        state[key] &&
        key != "fileName" &&
        key != "formFile" &&
        key != "encUserID"
      )
        formData.append(key, state[key]);
    }

    formData.append("formFile", documentImage.fileToSend);
    formData.append("fileName", documentImage.fileName);
    formData.append("FromFiles", []);

    PostDataAPI(method, formData, true, "formData").then((result) => {
      if (result.success && result.data != null) {
        if (state.documentId < 1) {
          setState(result.data);
        }
        showMessage("Success", "Document saved successfully.", "success", 3000);
      } else showMessage("Error", result.message, "error", 8000);
    });
  };

  function clear() {
    resetForm();
    setErrorMessages({});
  }

  function handleLoadFormatData(dataSet) {
    if (dataSet.documentDate != null && dataSet.documentDate != "")
      dataSet.documentDate = dataSet.documentDate.split("T")[0];
    if (dataSet.documentPath !== null) {
      var ext = dataSet.documentPath.substring(
        dataSet.documentPath.lastIndexOf(".") + 1
      );
      dataSet.docType = ext;
      dataSet.documentName = dataSet.documentPath.split("\\")[4];
    }
  }

  function deleteRecord() {
    var data = {
      documentId: parseInt(state.documentId),
    };

    PostDataAPI("patient/document/delete", data, true).then((result) => {
      if (result.success == true) {
        showMessage("Success", "Record deleted successfully.", "success", 2000);
        handleClose();
      } else {
        showMessage("Error", result.message, "error", 8000);
      }
    });
  }

  const ShowActionDialog = (
    actiontype,
    title,
    message,
    type,
    OnOkCallback,
    OnCancellCallback
  ) => {
    setActionDialogProps((prevState) => ({
      ...prevState,
      dialogactiontype: actiontype,
      actiondialogstate: true,
      actiondialogtitle: title,
      actiondialogmessage: message,
      actiondialogtype: type,
      OnOk: OnOkCallback,
      OnCancel: OnCancellCallback,
    }));
  };
  return (
    <>
      <Dialog
        PaperComponent={DraggableComponent}
        open={dialogOpenClose}
        onClose={handleClose}
        disableBackdropClick
        disableEscapeKeyDown
        classes={{ paper: classes.dialogPaper }}
      >
        {/* <DialogContent className={classes.DialogContent}>
                    <DialogContentText className={classes.dialogMessage}> */}

        <div className={classes.dialogContent}>
          <div className={classes.box}>
            <div className={classes.header} id="draggable-dialog-title">
              <span className={classes.crossButton} onClick={handleClose}>
                <img src={CloseIcon} />
              </span>
              {/* <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} /></span> */}
              <FormGroupTitle>
                {actiontype === "ammendment"
                  ? "Edit Document"
                  : actiontype === "New Document"
                    ? "New Document"
                    : "Details"}
              </FormGroupTitle>
              {/* <FormGroupTitle>{diagnosisId > 0 ? "Edit Diagnosis" : "Add Diagnosis"}</FormGroupTitle> */}
            </div>
            <div className={classes.content}>
              <Grid container lg={12}>
                {/* <Grid lg={12} container direction="row">

                                    <Grid item xs={11} sm={11} md={11} lg={11}
                                        container
                                        direction="row"
                                        id="draggable-dialog-title"
                                    >
                                        <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} /></span>
                                        <FormGroupTitle>{actiontype === "ammendment" ? "Edit Document" : actiontype === "New Document" ? "New Document" : "Details"}</FormGroupTitle>
                                    </Grid>
                                    <Grid item xs={1} sm={1} md={1} lg={1} >
                                        <Grid container direction="row" justify="flex-start" alignItems="center" xs={12} sm={12} md={12} lg={12} >
                                            <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} /></span>
                                        </Grid>
                                    </Grid>
                                </Grid> */}

                <Grid container direction="row" xs={12} sm={5} md={5} lg={5}>
                  <div className={classes.imageArea}>
                    {(state.documentPath &&
                      state.docType !== "pdf" &&
                      state.docType !== "docx" &&
                      state.docType !== "xlsx" &&
                      state.docType == "png") ||
                      state.docType == "jpg" ||
                      state.docType == "jpeg" ||
                      documentImage.file ? (
                      <Scrollbars style={{ height: 350 }}>
                        <LinkS target={"_blank"} href={state.documentPath}>
                          <img
                            onLoad={onImgLoad}
                            style={{
                              height: imageSize.height,
                              width: imageSize.width,
                            }}
                            id="patientDocImgSource"
                            alt={state.documentPath}
                            src={
                              documentImage.file != null
                                ? documentImage.file
                                : "." + state.documentPath
                            }
                          />
                        </LinkS>
                      </Scrollbars>
                    ) : state.documentPath && state.docType === "pdf" ? (
                      <LinkS
                        target={"_blank"}
                        href={"." + state.documentPath}
                        className={classes.imageLink}
                      >
                        <img
                          onLoad={onImgLoad}
                          style={{
                            height: imageSize.height,
                            width: imageSize.width,
                          }}
                          id="patientDocImgSource"
                          src={PdfPreview}
                          alt=""
                          className={classes.logo}
                        />
                      </LinkS>
                    ) : state.documentPath && state.docType === "docx" ? (
                      <LinkS
                        target={"_blank"}
                        href={"." + state.documentPath}
                        className={classes.imageLink}
                      >
                        <img
                          onLoad={onImgLoad}
                          style={{
                            height: imageSize.height,
                            width: imageSize.width,
                          }}
                          id="patientDocImgSource"
                          src={DocPreview}
                          alt=""
                          className={classes.logo}
                        />
                      </LinkS>
                    ) : state.documentPath && state.docType === "xlsx" || state.docType === "csv" ? (
                      <LinkS
                        target={"_blank"}
                        href={"." + state.documentPath}
                        className={classes.imageLink}
                      >
                        <img
                          onLoad={onImgLoad}
                          style={{
                            height: imageSize.height,
                            width: imageSize.width,
                          }}
                          id="patientDocImgSource"
                          src={ExcelPreview}
                          alt=""
                          className={classes.logo}
                        />
                      </LinkS>
                    ) : (
                      <div className={classes.image}>
                        <FormLabel className={classes.lableInput}>
                          {state.documentPath ? (
                            <LinkS
                              target={"_blank"}
                              href={"." + state.documentPath}
                            >
                              {state.documentName}
                            </LinkS>
                          ) : (
                            state.documentName
                          )}
                        </FormLabel>
                      </div>
                    )}

                    {state.docType == "png" ||
                      state.docType == "jpg" ||
                      state.docType == "jpeg" ? (
                      <FooterBtn className={classes.footerBtn}>
                        <IconButton
                          onClick={handleZoomIn}
                          classes={{ root: classes.iconBtnRoot }}
                          className={classes.IconBtn}
                        >
                          <ZoomInIcon />
                        </IconButton>
                        <IconButton
                          onClick={handleZoomOut}
                          className={classes.IconBtn}
                        >
                          <ZoomOutIcon />
                        </IconButton>
                      </FooterBtn>
                    ) : (
                      ""
                    )}
                  </div>
                </Grid>

                <Grid item direction="row" xs={12} sm={7} md={7} lg={7}>
                  <Grid item lg={12} container direction="row">
                    {actiontype === "view" ? (
                      <>
                        <Grid item lg={12} container direction="row">
                          <Grid item xs={12} sm={4} md={4} lg={4} style={{ textAlign: 'right' }}>
                            <FormLabel className={classes.formLabelTitle}>
                              Patient Name:
                            </FormLabel>
                          </Grid>
                          <Grid item xs={12} sm={8} md={8} lg={8}>
                            <FormLabel className={classes.lableInput}>
                              {state.patientName}
                            </FormLabel>
                          </Grid>
                        </Grid>
                        <Grid item lg={12} container direction="row">
                          <Grid item xs={12} sm={4} md={4} lg={4} style={{ textAlign: 'right' }}>
                            <FormLabel className={classes.formLabelTitle}>
                              Document ID:
                            </FormLabel>
                          </Grid>
                          <Grid item xs={12} sm={8} md={8} lg={8}>
                            <FormLabel className={classes.lableInput}>
                              {state.documentControlId}
                            </FormLabel>
                          </Grid>
                        </Grid>
                      </>
                    ) : (
                      <>
                        <Label title="Title" size={3} mandatory={true} />
                        <Grid item xs={12} sm={8} md={8} lg={8}>
                          <InputBaseField
                            name="documentTitle"
                            placeholder="Title"
                            value={state.documentTitle}
                            onChange={handleChange}
                          />
                          {errorMessages.errorDocumentTitle &&
                            !state.errorDocumentTitle ? (
                            <FormHelperText style={{ color: "red" }}>
                              Please enter document Title
                            </FormHelperText>
                          ) : (
                            ""
                          )}
                        </Grid>
                        <Label title="Document ID" size={3} />
                        <Grid item xs={12} sm={8} md={8} lg={8}>
                          <InputBaseField
                            name="documentID"
                            placeholder="Document ID"
                            IsDisabled={true}
                            value={state.documentControlId}
                          />
                        </Grid>
                      </>
                    )}
                  </Grid>

                  <Grid item lg={12} container direction="row">
                    {actiontype === "view" ? (
                      <>
                        <Grid item lg={12} container direction="row">
                          <Grid item xs={12} sm={4} md={4} lg={4} style={{ textAlign: 'right' }}>
                            <FormLabel className={classes.formLabelTitle}>
                              Title:
                            </FormLabel>
                          </Grid>
                          <Grid item xs={12} sm={8} md={8} lg={8}>
                            <FormLabel className={classes.lableInput}>
                              {state.documentTitle}
                            </FormLabel>
                          </Grid>
                        </Grid>
                        <Grid item lg={12} container direction="row">
                          <Grid item xs={12} sm={4} md={4} lg={4} style={{ textAlign: 'right' }}>
                            <FormLabel className={classes.formLabelTitle}>
                              Document SubType:
                            </FormLabel>
                          </Grid>
                          <Grid item xs={12} sm={8} md={8} lg={8}>
                            <FormLabel className={classes.lableInput}>
                              {state.documentSubType}
                            </FormLabel>
                          </Grid>
                        </Grid>
                      </>
                    ) : (
                      <>
                        <Label
                          title="Document Type"
                          mandatory={true}
                          size={3}
                        />
                        <Grid item xs={12} sm={8} md={8} lg={8}>
                          <SearchList
                            name="documentTypeCode"
                            value={state.documentTypeCode}
                            searchTerm={state.documentTypeCode}
                            code="documentTypeCode"
                            apiUrl="ddl/loadItems"
                            onChangeValue={(name, item) =>
                              handleSearchTypeChange(name, item)
                            }
                            placeholderTitle="Document Type"
                          />
                          {errorMessages.errorDocumentTypeCode &&
                            !state.documentTypeCode ? (
                            <FormHelperText style={{ color: "red" }}>
                              Please enter document type
                            </FormHelperText>
                          ) : (
                            ""
                          )}
                        </Grid>
                        <Label
                          title="Document Subtype"
                          mandatory={false}
                          size={3}
                        />
                        <Grid item xs={12} sm={8} md={8} lg={8}>
                          <SelectField
                            name="documentSubType"
                            value={state.documentSubType}
                            placeholder="Select Subtype"
                            options={documentSubTypeList}
                            onChange={handleChange}
                          />
                        </Grid>
                      </>
                    )}
                  </Grid>

                  <Grid item lg={12} container direction="row">
                    {actiontype === "view" ? (
                      <>
                        <Grid item lg={12} container direction="row">
                          <Grid item xs={12} sm={4} md={4} lg={4} style={{ textAlign: 'right' }}>
                            <FormLabel className={classes.formLabelTitle}>
                              Document Type:
                            </FormLabel>
                          </Grid>
                          <Grid item xs={12} sm={8} md={8} lg={8}>
                            <FormLabel className={classes.lableInput}>
                              {state.documentTypeCode}
                            </FormLabel>
                          </Grid>
                        </Grid>
                      </>
                    ) : (
                      <>
                        <Label
                          title="`Patient `Name"
                          mandatory={false}
                          size={3}
                          style={{ display: "none" }}
                        />
                        <Grid
                          item
                          xs={12}
                          sm={8}
                          md={8}
                          lg={8}
                          style={{ display: "none" }}
                        >
                          <SearchList
                            name={state.patientName}
                            value={state.patientID}
                            searchTerm={state.patientName}
                            code="patient_Search"
                            apiUrl="ddl/loadItems"
                            onChangeValue={(name, item) =>
                              handleSearchTypeChange(name, item)
                            }
                            placeholderTitle="Patient Name"
                          />
                        </Grid>
                      </>
                    )}
                  </Grid>

                  <Grid item lg={12} container direction="row">
                    {actiontype === "view" ? (
                      <>
                        <Grid item lg={12} container direction="row">
                          <Grid item xs={12} sm={4} md={4} lg={4} style={{ textAlign: 'right' }}>
                            <FormLabel className={classes.formLabelTitle}>
                              Provider Name:
                            </FormLabel>
                          </Grid>
                          <Grid item xs={12} sm={8} md={8} lg={8}>
                            <FormLabel className={classes.lableInput}>
                              {state.providerName}
                            </FormLabel>
                          </Grid>
                        </Grid>
                      </>
                    ) : (
                      <>
                        <Label
                          title="Provider Name"
                          mandatory={false}
                          size={3}
                        />
                        <Grid item xs={12} sm={8} md={8} lg={8}>
                          {/* <SearchList name="providerId" value={state.providerId} searchTerm="" code="all_providers" apiUrl="ddl/loadItems"
                                                onChangeValue={(name, item) => handleProviderNameChange(name, item)} placeholderTitle="Provider Name"/> */}
                          <SelectField
                            name="providerId"
                            value={state.providerId}
                            placeholder=" Select Provider"
                            options={providerList}
                            onChange={handleChange}
                          />
                        </Grid>
                      </>
                    )}
                    {/* actiontype === "ammendment" ?
                                        <Grid item xs={12} sm={4} md={4} lg={4} >
                                            <CheckboxField
                                                color="primary"
                                                name="assignToMe"
                                                label="Assign to me"
                                                checked={state.isAssignToMe ? true : false}
                                                onChange={handleChkboxChange}
                                            />
                                        </Grid>
                                        : "" */}
                  </Grid>

                  <Grid item lg={12} container direction="row">
                    {actiontype === "view" ? (
                      <>
                        <Grid item lg={12} container direction="row">
                          <Grid item xs={12} sm={4} md={4} lg={4} style={{ textAlign: 'right' }}>
                            <FormLabel className={classes.formLabelTitle}>
                              Date:
                            </FormLabel>
                          </Grid>
                          <Grid item xs={12} sm={8} md={8} lg={8}>
                            <FormLabel className={classes.lableInput}>
                              {state.strDocumentDate}
                            </FormLabel>
                          </Grid>
                        </Grid>
                      </>
                    ) : (
                      <>
                        <Label title="Date" mandatory={false} size={3} />
                        <Grid item xs={12} sm={8} md={8} lg={8}>
                          <InputBaseField
                            placeholder="Date"
                            onChange={handleChange}
                            name="documentDate"
                            value={state.documentDate}
                            MaxLength="20"
                            type="date"
                          />
                        </Grid>
                      </>
                    )}
                  </Grid>

                  <Grid item lg={12} container direction="row">
                    {actiontype === "view" ?
                      <>
                        <Grid item lg={12} container direction="row">
                          <Grid item xs={12} sm={4} md={4} lg={4} style={{ textAlign: 'right' }}>

                            <FormLabel className={classes.formLabelTitle}>Comments:</FormLabel>

                          </Grid>
                          <Grid item xs={12} sm={8} md={8} lg={8} >
                            <FormLabel className={classes.lableInput}>{state.comments}</FormLabel>
                          </Grid>
                        </Grid>
                      </>
                      :
                      <>
                        <Label title="Comments" isTextAreaInput={true} mandatory={false} size={3} />
                        <Grid item xs={12} sm={8} md={8} lg={8} >
                          <TextareaField
                            rowsMin={5}
                            placeholder="Comments"
                            onChange={handleChange}
                            name="comments"
                            value={state.comments}
                            MaxLength="2000"
                          />
                        </Grid>
                      </>
                    }
                  </Grid>


                </Grid>


              </Grid>
            </div>
          </div >
          <div >
            <Grid container alignItems="center" justify="flex-end" xs={12} sm={12} md={12} lg={12} >
              {actiontype != "view" ? <Grid container alignItems="center" justify="flex-end" lg={12}>

                <FormBtn id="save" onClick={Save} size="medium">
                  Save
                </FormBtn>
                {
                  actiontype === "ammendment" ?
                    <FormBtn id={"delete"} onClick={() => ShowActionDialog(true, "Delete", "Are you sure, you want to delete the document?", "confirm")} size="medium">
                      Delete
                    </FormBtn>
                    : null
                }
                <FormBtn id={"resetBtn"} onClick={clear} size="medium" >Reset </FormBtn>

                {
                  state.documentId > 0 ?
                    <FormBtn id={"save"} onClick={() => setLogDialogState(true)} size="medium" btnType="logs" >Logs</FormBtn>
                    : null
                }
                <FormBtn id={"reset"} size="medium" onClick={handleClose}>Close</FormBtn>
              </Grid>
                : <FormBtn id={"reset"} size="medium" onClick={handleClose}>Close</FormBtn>}

            </Grid>
          </div >
        </div >
        {/* </DialogContentText>
                </DialogContent> */}
      </Dialog>
      {logdialogstate ? (
        <LogDialog
          code="patdocument"
          id={state.documentId}
          dialogOpenClose={logdialogstate}
          onClose={(dialogstate) => setLogDialogState(dialogstate)}
        />
      ) : null}

      <ActionDialog
        title={actiondialogprops.actiondialogtitle}
        message={actiondialogprops.actiondialogmessage}
        type={actiondialogprops.actiondialogtype}
        actiondialogOpenClose={actiondialogprops.actiondialogstate}
        onSubmit={deleteRecord}
        onCancel={() =>
          setActionDialogProps((prevState) => ({
            ...prevState,
            actiondialogstate: false,
          }))
        }
      />
    </>
  );
}
export default withSnackbar(DocumentForm);
