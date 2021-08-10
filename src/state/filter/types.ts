export interface FilterState {
    limit: number;
    page: number;
    dateFrom: number | null;
    dateTo: number | null;
    car: string | null;
    city: string | null;
}

export enum FilterActionTypes {
    FILTER_UPDATE = 'FILTER_UPDATE',
}

export interface FilterUpdate {
    type: FilterActionTypes.FILTER_UPDATE;
    payload: Record<keyof FilterState, any>;
}

export type FilterAction = FilterUpdate;
