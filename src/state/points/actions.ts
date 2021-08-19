import { History } from 'history';
import { Dispatch } from 'redux';

import { ROUTES } from '@constants/routes';
import { getPoints } from '@services/point';
import {
    LoadingEndAction,
    LoadingStartAction,
    ModalShowAction,
} from '@state/global/actions';

import { CountPoints, GetPoints, Point, PointsActionTypes } from './types';

export const GetPointsSuccessAction = (points: Point[]): GetPoints => ({
    type: PointsActionTypes.GET_POINTS_SUCCESS,
    payload: points,
});

export const PointsCountAction = (data: number): CountPoints => ({
    type: PointsActionTypes.POINTS_COUNT,
    payload: data,
});

export const GetPointsAction =
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
                        body: error,
                    })
                );
            })
            .finally(() => {
                dispatch(LoadingEndAction(action));
            });
    };
