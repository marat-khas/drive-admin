import { CarStateDefault } from './default';
import { CarAction, CarActionTypes, CarState } from './types';

export const carReducer = (
    state = CarStateDefault,
    action: CarAction
): CarState => {
    switch (action.type) {
        case CarActionTypes.GET_CAR_SUCCESS: {
            return {
                ...state,
                car: { ...action.payload },
            };
        }
        default:
            return state;
    }
};
