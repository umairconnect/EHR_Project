import React, { useState, useEffect } from "react";
import {
  Grid,
  Tab,
  Tabs,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
} from "@material-ui/core";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import LoadingIcon from "../../../../images/icons/loaderIcon.gif";
import { PostDataAPI } from "../../../../Services/PostDataAPI";
import usetyles from "./style";
import FavoriteIcon from "@material-ui/icons/StarBorder";
import FavoriteTrueIcon from "@material-ui/icons/Star";
import DeleteIcon from "../../../../images/icons/trash.png";
import EditIcon from "../../../../images/icons/erase.png";
import { Scrollbars } from "rc-scrollbars";

import {
  DraggableComponent,
  FormBtn,
  FormGroupTitle,
  Label,
} from "../../../../components/UiElements/UiElements";

import AddTemplateDialog from "../common/addTemplateDialog";

import AddNewChartNotes from "../common/AddNewChartNotes";

import { GetUserInfo } from "../../../../Services/GetUserInfo";
import { withSnackbar } from "../../../../components/Message/Alert";
import { ActionDialog } from "../../../../components/ActionDialog/ActionDialog";

function TemplateAccordion({ sectionCode, isUpdate, ...props }) {
  const { showMessage } = props;
  const [ccTemplateId, setCCTemplateId] = useState(0);
  const [edit, setEdit] = useState(false);
  let userID = JSON.parse(GetUserInfo()).user.loggedInUserID;
  const [state, setState] = useState([]);
  const [favState, setFavState] = useState([]);
  const [tabvalue, setTabValue] = useState(0);

  const [addTempDialog, setAddTempDialog] = useState(false);
  const [targetID, setTargetID] = useState("");
  const [loading, setLoading] = useState(false);
  const [favloading, setFavLoading] = useState(false);

  const [errorMessages, setErrorMessages] = useState({
    errorDischargeDispositionCode: false,
    errorChartNotes: false,
  });

  //State For Action Dialog
  const [actiondialogprops, setActionDialogProps] = useState({
    actiondialogstate: false,
    actiondialogtitle: "Title",
    actiondialogmessage: "Message",
    actiondialogtype: "warning",
  });

  const showAddTempDialog = () => {
    setEdit(false);
    setAddTempDialog(true);
  };
  const handleAddTemplateClose = () => {
    setEdit(false);
    setAddTempDialog(false);
    loadTemplates();
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

  useEffect(() => {

    //setLoading(true);
    loadTemplates();
  }, [isUpdate]);

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        style={{
          width: "330px",
          height: "448px",
          margin: "0px",
          backgroundColor: "#FFFFFF",
          borderRadius: "0px",
          overflow: "auto",
        }}
        {...other}
      >
        {value === index && <>{children}</>}
      </div>
    );
  }
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const loadTemplates = (e) => {

    console.log(props);
    let encData = {
      section: sectionCode,
      userID: userID,
      patientId: props.patientId,
    };

    PostDataAPI("itemTemplate/loadItemTemplateGrid", encData).then((result) => {
      //setLoading(false);

      if (result.success && result.data.length >= 0) {
        setState(
          result.data.map((item, i) => {
            return {
              itemTemplateId: item.itemTemplateId,
              itemCode: item.itemCode,
              itemTitle: item.itemTitle,
              isFavorite: item.isFavorite,
              subItemDTOList: item.subItemDTOList,
            };
          })
        );
      }
    });
  };

  const getFavoritTemplatesList = (e) => {
    let encData = {
      section: sectionCode,
      userID: userID,
    };
    setFavLoading(true);
    PostDataAPI("itemTemplate/loadFavoriteTemplatesGrid", encData).then(
      (result) => {
        setFavLoading(false);
        if (result.success && result.data.length >= 0) {
          setFavState(
            result.data.map((item, i) => {
              return {
                itemTemplateId: item.itemTemplateId,
                itemCode: item.itemCode,
                itemTitle: item.itemTitle,
                subItemDTOList: item.subItemDTOList,
              };
            })
          );
        } else {
          setFavState([]);
        }
      }
    );
  };

  const addEditItemTemplate = (targetID) => {
    setAddTempDialog(true);

    setEdit(true);

    setTargetID(targetID);

    // setAnchorEl(anchorEl ? null : e.currentTarget);
    // const id = e.currentTarget.id;
  };

  const handleSelectedItem = (item) => {
    setCCTemplateId(item);
  };

  const onTabChange = (e, newValue) => {
    setTabValue(newValue);
    if (newValue == 1) {
      getFavoritTemplatesList();
    }
  };

  const deleteTemplateItem = (item) => {
    // isUpdate = false

    ShowActionDialog(
      true,
      "Delete",
      "Are you sure, you want to delete the template?",
      "confirm",
      function () {
        PostDataAPI("itemTemplate/deleteItemTemplate", item, true).then(
          (result) => {

            if (result.success == true) {

              setErrorMessages([]);

              showMessage(
                "Success",
                "Record deleted successfully.",
                "success",
                2000
              );

              console.log(props);
              loadTemplates();
              setCCTemplateId(0);
              setEdit(false);
              //setLoading(true);
            } else {
              showMessage("Error", result.message, "error", 3000);
            }
          }
        );
      }
    );
  };

  const addToFavorite = (itemTemplateId, e) => {
    e.stopPropagation();

    let encData = {
      ProviderTemplateId: 0,
      ItemTemplateId: itemTemplateId,
    };

    PostDataAPI("itemTemplate/addEditProviderTemplate", encData, true).then(
      (result) => {
        if (result.success && result.data != null) {
          loadTemplates();
        } else {
          showMessage("Error", result.message, "error", 3000);
        }
      }
    );
  };

  const classes = usetyles();

  console.log("inner dialog");

  return (
    <>
      <div className={classes.header}>
        <div className={classes.leftSideHeader}>
          <Paper square classes={{ root: classes.muiPaper }}>
            <Tabs
              classes={{ root: classes.tabRoot }}
              value={tabvalue}
              onChange={onTabChange}
              aria-label="icon tabs example"
              className={classes.Htabs}
            >
              <Tab label="Templates" aria-label="phone" {...a11yProps(0)} />
              <Tab label="Favorites" aria-label="favorite" {...a11yProps(1)} />
            </Tabs>
          </Paper>
        </div>
      </div>

      <div className={classes.content}>
        <Scrollbars style={{ height: props.height }}>
          <div className={classes.quickPickHeader}>
            <TabPanel value={tabvalue} index={0} className={classes.tabPan}>
              {tabvalue == 0 ? (
                <>
                  {loading ? (
                    <img
                      className={classes.dataLoader}
                      src={LoadingIcon}
                      alt="Loading..."
                    />
                  ) : (
                    <div className={classes.accordinBox}>
                      {state.map((item, i) => (
                        <>
                          <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                              <div className={classes.templatesTitle}>
                                {item.itemTitle}
                              </div>
                              <div className={classes.templatesCode}>
                                {!edit ? (
                                  <span className={classes.templatesCode}>
                                    {item.itemCode}
                                  </span>
                                ) : (
                                  <>
                                    <span
                                      className={classes.favoritIcon}
                                      title="Favorite"
                                      onClick={(e) =>
                                        addToFavorite(item.itemTemplateId, e)
                                      }
                                    >
                                      {item.isFavorite ? (
                                        <FavoriteTrueIcon />
                                      ) : (
                                        <FavoriteIcon />
                                      )}
                                    </span>
                                    <span
                                      className={classes.editIcon}
                                      title="Edit"
                                      onClick={() => addEditItemTemplate(item)}
                                    >
                                      <img src={EditIcon} alt="edit" />
                                    </span>
                                    <span
                                      className={classes.deleteItemIcon}
                                      title="Delete"
                                      onClick={() => deleteTemplateItem(item)}
                                    >
                                      <img src={DeleteIcon} alt="delete" />
                                    </span>
                                  </>
                                )}
                              </div>
                            </AccordionSummary>
                            {item.subItemDTOList != null ? (
                              <AccordionDetails>
                                {item.subItemDTOList.map((subItem, ind) => (
                                  <>
                                    <span
                                      className={classes.accordionDetails}
                                      onClick={() =>
                                        props.handleSelectedSubItem(subItem)
                                      }
                                    >
                                      <span
                                        className={
                                          subItem.templateText != ""
                                            ? classes.circle
                                            : ""
                                        }
                                      ></span>

                                      <span
                                        dangerouslySetInnerHTML={{
                                          __html: subItem.templateText,
                                        }}
                                        onClick={(e) => e.preventDefault()}
                                      ></span>
                                    </span>
                                  </>
                                ))}
                              </AccordionDetails>
                            ) : (
                              ""
                            )}
                          </Accordion>
                        </>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                ""
              )}
            </TabPanel>

            <TabPanel value={tabvalue} index={1}>
              {tabvalue == 1 ? (
                <>
                  {favloading ? (
                    <img
                      className={classes.dataLoader}
                      src={LoadingIcon}
                      alt="Loading..."
                    />
                  ) : favState != null && favState.length > 0 ? (
                    <ul className={classes.templatesList}>
                      {favState.map((item, i) => (
                        <div className={classes.accordinBox} key={i}>
                          <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                              {item.itemTitle}
                            </AccordionSummary>

                            {item.subItemDTOList != null ? (
                              <AccordionDetails>
                                {item.subItemDTOList.map((subItem, ind) => (
                                  <>
                                    <span
                                      className={classes.accordionDetails}
                                      onClick={() =>
                                        props.handleSelectedSubItem(subItem)
                                      }
                                    >
                                      <span className={classes.circle}></span>{" "}
                                      <span> {subItem.templateText}</span>
                                    </span>
                                  </>
                                ))}
                              </AccordionDetails>
                            ) : (
                              ""
                            )}
                          </Accordion>
                        </div>
                      ))}
                    </ul>
                  ) : (
                    <AccordionSummary>
                      {
                        "No Favorite template found for this section. Go to configure templates in setting and mark any template as favorite"
                      }
                    </AccordionSummary>
                  )}
                </>
              ) : (
                ""
              )}
            </TabPanel>
          </div>
        </Scrollbars>
      </div>

      <div className={classes.footer}>
        <FormBtn id="save" onClick={showAddTempDialog}>
          Add Template
        </FormBtn>

        {/* <FormBtn id="save" onClick={showAddTempDialog} >Add Template
                </FormBtn> */}

        {edit ? (
          <FormBtn
            id="reset"
            onClick={() => {
              setEdit(false);
            }}
          >
            Cancel Edit
          </FormBtn>
        ) : (
          <FormBtn
            id="reset"
            onClick={() => {
              setEdit(true);
            }}
          >
            Edit Template
          </FormBtn>
        )}
      </div>

      {addTempDialog ? (
        // <AddTemplateDialog targetID={targetID} edit={edit} sectionCode={sectionCode} addTempDialog={addTempDialog} hideAddTempDialog={handleAddTemplateClose}> </AddTemplateDialog>
        <AddNewChartNotes
          dataTargetId={targetID}
          edit={edit}
          sectionCode={sectionCode}
          addTempDialog={addTempDialog}
          hideAddTempDialog={handleAddTemplateClose}
        ></AddNewChartNotes>
      ) : null}

      <ActionDialog
        title={actiondialogprops.actiondialogtitle}
        message={actiondialogprops.actiondialogmessage}
        type={actiondialogprops.actiondialogtype}
        actiondialogOpenClose={actiondialogprops.actiondialogstate}
        onSubmit={actiondialogprops.OnOk}
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
export default withSnackbar(TemplateAccordion);
