import { types } from "mobx-state-tree";
import { AirfareModel } from "./Airfare";
import Ticket from "../_mock/Tickets.json";
import { FILTER_TYPE, FILTER_TYPE_PRESENTATION, TAB_BAR_FILTER_TYPE_PRESENTATION } from "../constants/filter";

export const RootStore = types.model({
  airfare: AirfareModel,
})
  .views(self => ({
    get getAllTickets() {
      return self.airfare.tickets;
    },
    get getAllFilterResultTickets() {
      return self.airfare.result;
    },
    get getAllFilters() {
      return self.airfare.filters;
    }
  }));

export const store = RootStore.create({
  airfare: {
    filters: [
      {
        id: FILTER_TYPE.ALL,
        selected: true,
        label: FILTER_TYPE_PRESENTATION[FILTER_TYPE.ALL],
        type: FILTER_TYPE.ALL
      },
      {
        id: FILTER_TYPE.NO_TRANSFERS,
        selected: false,
        label: FILTER_TYPE_PRESENTATION[FILTER_TYPE.NO_TRANSFERS],
        type: FILTER_TYPE.NO_TRANSFERS
      },
      {
        id: FILTER_TYPE.ONE_TRANSFERS,
        selected: false,
        label: FILTER_TYPE_PRESENTATION[FILTER_TYPE.ONE_TRANSFERS],
        type: FILTER_TYPE.ONE_TRANSFERS
      },
      {
        id: FILTER_TYPE.TWO_TRANSFERS,
        selected: false,
        label: FILTER_TYPE_PRESENTATION[FILTER_TYPE.TWO_TRANSFERS],
        type: FILTER_TYPE.TWO_TRANSFERS
      },
      {
        id: FILTER_TYPE.THREE_TRANSFERS,
        selected: false,
        label: FILTER_TYPE_PRESENTATION[FILTER_TYPE.THREE_TRANSFERS],
        type: FILTER_TYPE.THREE_TRANSFERS
      }
    ],
    tabBar: [
      {
        id: FILTER_TYPE.LOWER_COST,
        selected: false,
        label: TAB_BAR_FILTER_TYPE_PRESENTATION[FILTER_TYPE.LOWER_COST],
        type: FILTER_TYPE.LOWER_COST
      },
      {
        id: FILTER_TYPE.FASTER,
        selected: false,
        label: TAB_BAR_FILTER_TYPE_PRESENTATION[FILTER_TYPE.FASTER],
        type: FILTER_TYPE.FASTER
      }
    ],
    tickets: Ticket,
    result: [...Ticket]
  }
})

