import { inject, observer } from "mobx-react";
import React from "react";
import { FILTER_TYPE } from "../../../constants/filter";
import { store } from "../../../models/RootStore";
import { Checkbox } from "../../Chekcbox/Checkbox";

import styles from './FilterItem.module.css';


export interface IFilterItem {
  id: string;
  label: string;
  selected: boolean;
  type: FILTER_TYPE;
  store?: typeof store
}

const FilterItemRaw = ({ selected, label, type, store }: IFilterItem) => {

  const handleChange = () => {
    store?.airfare.toggleFilter(type)
  }

  return (
    <div className={styles.wrapper_filter_item} onChange={handleChange}>
      <Checkbox checked={selected} label={label} />
    </div>
  )
}

export const FilterItem = inject("store")(observer(FilterItemRaw));
