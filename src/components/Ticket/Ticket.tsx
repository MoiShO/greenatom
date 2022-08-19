import React from "react";
import { MAP_CURRENCY } from "../../constants/map";
import { getPluralTransfers } from "../../utils";
import { TextWithTitle } from "../TextWithTitle/TextWithTitle";
import styles from './Ticket.module.css';

export interface ITicket {
  vendor?: string;
  amount: {
    amount: number
    currency: string;
  }
  infos: {
    from: {
      label: string;
      time: string;
    },
    to: {
      label: string;
      time: string;
    },
    transitTime: {
      hours: number,
      minutes: number,
    },
    transfers: string[]
  }[]
}

export const Ticket = ({
  vendor,
  // transitTime,
  amount,
  infos
}: ITicket) => {
  return (
    <div className={styles.wrapper_ticket}>
      <div className={styles.wrapper_ticket_info}>
        {/* отдельно AMOUNT */}
        <div className={styles.amount}>{`${amount.amount} ${MAP_CURRENCY[amount.currency] ?? amount.currency}`}</div>
        <div />
        {/* отдельно VENDOR */}
        <div>{vendor}</div>
        {/* отдельно  INFO возможно варьируется */}
        {
          infos?.map((info) => (
            <>
              <TextWithTitle title={`${info.from.label} - ${info.to.label}`} text={`${info.from.time} - ${info.to.time}`} />
              <TextWithTitle title="В пути" text={`${info.transitTime.hours}ч ${info.transitTime.minutes}м`} />
              <TextWithTitle title={getPluralTransfers(info.transfers.length)} text={info.transfers?.join(',')} />
            </>
          ))
        }
      </div>
    </div>
  );
}