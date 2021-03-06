import { History } from 'history';
import { Dispatch } from 'redux';

import { ROUTES } from '@constants/routes';
import { getCities } from '@services/city';
import {
    LoadingEndAction,
    LoadingStartAction,
    ModalShowAction,
} from '@state/global/actions';

import { CitiesActionTypes, City, GetCities } from './types';

export const GetCitiesSuccessAction = (cities: City[]): GetCities => ({
    type: CitiesActionTypes.GET_CITIES_SUCCESS,
    payload: cities,
});

export const GetCitiesAction =
    (history: History) => (dispatch: Dispatch<any>) => {
        const action = 'Загрузка городов';
        dispatch(LoadingStartAction(action));
        getCities()
            .then((data) => {
                dispatch(GetCitiesSuccessAction(data));
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
