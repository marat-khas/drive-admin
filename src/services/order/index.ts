import { ORDER_URL } from '@constants/urls';
import { baseApi } from '@services/base';

import { OrderRequest, OrderResponse } from './types';

const ORDER_LIMIT_DEFAULT = 100;
const ORDER_OFFSET_DEFAULT = 2500;

export const getOrders = ({
    access_token,
    limit = ORDER_LIMIT_DEFAULT,
    offset = ORDER_OFFSET_DEFAULT,
}: OrderRequest): Promise<OrderResponse> =>
    baseApi
        .get(`${ORDER_URL}/?limit=${limit}&offset=${offset}`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        })
        .then((response) => response.data.data);
