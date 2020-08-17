import React, { memo, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Picker = ({ pickerData = [], getPickerValue, label = `` }) => {
  const classes = useStyles();
  const [value, setValue] = useState('');

  useEffect(() => {
    getPickerValue(value);
  }, [value]);

  const handleChange = (event) => {
    setValue(event.target.value);
    // getPickerValue(event.target.value);
  };

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id={`simple-select-outlined-${label}`}>{label}</InputLabel>
      <Select
        labelId={`simple-select-outlined-${label}`}
        // id="simple-select-outlined"
        value={value}
        onChange={handleChange}
        label={label}
      >
        {pickerData.map((item, index) => (
          <MenuItem key={item.id} value={item.id}>
            {index === 0 ? <em>None</em> : item.displayValue}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default memo(Picker);
