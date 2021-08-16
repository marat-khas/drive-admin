import { ORDER_URL } from '@constants/urls';
import { baseApi } from '@services/base';
import { Order } from '@state/order/types';

import { OrderRequest, OrderResponse } from './types';

export const getOrders = ({
    access_token,
    filter,
}: OrderRequest): Promise<OrderResponse> => {
    const URL = filter ? `${ORDER_URL}/?${filter}` : ORDER_URL;
    return baseApi
        .get(URL, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        })
        .then((response) => response.data);
};

export const changeOrder = (
    id: string,
    data: Partial<Order>
): Promise<string> => baseApi.put(`${ORDER_URL}/${id}`, data);
