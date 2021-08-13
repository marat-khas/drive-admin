import { History } from 'history';
import { Dispatch } from 'redux';

import { ROUTES } from '@constants/routes';
import { changeOrder, getOrders } from '@services/order';
import { OrderRequest } from '@services/order/types';
import {
    LoadingEndAction,
    LoadingStartAction,
    ModalShowAction,
} from '@state/global/actions';

import {
    Order,
    OrderActionTypes,
    OrderChange,
    OrderCount,
    OrderRecord,
} from './types';

export const OrderRecordAction = (data: Order[] | null): OrderRecord => ({
    type: OrderActionTypes.ORDER_RECORD,
    payload: data || null,
});

export const OrderCountAction = (data: number): OrderCount => ({
    type: OrderActionTypes.ORDER_COUNT,
    payload: data,
});

export const OrderChangeSuccessAction = (order: {
    id: string;
    data: Partial<Order>;
}): OrderChange => ({
    type: OrderActionTypes.ORDER_CHANGE,
    payload: order,
});

export const OrderChangeAction =
    ({ id, data }: { id: string; data: Partial<Order> }) =>
    (dispatch: Dispatch<any>) => {
        dispatch(LoadingStartAction('Обновление заказа ...'));
        changeOrder(id, data)
            .then(() => {
                dispatch(OrderChangeSuccessAction({ id, data }));
            })
            .catch((error) => {
                dispatch(
                    ModalShowAction({
                        head: 'Ошибка!',
                        body: error.response.data,
                    })
                );
            })
            .finally(() => {
                dispatch(LoadingEndAction('Обновление заказа ...'));
            });
    };

export const OrderGetAction =
    (data: OrderRequest, history: History) => (dispatch: Dispatch<any>) => {
        dispatch(LoadingStartAction('Получение заказов ...'));
        getOrders(data)
            .then((orders) => {
                dispatch(OrderRecordAction(orders.data));
                dispatch(OrderCountAction(orders.count));
            })
            .catch((error) => {
                history.push(ROUTES.ERROR);
                dispatch(
                    ModalShowAction({
                        head: 'Ошибка!',
                        body: error.response.data,
                    })
                );
            })
            .finally(() => {
                dispatch(LoadingEndAction('Получение заказов ...'));
            });
    };
