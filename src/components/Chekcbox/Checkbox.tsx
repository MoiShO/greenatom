import React from "react";
import styles from './Checkbox.module.css';

export interface ICheckbox {
  checked?: boolean;
  label?: string;
}

export const Checkbox = ({ checked, label }: ICheckbox) => {

  return (
    <label className={styles.container}>
      {label ?? ''}
      <input type="checkbox" checked={checked}/>
      <span className={styles.checkmark}></span>
    </label>
  )
}