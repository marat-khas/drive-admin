import { GlobalState } from '@state/global/types';
import { OrderState } from '@state/order/types';
import { store } from '@state/store';
import { UserState } from '@state/user/types';

export type AppDispatch = typeof store.dispatch;

export interface RootState {
    global: GlobalState;
    user: UserState;
    order: OrderState;
}
