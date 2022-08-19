import React from 'react';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import styles from './styles.module.css';
import { InputProps, SelectProps } from './types';

const customInputStyles = {
  fontSize: '1rem',
  color: '#fff',
};

export function InputContainer({ inputLabel, value, onChange, isRequired }: InputProps) {
  return (
    <div className={styles.inputContainer}>
      <div className={styles.inputLabel}>{inputLabel}{isRequired ? "*" : "" }</div>
      <TextField
        inputProps={{ style: customInputStyles }}
        variant="standard"
        color="primary"
        focused
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export function DropDownContainer({
  inputLabel,
  value,
  dropDownList,
  onChange,
}: SelectProps) {
  return (
    <div className={styles.inputContainer}>
      <div className={styles.inputLabel}>{inputLabel}</div>
      <FormControl fullWidth>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          onChange={onChange}
          defaultValue={dropDownList[0]}
        >
          {dropDownList.map(item => (
            <MenuItem value={item} key={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
