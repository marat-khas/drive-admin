import { History } from 'history';
import { Dispatch } from 'redux';

import { ROUTES } from '@constants/routes';
import { getCategories } from '@services/category';
import {
    LoadingEndAction,
    LoadingStartAction,
    ModalShowAction,
} from '@state/global/actions';

import { CategoriesActionTypes, Category, GetCategories } from './types';

export const GetCategoriesSuccessAction = (
    categories: Category[]
): GetCategories => ({
    type: CategoriesActionTypes.GET_CATEGORIES_SUCCESS,
    payload: categories,
});

export const GetCategoriesAction =
    (history: History) => (dispatch: Dispatch<any>) => {
        dispatch(LoadingStartAction('Загрузка категорий ...'));
        getCategories()
            .then((categories) => {
                dispatch(GetCategoriesSuccessAction(categories));
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
                dispatch(LoadingEndAction('Загрузка категорий ...'));
            });
    };
