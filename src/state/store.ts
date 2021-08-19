import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { carReducer } from '@state/car/reducer';
import { carsReducer } from '@state/cars/reducer';
import { categoriesReducer } from '@state/categories/reducer';
import { citiesReducer } from '@state/cities/reducer';
import { FilterReducer } from '@state/filter/reducer';
import { GlobalReducer } from '@state/global/reducer';
import { modelsReducer } from '@state/models/reducer';
import { OrderReducer } from '@state/order/reducer';
import { pointsReducer } from '@state/points/reducer';
import { RootState } from '@state/types';
import { UserReducer } from '@state/user/reducer';

const rootReducer = combineReducers<RootState>({
    global: GlobalReducer,
    car: carReducer,
    cars: carsReducer,
    models: modelsReducer,
    cities: citiesReducer,
    points: pointsReducer,
    categories: categoriesReducer,
    user: UserReducer,
    order: OrderReducer,
    filter: FilterReducer,
});

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);
