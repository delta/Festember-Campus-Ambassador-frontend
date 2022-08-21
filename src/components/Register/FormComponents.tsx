import React from 'react';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import styles from './styles.module.css';
import { InputProps, SelectProps } from './types';

const customInputStyles = {
  fontSize: '1.2rem',
  color: '#fff',
  fontFamily: 'Poppins',
};

export function InputContainer({
  inputLabel,
  value,
  onChange,
  isRequired,
}: InputProps) {
  return (
    <div className={styles.inputContainer}>
      <div className={styles.inputLabel}>
        {inputLabel}
        {isRequired ? '*' : ''}
      </div>
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
          className={styles.dropDownText}
          value={value}
          onChange={onChange}
          defaultValue={dropDownList[0]}
        >
          {dropDownList.map(item => (
            <MenuItem value={item} key={item} className={styles.dropDownText}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
