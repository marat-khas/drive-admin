export interface OrdersFilterState {
    limit: number;
    page: number;
    dateFrom: number | null;
    dateTo: number | null;
    carId: string | null;
    cityId: string | null;
    categoryId: string | null;
    orderStatusId: string | null;
}

export interface CarsFilterState {
    limit: number;
    page: number;
    categoryId: string | null;
}

export interface PointsFilterState {
    limit: number;
    page: number;
    cityId: string | null;
}

export interface FilterState {
    orders: OrdersFilterState;
    cars: CarsFilterState;
    points: PointsFilterState;
}

export enum FilterActionTypes {
    ORDERS_FILTER_UPDATE = 'ORDERS_FILTER_UPDATE',
    CARS_FILTER_UPDATE = 'CARS_FILTER_UPDATE',
    POINTS_FILTER_UPDATE = 'POINTS_FILTER_UPDATE',
}

export interface OrdersFilterUpdate {
    type: FilterActionTypes.ORDERS_FILTER_UPDATE;
    payload: Record<keyof OrdersFilterState, any>;
}

export interface CarsFilterUpdate {
    type: FilterActionTypes.CARS_FILTER_UPDATE;
    payload: Record<keyof CarsFilterState, any>;
}

export interface PointsFilterUpdate {
    type: FilterActionTypes.POINTS_FILTER_UPDATE;
    payload: Record<keyof PointsFilterState, any>;
}

export type FilterAction =
    | OrdersFilterUpdate
    | CarsFilterUpdate
    | PointsFilterUpdate;
