import { FilterActionTypes, FilterState, FilterUpdate } from './types';

export const FilterRecordAction = (
    data: Record<keyof FilterState, any>
): FilterUpdate => ({
    type: FilterActionTypes.FILTER_UPDATE,
    payload: data,
});
