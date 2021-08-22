import { CarAction, CarActionTypes } from '@state/car/types';
import { imageSrc } from '@utils/image-src';

import { CarsStateDefault } from './default';
import { CarsAction, CarsActionTypes, CarsState } from './types';

export const carsReducer = (
    state = CarsStateDefault,
    action: CarsAction | CarAction
): CarsState => {
    switch (action.type) {
        case CarsActionTypes.CAR_GETS_SUCCESS: {
            return {
                ...state,
                data: action.payload
                    ? action.payload.map((car) => {
                          const { path } = car.thumbnail;
                          return {
                              ...car,
                              thumbnail: { path: imageSrc(path) },
                          };
                      })
                    : null,
            };
        }
        case CarsActionTypes.CARS_COUNT: {
            return {
                ...state,
                count: action.payload,
            };
        }
        case CarActionTypes.CAR_CHANGE: {
            return {
                ...state,
                data: state.data
                    ? state.data?.map((car) => {
                          if (car.id === action.payload.id) {
                              car = {
                                  ...car,
                                  ...action.payload.data,
                              };
                          }
                          return car;
                      })
                    : null,
            };
        }
        default:
            return state;
    }
};
