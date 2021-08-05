import { Order } from '@state/order/types';

export interface OrderRequest {
    access_token: string;
    limit?: number;
}

export type OrderResponse = Order[];
