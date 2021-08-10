import { ORDER_URL } from '@constants/urls';
import { baseApi } from '@services/base';

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
