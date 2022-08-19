import { inject, observer } from 'mobx-react';
import React from 'react';
import { Filter } from '../components/Filter/Filter';
import { TabBar } from '../components/TabBar/TabBar';
import { Ticket } from '../components/Ticket/Ticket';
import { store } from '../models/RootStore';
import styles from './Airfare.module.css';

interface IAirfare {
  store: typeof store;
}

export const AirfareRaw = ({ store }: IAirfare) => {
  return (
    <div className={styles.wrapper_airfare}>
      <div className={styles.wrapper_airfare_header}>
        <div className={styles.wrapper_airfare_header_left}>
          <Filter title="Колчество пересадок" items={store.getAllFilters} />
        </div>
        <div className={styles.wrapper_airfare_header_right}>
          <TabBar tabBarItem={store.airfare.tabBar} />
          {
            store.getAllFilterResultTickets?.map((ticket) => (
              <Ticket {...ticket} key={ticket.id}/>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export const Airfare = inject("store")(observer(AirfareRaw));
