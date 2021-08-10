import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { carsReducer } from '@state/cars/reducer';
import { citiesReducer } from '@state/cities/reducer';
import { FilterReducer } from '@state/filter/reducer';
import { GlobalReducer } from '@state/global/reducer';
import { OrderReducer } from '@state/order/reducer';
import { RootState } from '@state/types';
import { UserReducer } from '@state/user/reducer';

const rootReducer = combineReducers<RootState>({
    global: GlobalReducer,
    cars: carsReducer,
    cities: citiesReducer,
    user: UserReducer,
    order: OrderReducer,
    filter: FilterReducer,
});

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);
