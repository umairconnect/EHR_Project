import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import CloseIcon from "../../../../../../../../images/icons/math-plus.png";
//import { PostDataAPI } from '../../../../../../../../Services/PostDataAPI';
import { withSnackbar } from "../../../../../../../../components/Message/Alert";
import { PostDataAPI } from "../../../../../../../../Services/PostDataAPI";

import { Grid, Dialog, FormHelperText } from "@material-ui/core";

import { InputBaseField, SelectField, TextareaField, } from "../../../../../../../../components/InputField/InputField";
import { Scrollbars } from "rc-scrollbars";
import { FormGroupTitle, Label, FormBtn, DraggableComponent, } from "../../../../../../../../components/UiElements/UiElements";
import { ActionDialog } from "../../../../../../../../components/ActionDialog/ActionDialog";
import LogDialog from "../../../../../../../../components/LogDialog/LogDialog";

function NewAuthorizations({ dialogOpenClose, handleClose, handleAddNew, handleSuccess, ...props }) {
  var classes = useStyles();
  const { showMessage } = props;
  const [isSaving, setIsSaving] = useState(false);
  Date.prototype.addDays = function (days) {
    this.setDate(this.getDate() + parseInt(days));
    return this;
  };
  const [state, setState] = useState({
    insuranceAuthorizationId: 0, patientId: props.patientId,
    specializationId: null,
    authorizationNo: "",
    startDate: addDays(new Date(), 0).toString(),
    endDate: addDays(new Date(), 30).toString(),
    approvedVisits: null,
    notes: "",
    isActive: null
  });
  function addDays(date, days) {
    date.addDays(days);
    return date.toISOString().split('T')[0];
  }
  const [errorMessages, setErrorMessages] = useState({
    errorApprovedVisits: false,
    errorAuthorization: false,
    errorStartDate: false,
    errorEndDate: false,
    errorDateValidations: false,
  });
  const [isSaveCall, setIsSaveCall] = useState(false);
  const [specialityList, setSpecialityList] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const OpenCloseLogDialog = (statedialog) => {
    setLogDialogState(statedialog);
  };
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
  //State For Log Dialog
  const [logdialogstate, setLogDialogState] = useState(false);
  const [actiondialogprops, setActionDialogProps] = useState({
    actiondialogstate: false,
    actiondialogtitle: "Title",
    actiondialogmessage: "Message",
    actiondialogtype: "confirm",
  });

  useEffect(() => {
    initilization();
    clearValues();
  }, []);

  const initilization = () => {
    var params = {
      code: "provider_specilizations",
      parameters: [""],
    };
    PostDataAPI("ddl/loadItems", params).then((result) => {
      if (result.success && result.data != null) {
        setSpecialityList(
          result.data.map((item, i) => {
            return { label: item.text1, value: item.id };
          })
        );
      }
    });
  };
  const clearValues = () => {
    if (props.insAuthorizationId > 0) {
      loadData(props.insAuthorizationId);
    }
    else {
      setState({
        insuranceAuthorizationId: 0,
        patientId: props.patientId,
        specializationId: null,
        authorizationNo: "",
        startDate: addDays(new Date(), 0).toString(),
        endDate: addDays(new Date(), 30).toString(),
        approvedVisits: "",
        notes: "",
        isActive: null,
      });
    }

    setErrorMessages({
      errorApprovedVisits: false,
      errorAuthorization: false,
      errorStartDate: false,
      errorEndDate: false,
      errorDateValidations: false,
    });
  };

  const loadData = (insAuthorizationId) => {
    PostDataAPI(
      "patient/insurance/authorization/get",
      parseInt(insAuthorizationId)
    ).then((result) => {
      if (result.success && result.data != null) {
        handleLoadFormatData(result.data);
        setState(result.data);
      } else if (!result.message) {
        showMessage("Error", result.message, "error", 3000);
      }
    });
  };

  const handleLoadFormatData = (dataSet) => {
    if (
      dataSet.startDate != null &&
      dataSet.startDate.trim() != "0001-01-01T00:00:00"
    )
      dataSet.startDate = dataSet.startDate.split("T")[0];
    else dataSet.startDate = "";

    if (
      dataSet.endDate != null &&
      dataSet.endDate.trim() != "0001-01-01T00:00:00"
    )
      dataSet.endDate = dataSet.endDate.split("T")[0];
    else dataSet.endDate = "";
  };
  const Save = () => {
    let errorList = [];
    validateSave(errorList);
    if (errorList.length < 1) {
      state.startDate = state.startDate == "" ? null : state.startDate;
      state.endDate = state.endDate == "" ? null : state.endDate;
      state.specializationId =
        state.specializationId == "" ? null : parseInt(state.specializationId);
      state.approvedVisits =
        state.approvedVisits == "" ? null : parseInt(state.approvedVisits);

      let method = "patient/insurance/authorization/add";
      if (state.insuranceAuthorizationId > 0)
        method = "patient/insurance/authorization/update";
      PostDataAPI(method, state, true).then((result) => {
        setIsSaveCall(false);
        if (result.success == true) {
          setErrorMessages([]);
          if (state.insuranceAuthorizationId < 1) {
            handleSuccess("Record saved successfully.");
          } else if (state.insuranceAuthorizationId > 0) {
            handleSuccess("Record updated successfully.");
          }
        } else {
          setIsSaveCall(false);
          showMessage("Error", result.message, "error", 3000);
        }
      });
    }
  };

  const validateSave = (errorList) => {
    if (state.authorizationNo === null || state.authorizationNo == "") {
      setErrorMessages((prevState) => ({
        ...prevState,
        errorAuthorization: true,
      }));
      errorList.push(true);
    } else {
      setErrorMessages((prevState) => ({
        ...prevState,
        errorAuthorization: false,
      }));
    }

    if (state.startDate === null || state.startDate == "") {
      setErrorMessages((prevState) => ({
        ...prevState,
        errorStartDate: true,
      }));
      errorList.push(true);
    } else {
      setErrorMessages((prevState) => ({
        ...prevState,
        errorStartDate: false,
      }));
    }

    if (state.endDate === null || state.endDate == "") {
      setErrorMessages((prevState) => ({
        ...prevState,
        errorEndDate: true,
      }));
      errorList.push(true);
    } else {
      setErrorMessages((prevState) => ({
        ...prevState,
        errorEndDate: false,
      }));
    }

    if (state.approvedVisits === null || state.approvedVisits == "") {
      setErrorMessages((prevState) => ({
        ...prevState,
        errorApprovedVisits: true,
      }));
      errorList.push(true);
    } else {
      setErrorMessages((prevState) => ({
        ...prevState,
        errorApprovedVisits: false,
      }));
    }

    if (state.endDate < state.startDate) {
      setErrorMessages((prevState) => ({
        ...prevState,
        errorDateValidations: true,
      }));
      errorList.push(true);
    }
  };

  const Reset = () => { };

  const closeDialog = () => {
    handleClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name == "startDate" || name == "endDate") {
      setErrorMessages((prevState) => ({
        ...prevState,
        errorDateValidations: false,
      }));
    }
    if (name == "approvedVisits") {
      if (parseInt(value) >= 0 || value === "") {
      } else {
        return false;
      }
    }
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDelete = () => {
    ShowActionDialog(
      true,
      "Delete",
      "Are you sure, you want to delete the insurance authorization?",
      "confirm",
      function () {
        var data = {
          insuranceAuthorizationId: state.insuranceAuthorizationId,
        };

        PostDataAPI("patient/insurance/authorization/delete", data, true).then(
          (result) => {
            setDeleteLoading(false);

            if (result.success == true) {
              showMessage(
                "Success",
                "Authorization deleted successfully.",
                "success",
                2000
              );
              setTimeout(function () {
                handleClose();
              }, 500);
            } else {
              showMessage("Error", result.message, "error", 8000);
            }
          }
        );
      }
    );
  };

  return (
    <>
      <Dialog
        open={dialogOpenClose}
        onClose={handleClose}
        disableBackdropClick
        disableEscapeKeyDown
        classes={{ paper: classes.dialogPaper }}
        PaperComponent={DraggableComponent}
      >
        <Scrollbars
          autoHeight
          autoHeightMax={700}
          style={{ maxHeight: "calc(100% - 64px)", display: "flex" }}
        >
          <div className={classes.DialogContent}>
            <div className={classes.box}>
              <div className={classes.header} id="draggable-dialog-title">
                <span className={classes.crossButton} onClick={handleClose}>
                  <img src={CloseIcon} />
                </span>
                <FormGroupTitle className={classes.lableTitleInput}>
                  Insurance Authorization
                </FormGroupTitle>
              </div>
              <div className={classes.content}>
                <Grid
                  container
                  direction="row"
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                >
                  <Grid
                    container
                    direction="row"
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                  >
                    <Label title="Authorization #" size={3} mandatory={true} />
                    <Grid
                      item
                      alignItems="flex-start"
                      justify="flex-end"
                      xs={12}
                      sm={7}
                      md={7}
                      lg={7}
                      xl={7}
                    >
                      <InputBaseField
                        placeholder="Authorization #"
                        id="authorizationNo"
                        name="authorizationNo"
                        value={state.authorizationNo}
                        onChange={handleChange}
                        MaxLength={50}
                      />
                      {errorMessages.errorAuthorization &&
                        !state.authorizationNo ? (
                        <FormHelperText style={{ color: "red" }}>
                          Please enter authorization #
                        </FormHelperText>
                      ) : (
                        ""
                      )}
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    alignItems="center"
                    justify="flex-start"
                    direction="row"
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                  >
                    <Label title="Start Date" size={3} mandatory={true} />
                    <Grid
                      item
                      alignItems="flex-start"
                      justify="flex-end"
                      xs={12}
                      sm={7}
                      md={7}
                      lg={7}
                      xl={7}
                    >
                      <InputBaseField
                        id="startDate"
                        name="startDate"
                        value={state.startDate}
                        type="date"
                        onChange={handleChange}
                      />
                      {errorMessages.errorStartDate && !state.startDate ? (
                        <FormHelperText style={{ color: "red" }}>
                          Please enter start date
                        </FormHelperText>
                      ) : (
                        ""
                      )}
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    direction="row"
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                  >
                    <Label title="End Date" size={3} mandatory={true} />
                    <Grid
                      item
                      alignItems="flex-start"
                      justify="flex-end"
                      xs={12}
                      sm={7}
                      md={7}
                      lg={7}
                      xl={7}
                    >
                      <InputBaseField
                        id="endDate"
                        name="endDate"
                        value={state.endDate}
                        type="date"
                        onChange={handleChange}
                      />
                      {errorMessages.errorEndDate && !state.endDate ? (
                        <FormHelperText style={{ color: "red" }}>
                          Please enter end date
                        </FormHelperText>
                      ) : (
                        ""
                      )}
                      {errorMessages.errorDateValidations ? (
                        <FormHelperText style={{ color: "red" }}>
                          End date cannot be earlier than start date
                        </FormHelperText>
                      ) : (
                        ""
                      )}
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    direction="row"
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                  >
                    <Label title="Speciality" size={3} />
                    <Grid
                      item
                      alignItems="flex-start"
                      justify="flex-end"
                      xs={12}
                      sm={7}
                      md={7}
                      lg={7}
                      xl={7}
                    >
                      <SelectField
                        placeholder="Select Speciality"
                        name="specializationId"
                        id="specializationId"
                        MaxLength="255"
                        type="text"
                        onChange={handleChange}
                        value={state.specializationId}
                        options={specialityList}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                  >
                    <Label title="Approved Visits" size={3} mandatory={true} />
                    <Grid
                      item
                      alignItems="flex-start"
                      justify="flex-end"
                      xs={12}
                      sm={7}
                      md={7}
                      lg={7}
                      xl={7}
                    >
                      <InputBaseField
                        placeholder="Approved Visits"
                        id="approvedVisits"
                        name="approvedVisits"
                        value={state.approvedVisits}
                        onChange={handleChange}
                        type="number"
                        MaxLength={4}
                      />
                      {errorMessages.errorApprovedVisits &&
                        !state.approvedVisits ? (
                        <FormHelperText style={{ color: "red" }}>
                          Please enter approved visits
                        </FormHelperText>
                      ) : (
                        ""
                      )}
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    className={classes.textAreaLabel}
                  >
                    <Label title="Notes" size={3} isTextAreaInput={true} />
                    <Grid
                      container
                      alignItems="flex-start"
                      justify="flex-start"
                      xs={12}
                      sm={7}
                      md={7}
                      lg={7}
                      xl={7}
                    >
                      <TextareaField
                        rowsMin={5}
                        placeholder="Notes"
                        onChange={handleChange}
                        name="notes"
                        value={state.notes}
                        MaxLength="4000"
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </div>
              <ActionDialog
                title={actiondialogprops.actiondialogtitle}
                message={actiondialogprops.actiondialogmessage}
                type={actiondialogprops.actiondialogtype}
                actiondialogOpenClose={actiondialogprops.actiondialogstate}
                onSubmit={() => {
                  actiondialogprops.OnOk();
                }}
                onCancel={() =>
                  setActionDialogProps((prevState) => ({
                    ...prevState,
                    actiondialogstate: false,
                  }))
                }
              />
              <LogDialog
                code="insuranceauthorization"
                id={state.insuranceAuthorizationId}
                dialogOpenClose={logdialogstate}
                onClose={(dialogstate) => OpenCloseLogDialog(dialogstate)}
              />
              <Grid container item direction="row" lg={12}>
                <Grid item xs={3} sm={3} md={3} lg={3} xl={3}></Grid>
                <Grid
                  container
                  item
                  direction="row"
                  alignItems="center"
                  justify="flex-start"
                  xs={9}
                  sm={9}
                  md={9}
                  lg={9}
                  xl={9}
                >
                  {isSaving ? (
                    <FormBtn id="loadingSave"> Save</FormBtn>
                  ) : (
                    <FormBtn id="save" onClick={Save}>
                      {" "}
                      Save
                    </FormBtn>
                  )}

                  {state.insuranceAuthorizationId > 0 ? (
                    <FormBtn id={"delete"} onClick={handleDelete} size="medium">
                      Delete
                    </FormBtn>
                  ) : null}
                  <FormBtn id="resetBtn" onClick={clearValues}>
                    {" "}
                    Reset{" "}
                  </FormBtn>
                  {state.insuranceAuthorizationId > 0 ? (
                    <FormBtn
                      id={"save"}
                      onClick={() => OpenCloseLogDialog(true)}
                      size="medium"
                      btnType="logs"
                    >
                      Logs
                    </FormBtn>
                  ) : null}
                  <FormBtn id="reset" onClick={handleClose}>
                    {" "}
                    Close{" "}
                  </FormBtn>
                </Grid>
              </Grid>
            </div>
          </div>
        </Scrollbars>
      </Dialog>
    </>
  );
}
export default withSnackbar(NewAuthorizations);
