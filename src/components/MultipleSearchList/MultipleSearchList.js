import React, { useState, useEffect } from "react";
import { Autocomplete } from '@material-ui/lab';
import useStyles from "./styles";

// styles
import {
    InputBase,
    InputAdornment,
    Grid,
    Typography,
    Box, Popper
} from "@material-ui/core";
import {
    Search as SearchIcon
} from "@material-ui/icons";
import CircularProgress from '@material-ui/core/CircularProgress';

export default function MultipleSearchList({ ...props }) {
    const { value } = props;
    const [open, setOpen] = React.useState(false);
    const [searchResults, setSearchResults] = useState([ ]);

    return (
        <>
            <SearchList
                name="code"
                value={state.code}
                searchTerm={state.cptName}
                code="CPT"
                apiUrl="ddl/loadItems"
                onChangeValue={(name, item) => handleSearchProcedureList(name, item)}
                placeholderTitle="Search Procedure"
                reRender={reRender}
            />

            <Grid item xs={12} sm={12} lg={12} md={12}>
                <div className={classes.orderTestContent}>
                    <ul className={classes.orderList}>
                        {procedureList ?

                            procedureList.filter(t => t.patientDoesNotHave == false).map((item, i) => {
                                if (item.isDeleted == true) { return '' }
                                else {
                                    return (
                                        <>
                                            <li>
                                                {item.procedureListName}
                                                <span className={classes.deleteIcon} onClick={() => deleteProcedureList(item.procedureListID)}> <AddDeleteIcon /> </span>
                                            </li>
                                        </>
                                    )
                                }
                            }
                            ) : ''
                        }
                    </ul>
                </div>
            </Grid>

        </>
    )
}