import { History } from 'history';
import { Dispatch } from 'redux';

import { ROUTES } from '@constants/routes';
import { getCars } from '@services/car';
import {
    LoadingEndAction,
    LoadingStartAction,
    ModalShowAction,
} from '@state/global/actions';

import { Car, CarsActionTypes, GetCars } from './types';

export const GetCarsSuccessAction = (cars: Car[]): GetCars => ({
    type: CarsActionTypes.GET_CARS_SUCCESS,
    payload: cars,
});

export const GetCarsAction =
    (history: History) => (dispatch: Dispatch<any>) => {
        dispatch(LoadingStartAction('Загрузка автомобилей ...'));
        getCars()
            .then((data) =>
                data.filter((car) => car.colors && car.colors.length)
            )
            .then((data) => {
                dispatch(GetCarsSuccessAction(data));
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
                dispatch(LoadingEndAction('Загрузка автомобилей ...'));
            });
    };
