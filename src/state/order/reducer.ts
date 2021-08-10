import { OrderStateDefault } from './default';
import { OrderAction, OrderActionTypes, OrderState } from './types';

export const OrderReducer = (
    state = OrderStateDefault,
    action: OrderAction
): OrderState => {
    switch (action.type) {
        case OrderActionTypes.ORDER_RECORD: {
            return {
                ...state,
                data: action.payload
                    ? [...action.payload.map((item) => ({ ...item }))]
                    : null,
            };
        }
        case OrderActionTypes.ORDER_COUNT: {
            return {
                ...state,
                count: action.payload,
            };
        }
        default:
            return state;
    }
};
