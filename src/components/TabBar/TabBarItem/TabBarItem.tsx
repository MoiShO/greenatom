import { inject, observer } from 'mobx-react';
import React from 'react';
import { FILTER_TYPE } from '../../../constants/filter';
import { store } from '../../../models/RootStore';
import style from './TabBarItem.module.css';

export interface ITabBarItem {
  id: string;
  label: string;
  selected: boolean;
  type: FILTER_TYPE;
  isFirst?: boolean;
  isLast?: boolean;
  store?: typeof store
}

export const TabBarItemRaw = ({ selected, label, store, type, isFirst = false, isLast = false }: ITabBarItem) => {
  const additionalStyle = selected ? 'active' : 'inactive';
  const firstItem = isFirst ? style.first : '';
  const lastItem = isLast ? style.last : '';

  const handleChange = () => {
    store?.airfare.toggleTabBar(type)
  }

  return (
    <div className={`${style.wrapper_tab_bar_item} ${style[additionalStyle]} ${firstItem} ${lastItem}`} onClick={handleChange}>
      {label}
    </div>
  );
}

export const TabBarItem = inject("store")(observer(TabBarItemRaw));

