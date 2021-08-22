import {
    CarsFilterUpdate,
    FilterActionTypes,
    OrdersFilterUpdate,
    PointsFilterUpdate,
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

export const PointsFilterUpdateAction = (
    data: Record<string, any>
): PointsFilterUpdate => ({
    type: FilterActionTypes.POINTS_FILTER_UPDATE,
    payload: data,
});
