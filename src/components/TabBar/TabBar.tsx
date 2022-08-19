import React from 'react';
import { ITabBarItem, TabBarItem } from './TabBarItem/TabBarItem';
import styles from './TabBar.module.css';
import { inject, observer } from 'mobx-react';

interface ITabBar {
  tabBarItem: ITabBarItem[]
}

const TabBarRaw = ({ tabBarItem = [] }: ITabBar) => {

  return (
    <div className={styles.wrapper_tab_bar}>
      {
        tabBarItem.map((tbItem, index) => (
          <TabBarItem
            {...tbItem}
            key={tbItem.label}
            isFirst={index === 0}
            isLast={index === tabBarItem.length - 1}
          />
        ))
      }
    </div>
  );
}

export const TabBar = inject("store")(observer(TabBarRaw));
