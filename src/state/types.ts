import { CarsState } from '@state/cars/types';
import { CategoriesState } from '@state/categories/types';
import { CitiesState } from '@state/cities/types';
import { FilterState } from '@state/filter/types';
import { GlobalState } from '@state/global/types';
import { OrderState } from '@state/order/types';
import { store } from '@state/store';
import { UserState } from '@state/user/types';

import { CarState } from './car/types';

export type AppDispatch = typeof store.dispatch;

export interface RootState {
    global: GlobalState;
    car: CarState;
    cars: CarsState;
    cities: CitiesState;
    categories: CategoriesState;
    user: UserState;
    order: OrderState;
    filter: FilterState;
}
