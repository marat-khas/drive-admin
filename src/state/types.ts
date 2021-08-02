import { store } from '@state/store';
import { UserState } from '@state/user/types';

export type AppDispatch = typeof store.dispatch;

export interface RootState {
    user: UserState;
}
