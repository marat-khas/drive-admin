import { CarsState } from '@state/cars/types';
import { CitiesState } from '@state/cities/types';
import { FilterState } from '@state/filter/types';
import { GlobalState } from '@state/global/types';
import { OrderState } from '@state/order/types';
import { store } from '@state/store';
import { UserState } from '@state/user/types';

export type AppDispatch = typeof store.dispatch;

export interface RootState {
    global: GlobalState;
    cars: CarsState;
    cities: CitiesState;
    user: UserState;
    order: OrderState;
    filter: FilterState;
}
