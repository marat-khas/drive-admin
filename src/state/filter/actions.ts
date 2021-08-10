import { FilterActionTypes, FilterUpdate } from './types';

export const FilterUpdateAction = (
    data: Record<string, any>
): FilterUpdate => ({
    type: FilterActionTypes.FILTER_UPDATE,
    payload: data,
});
