import { Dispatch } from 'redux';

import { getOrders } from '@services/order';
import { OrderRequest } from '@services/order/types';
import {
    LoadingEndAction,
    LoadingStartAction,
    ModalShowAction,
} from '@state/global/actions';

import { Order, OrderActionTypes, OrderRecord } from './types';

export const OrderRecordAction = (data: Order[] | null): OrderRecord => ({
    type: OrderActionTypes.ORDER_RECORD,
    payload: data
        ? data.filter((order) => order.carId && order.cityId && order.pointId)
        : null,
});

export const OrderGetAction =
    (data: OrderRequest) => (dispatch: Dispatch<any>) => {
        dispatch(LoadingStartAction('Получение заказов ...'));
        getOrders(data)
            .then((orders) => {
                dispatch(OrderRecordAction(orders));
            })
            .catch((error) => {
                dispatch(
                    ModalShowAction({
                        head: 'Ошибка!',
                        body: error,
                    })
                );
            })
            .finally(() => {
                dispatch(LoadingEndAction('Получение заказов ...'));
            });
    };
