import React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

type SelectItemType = {
  name: number | string
};

interface FormSelectInterface<T> {
  selectItem: T[],
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  selectLabel: string,
  selectedValue: SelectItemType['name'],
}

function FormSelect<T extends SelectItemType>(
  {
    selectItem, handleChange, selectLabel, selectedValue,
  }
  : FormSelectInterface<T>,
) {
  return (

    <TextField
      value={selectedValue}
      onChange={handleChange}
      variant="outlined"
      label={selectLabel}
      select
      InputLabelProps={{
        shrink: true,
      }}
    >
      {selectItem.map((item) => (
        <MenuItem key={item.name} value={item.name}>
          {item.name}
        </MenuItem>
      ))}
    </TextField>

  );
}

export default FormSelect;
