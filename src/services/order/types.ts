import { Order } from '@state/order/types';

export interface OrderRequest {
    access_token: string;
    filter?: string | null;
}

export type OrderResponse = {
    count: number;
    data: Order[];
};
