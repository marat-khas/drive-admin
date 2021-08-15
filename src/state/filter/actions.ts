import {
    CarsFilterUpdate,
    FilterActionTypes,
    OrdersFilterUpdate,
} from './types';

export const OrdersFilterUpdateAction = (
    data: Record<string, any>
): OrdersFilterUpdate => ({
    type: FilterActionTypes.ORDERS_FILTER_UPDATE,
    payload: data,
});

export const CarsFilterUpdateAction = (
    data: Record<string, any>
): CarsFilterUpdate => ({
    type: FilterActionTypes.CARS_FILTER_UPDATE,
    payload: data,
});
