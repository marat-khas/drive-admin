import { History } from 'history';
import { Dispatch } from 'redux';

import { ROUTES } from '@constants/routes';
import { addPoint, changePoint, getPoints } from '@services/point';
import {
    LoadingEndAction,
    LoadingStartAction,
    ModalShowAction,
} from '@state/global/actions';

import {
    ChangePoints,
    CountPoints,
    GetPoints,
    Point,
    PointsActionTypes,
} from './types';

export const GetPointsSuccessAction = (points: Point[]): GetPoints => ({
    type: PointsActionTypes.GET_POINTS_SUCCESS,
    payload: points,
});

export const PointsCountAction = (data: number): CountPoints => ({
    type: PointsActionTypes.POINTS_COUNT,
    payload: data,
});

export const PointsGetAction =
    (history: History, filter?: string) => (dispatch: Dispatch<any>) => {
        const action = 'Загрузка пунктов выдачи';
        dispatch(LoadingStartAction(action));
        getPoints(filter)
            .then((points) => {
                dispatch(GetPointsSuccessAction(points.data));
                dispatch(PointsCountAction(points.count));
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

export const PointChangeSuccessAction = (point: {
    id: string;
    data: Partial<Point>;
}): ChangePoints => ({
    type: PointsActionTypes.POINTS_CHANGE,
    payload: point,
});

export const PointChangeAction =
    ({ id, data }: { id: string; data: Partial<Point> }) =>
    (dispatch: Dispatch<any>) => {
        const action = 'Обновление заказа';
        dispatch(LoadingStartAction(action));
        changePoint(id, data)
            .then(() => {
                dispatch(PointChangeSuccessAction({ id, data }));
                dispatch(
                    ModalShowAction({
                        head: 'Готово!',
                        body: 'Пункт выдачи успешно обновлен',
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

export const PointAddAction =
    (data: Omit<Point, 'id'>) => (dispatch: Dispatch<any>) => {
        const action = 'Отправка данных';
        dispatch(LoadingStartAction(action));
        addPoint(data)
            .then(() => {
                dispatch(
                    ModalShowAction({
                        head: 'Готово!',
                        body: 'Пункт выдачи успешно добавлен',
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
