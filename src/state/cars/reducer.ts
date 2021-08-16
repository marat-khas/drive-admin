import { imgSrc } from '@utils/img-src';

import { CarsStateDefault } from './default';
import { CarsAction, CarsActionTypes, CarsState } from './types';

export const carsReducer = (
    state = CarsStateDefault,
    action: CarsAction
): CarsState => {
    switch (action.type) {
        case CarsActionTypes.GET_CARS_SUCCESS: {
            return {
                ...state,
                data: action.payload.map((car) => {
                    const { path } = car.thumbnail;
                    return { ...car, thumbnail: { path: imgSrc(path) } };
                }),
            };
        }
        case CarsActionTypes.CARS_COUNT: {
            return {
                ...state,
                count: action.payload,
            };
        }
        default:
            return state;
    }
};
