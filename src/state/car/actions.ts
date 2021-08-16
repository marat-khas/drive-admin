import { History } from 'history';
import { Dispatch } from 'redux';

import { ROUTES } from '@constants/routes';
import { changeCar, deleteCar, getCar } from '@services/car';
import { GetCarsSuccessAction } from '@state/cars/actions';
import {
    LoadingEndAction,
    LoadingStartAction,
    ModalShowAction,
} from '@state/global/actions';

import { Car, CarActionTypes, CarChange, CarGet } from './types';

export const GetCarSuccessAction = (car: Car): CarGet => ({
    type: CarActionTypes.CAR_GET,
    payload: car,
});

export const CarGetAction =
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

export const CarChangeSuccessAction = (car: {
    id: string;
    data: Partial<Car>;
}): CarChange => ({
    type: CarActionTypes.CAR_CHANGE,
    payload: car,
});

export const CarChangeAction =
    ({
        id,
        accessToken,
        data,
    }: {
        id: string;
        accessToken: string;
        data: Partial<Car>;
    }) =>
    (dispatch: Dispatch<any>) => {
        const action = 'Обновление данных авто';
        dispatch(LoadingStartAction(action));
        changeCar(id, accessToken, data)
            .then(() => {
                dispatch(CarChangeSuccessAction({ id, data }));
                dispatch(
                    ModalShowAction({
                        head: 'Готово!',
                        body: 'Данные автомобиля успешно обновлены',
                    })
                );
            })
            .catch((error) => {
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

export const CarDeleteSuccessAction = (id: string) => ({
    type: CarActionTypes.CAR_DELETE,
    payload: id,
});

export const CarDeleteAction =
    (id: string, accessToken: string, history: History) =>
    (dispatch: Dispatch<any>) => {
        const action = 'Удаление авто';
        dispatch(LoadingStartAction(action));
        deleteCar(id, accessToken)
            .then(() => {
                dispatch(CarDeleteSuccessAction(id));
                dispatch(GetCarsSuccessAction(null));
                history.push(ROUTES.CARS);
            })
            .catch((error) => {
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
