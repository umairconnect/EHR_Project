import { MenuItem, OutlinedInput, Select } from "@material-ui/core";
import React from "react";
import Style from "./style";

function Dropdown({ styleSheet, dropdownMenuItem }) {
  const classes = Style();
  console.log(dropdownMenuItem);
  return (
    <>
      <Select
        style={styleSheet}
        label="Speciality"
        labelId="demo-multiple-name-label"
        id="demo-multiple-name"
        className={classes.dropdown}
        input={<OutlinedInput />}
        value={1}
        fullWidth
      >
        {dropdownMenuItem?.map((item, index) => {
          return <MenuItem value={item.value}>{item.data}</MenuItem>;
        })}
      </Select>
    </>
  );
}

export default Dropdown;
