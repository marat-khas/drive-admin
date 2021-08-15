import { History } from 'history';
import { Dispatch } from 'redux';

import { ROUTES } from '@constants/routes';
import { getCar } from '@services/car';
import {
    LoadingEndAction,
    LoadingStartAction,
    ModalShowAction,
} from '@state/global/actions';

import { Car, CarActionTypes, GetCar } from './types';

export const GetCarSuccessAction = (car: Car): GetCar => ({
    type: CarActionTypes.GET_CAR_SUCCESS,
    payload: car,
});

export const GetCarAction =
    (id: string, history: History) => (dispatch: Dispatch<any>) => {
        const action = 'Загрузка данных авто';
        dispatch(LoadingStartAction(action));
        getCar(id)
            .then((data) => {
                dispatch(GetCarSuccessAction(data));
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
