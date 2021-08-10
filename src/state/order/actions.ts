import { History } from 'history';
import { Dispatch } from 'redux';

import { ROUTES } from '@constants/routes';
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
    payload: data || null, // .filter((order) => order.carId && order.cityId)
});

export const OrderGetAction =
    (data: OrderRequest, history: History) => (dispatch: Dispatch<any>) => {
        dispatch(LoadingStartAction('Получение заказов ...'));
        getOrders(data)
            .then((orders) => {
                dispatch(OrderRecordAction(orders));
            })
            .catch((error) => {
                history.push(ROUTES.ERROR);
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
