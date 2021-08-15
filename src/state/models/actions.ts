import { History } from 'history';
import { Dispatch } from 'redux';

import { ROUTES } from '@constants/routes';
import { getCars } from '@services/car';
import {
    LoadingEndAction,
    LoadingStartAction,
    ModalShowAction,
} from '@state/global/actions';

import { GetModels, Model, ModelsActionTypes } from './types';

export const GetModelsSuccessAction = (models: Model[]): GetModels => ({
    type: ModelsActionTypes.GET_MODELS_SUCCESS,
    payload: models,
});

export const GetModelsAction =
    (history: History) => (dispatch: Dispatch<any>) => {
        dispatch(LoadingStartAction('Загрузка моделей ...'));
        getCars()
            .then((models) => {
                dispatch(GetModelsSuccessAction(models.data));
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
                dispatch(LoadingEndAction('Загрузка моделей ...'));
            });
    };
