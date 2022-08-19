import { types } from "mobx-state-tree";
import { FILTER_TYPE } from "../constants/filter";

export const TimeModelModel = types
  .model({
    hours: types.number,
    minutes: types.number,
  });


export const ArrivedModel = types
  .model({
    label: types.string,
    time: types.string,
  });

export const AmountModel = types
  .model({
    amount: types.number,
    currency: types.string,
  });

export const InfoModel = types
  .model({
    from: ArrivedModel,
    to: ArrivedModel,
    transitTime: TimeModelModel,
    transfers: types.array(types.string)
  });

export const FilterModel = types
  .model({
    id: types.string || types.number,
    label: types.string,
    selected: types.boolean,
    type: types.enumeration<FILTER_TYPE>('ALL', Object.values(FILTER_TYPE))
  });

export const FiltersModel = types
  .model({
    filters: types.map(FilterModel)
  });

export const TicketModel = types
  .model('TicketModel', {
    id: types.string,
    vendor: types.string,
    amount: AmountModel,
    infos: types.array(InfoModel)
  });