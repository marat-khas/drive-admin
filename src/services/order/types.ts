import { Order } from '@state/order/types';

export interface OrderRequest {
    access_token: string;
    limit?: number;
    offset?: number;
}

export type OrderResponse = Order[];
