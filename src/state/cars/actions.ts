import { History } from 'history';
import { Dispatch } from 'redux';

import { ROUTES } from '@constants/routes';
import { getCars } from '@services/car';
import {
    LoadingEndAction,
    LoadingStartAction,
    ModalShowAction,
} from '@state/global/actions';

import { Car, CarsActionTypes, CarsCount, GetCars } from './types';

export const GetCarsSuccessAction = (cars: Car[] | null): GetCars => ({
    type: CarsActionTypes.CAR_GETS_SUCCESS,
    payload: cars,
});

export const CarsCountAction = (data: number): CarsCount => ({
    type: CarsActionTypes.CARS_COUNT,
    payload: data,
});

export const GetCarsAction =
    (history: History, filter?: string) => (dispatch: Dispatch<any>) => {
        const action = 'Загрузка автомобилей';
        dispatch(LoadingStartAction(action));
        getCars(filter)
            .then((cars) => {
                dispatch(GetCarsSuccessAction(cars.data));
                dispatch(CarsCountAction(cars.count));
            })
            .catch((error) => {
                history.push(ROUTES.ERROR);
                dispatch(
                    ModalShowAction({
                        head: 'Ошибка!',
                        body: error.response.data,
                    })
                );
            })
            .finally(() => {
                dispatch(LoadingEndAction(action));
            });
    };
