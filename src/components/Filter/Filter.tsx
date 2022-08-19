import { inject, observer } from "mobx-react";
import React from "react";
import styles from './Filter.module.css';
import { FilterItem, IFilterItem } from "./FilterItem/FilterItem";

interface IFilter {
  title: string;
  items: IFilterItem[];
}

export const FilterRaw = ({ title, items }: IFilter) => {

  return (
    <div className={styles.wrapper_filter}>
      <div className={styles.wrapper_filter_title}>
        {title}
      </div>
      <div >
        {items.map((item, index) => (
          <FilterItem {...item} key={index} />
        ))}
      </div>
    </div>
  )
}

export const Filter = inject("store")(observer(FilterRaw));
