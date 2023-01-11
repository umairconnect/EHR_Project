import React, { useState, useEffect } from "react";
import {
    Dialog,
    Grid,
} from "@material-ui/core";
import useStyles from "./styles";
import CloseIcon from "../../../../../../../../images/icons/math-plus.png"
import { CheckboxField, InputBaseField } from "../../../../../../../../components/InputField/InputField";
import { DraggableComponent, FormBtn, FormGroupTitle, Label } from "../../../../../../../../components/UiElements/UiElements";
import SearchList from "../../../../../../../../components/SearchList/SearchList";
import { Scrollbars } from "rc-scrollbars"
import { PostDataAPI } from '../../../../../../../../Services/PostDataAPI';
import { withSnackbar } from '../../../../../../../../components/Message/Alert';
import EditAbleGrid from "../../../../../../../../components/SearchGrid/component/EditAbleGrid";

function ClaimSearchDialog({ showHideDialog, handleClose, handleSave, ...props }) {
    const { showMessage } = props;
    // handle styles
    const classes = useStyles();

    const [isSaving, setIsSaving] = useState(false);
    const [isFilterLoading, setIsFilterLoading] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);

    const [state, setState] = useState({ searchTerm: '', exactMatch: true, unpaidClaims: false });

    useEffect(() => {

    }, [showHideDialog])

    const handleChange = (e, i) => {
        const { name, value, checked } = e.target;
        let sParam = [...searchParams];
        sParam[i] = i == 0 ? value : checked ? '1' : '0';
        setSearchParams(sParam);
        const elemValue = i == 0 ? value : checked;
        setState(prevState => ({
            ...prevState,
            [name]: elemValue
        }))
        if (name == 'searchTerm' && value == '') {
            handleUpdate();
        }
    }

    const [selectedClaimsIds, setSelectedClaimsIds] = useState([]);
    const getSelection = (keys) => {
        setSelectedClaimsIds(keys);
    }
    const [searchParams, setSearchParams] = useState(['a', '1', '0', props.eobId.toString()]);
    const addClaimsToPayment = e => {
        if (!selectedClaimsIds.length > 0) {
            showMessage("Error", 'Please select at least one claim.', "error", 2000);
            return;
        }
        var params = { eobId: parseInt(props.eobId), claimIds: selectedClaimsIds.join(',') };
        PostDataAPI("eob/addClaimsToPayment", params, true).then((result) => {
            if (result.success == true) {
                if (result.success && result.data != null) {
                    // showMessage("Success", "Record saved successfully.", "success", 2000);
                    handleSave(result.data);
                }
            }
            else {
                showMessage("Error", result.message, "error", 3000);
            }
        })
    };
    const filterGrid = () => {
        handleUpdate();
    }
    const handleUpdate = () => { setIsUpdate(!isUpdate) }
    return (
        <Dialog
            open={showHideDialog}
            onClose={handleClose}
            disableBackdropClick
            disableEscapeKeyDown
            classes={{ paper: classes.dialogPaper }}
            PaperComponent={DraggableComponent}
            maxWidth={"lg"}>
            <div className={classes.dialogContent}>
                <div className={classes.box}>
                    <div className={classes.header} id="draggable-dialog-title">
                        <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} /></span>
                        <FormGroupTitle className={classes.lableTitleInput}>Add Claim</FormGroupTitle>

                    </div>
                    <div className={classes.content}>
                        <Grid container direction="row" >
                            <Scrollbars autoHeight autoHeightMin={350} autoHeightMax={490} >
                                <Grid container className={classes.scrollbarsInnerArea}>
                                    <Grid container direction="row" >

                                        <Label title="Search Claim" size={2} />

                                        <Grid item xs={12} sm={5} md={5} lg={5} xl={5}>
                                            <InputBaseField
                                                id="searchTerm"
                                                name="searchTerm"
                                                value={state.searchTerm}
                                                onChange={(e) => { handleChange(e, 0) }}
                                                placeholder="Search by Name, Dos, Claim ID, Account # or TCN "
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
                                            {
                                                isFilterLoading ?
                                                    <FormBtn id="loadingSave" >Search</FormBtn> :
                                                    <FormBtn btnType="search" id="save" onClick={handleUpdate}>Search</FormBtn>
                                            }
                                        </Grid>

                                    </Grid>

                                    <Grid container direction="row" >

                                        <Grid item sm={2} md={2} lg={2} xl={2} />

                                        <Grid item xs={12} sm={6} md={5} lg={4} xl={4}>
                                            <CheckboxField
                                                color="primary"
                                                id="exactMatch"
                                                name="exactMatch"
                                                value={state.exactMatch}
                                                checked={state.exactMatch}
                                                onChange={(e) => { handleChange(e, 1) }}
                                                label="Restrict claims to EOB Insurance only"
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
                                            <CheckboxField
                                                color="primary"
                                                id="unpaidClaims"
                                                name="unpaidClaims"
                                                value={state.unpaidClaims}
                                                onChange={(e) => { handleChange(e, 2) }}
                                                label={"Show paid claims"}
                                            />
                                        </Grid>

                                    </Grid>

                                    <div className={classes.gridContainer}>
                                        <EditAbleGrid
                                            apiUrl="eob/loadClaimGrid"
                                            code="ClaimSearchColumns"
                                            isUpdate={isUpdate}
                                            isSelection={true}
                                            dataId={searchParams}
                                            // onEdit={handleEdit}
                                            // onDelete={handleDelete}
                                          //  isSearchAble={true}
                                            pageCount={8}
                                            columnCode="ClaimSearchColumns"
                                            searchPanelParams="ClaimSearchColumns"
                                            getSelectedRows={(keys) => getSelection(keys)}
                                            searchbarClass={classes.widthSixty}
                                        //rowClick={getId}
                                        />
                                    </div>
                                </Grid>
                            </Scrollbars>

                        </Grid>
                    </div>
                    <div className={classes.footer}>
                        <Grid container direction="row" justify="flex-end" lg={12}>
                            {/* <Grid container direction="row" alignItems="center" justify="flex-end" xs={10} sm={10} md={10} lg={10} xl={10}> */}
                            <div className={classes.footerRight}>
                                {isSaving ?
                                    <FormBtn id="loadingSave"  > Save</FormBtn>
                                    :
                                    <FormBtn id="save" onClick={addClaimsToPayment}> Save</FormBtn>
                                }
                                <FormBtn id="reset" onClick={handleClose}> Close </FormBtn>
                            </div>
                            {/* </Grid> */}
                        </Grid>
                    </div>
                </div>
            </div>

        </Dialog >
    )
}

export default withSnackbar(ClaimSearchDialog)