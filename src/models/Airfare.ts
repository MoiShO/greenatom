import { types, cast, castToReferenceSnapshot } from "mobx-state-tree";
import { FILTER_TYPE } from "../constants/filter";
import { FilterModel, TicketModel } from "./Ticket";
import { ITicket } from '../components/Ticket/Ticket';

const filterByTransfers = (tickets: ITicket[], length: number) => tickets.filter((ticket) => ticket.infos.filter((info) => info.transfers?.length === length));
const hourMinutesToHours = (h: number, m: number) => h + (m / 60);

const filterCallback = {
  [FILTER_TYPE.ALL]: () => null,
  [FILTER_TYPE.NO_TRANSFERS]: ((tickets: ITicket[]) => filterByTransfers(tickets, 0)),
  [FILTER_TYPE.ONE_TRANSFERS]: ((tickets: ITicket[]) => filterByTransfers(tickets, 1)),
  [FILTER_TYPE.TWO_TRANSFERS]: ((tickets: ITicket[]) => filterByTransfers(tickets, 2)),
  [FILTER_TYPE.THREE_TRANSFERS]: ((tickets: ITicket[]) => filterByTransfers(tickets, 3)),
  [FILTER_TYPE.LOWER_COST]: (tickets: ITicket[]) => {
    const min = Math.min(...tickets.map(ticket => ticket.amount.amount));
    return tickets.filter(ticket => ticket.amount.amount === min);
  },
  [FILTER_TYPE.FASTER]: (tickets: ITicket[]) => {
    const min = Math.min(...tickets.flatMap(ticket => ticket.infos.map((info) => hourMinutesToHours(info.transitTime.hours, info.transitTime.minutes))));
    return tickets.filter(ticket => ticket.infos.filter((info) => hourMinutesToHours(info.transitTime.hours, info.transitTime.minutes) === min));
  },
}

export const AirfareModel = types
  .model({
    filters: types.array(FilterModel),
    tickets: types.optional(types.array(TicketModel), []),
    result: types.optional(types.array(TicketModel), []),
    tabBar: types.array(FilterModel),
  })
  .actions((self) => ({
    applyFilter(): void {
      const filters: FILTER_TYPE[] = self.filters.reduce((acc: FILTER_TYPE[], filter) => {
        if (filter.selected) {
          acc.push(filter.type);
        }

        return acc;
      }, []);

      const tabBar: FILTER_TYPE[] = self.tabBar.reduce((acc: FILTER_TYPE[], filter) => {
        if (filter.selected) {
          acc.push(filter.type);
        }

        return acc;
      }, []);

      this.filterCombine([...filters, ...tabBar])
    },
    toggleFilter(type: FILTER_TYPE): void {
      const filter = self.filters.find((filter) => filter.type === type);

      if (filter) {
        if (filter.type === FILTER_TYPE.ALL) {
          self.filters.forEach(filter => filter.selected = false);
        } else {
          const filterAll = self.filters.find((filter) => filter.type === FILTER_TYPE.ALL);
          if (filterAll) {
            filterAll.selected = false;
          }
        }

        filter.selected = !filter.selected;
        this.applyFilter();
      } else {
        throw Error(`Фильтр: ${type} не найден`)
      }
    },
    toggleTabBar(type: FILTER_TYPE): void {
      const tabBar = self.tabBar.find((filter) => filter.type === type);

      if (tabBar) {
        tabBar.selected = !tabBar.selected;
        this.applyFilter();
      } else {
        throw Error(`Фильтр: ${type} не найден`)
      }
    },
    filterCombine(filters: FILTER_TYPE[]): void {
      if (filters.includes(FILTER_TYPE.ALL)) {
        self.result = cast([...self.tickets]);
      }

      let prevResult = self.result;
      filters.forEach(filter => {
        self.result = filterCallback[filter](self.result);
      });
      console.log(self.result, prevResult)
    }
  }));
