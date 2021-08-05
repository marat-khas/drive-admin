import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { GlobalReducer } from '@state/global/reducer';
import { OrderReducer } from '@state/order/reducer';
import { RootState } from '@state/types';
import { UserReducer } from '@state/user/reducer';

const rootReducer = combineReducers<RootState>({
    global: GlobalReducer,
    user: UserReducer,
    order: OrderReducer,
});

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);
