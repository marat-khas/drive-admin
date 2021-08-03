import { History } from 'history';
import { Dispatch } from 'redux';

import { ROUTES } from '@constants/routes';
import { oauth, register } from '@services/auth';
import { OauthRequest, RegisterRequest } from '@services/auth/types';
import {
    LoadingEndAction,
    LoadingStartAction,
    ModalShowAction,
} from '@state/global/actions';

import { User, UserActionTypes, UserAuth } from './types';

export const UserAuthAction = (data: User): UserAuth => ({
    type: UserActionTypes.USER_AUTH,
    payload: data,
});

export const UserOauthAction =
    (data: OauthRequest, history: History) => (dispatch: Dispatch<any>) => {
        dispatch(LoadingStartAction('Авторизация ...'));
        oauth(data)
            .then((user) => {
                dispatch(UserAuthAction(user));
                history.push(ROUTES.ADMIN);
                dispatch(
                    ModalShowAction({
                        head: 'Добро пожаловать!',
                        body: 'Авторизация прошла успешно',
                    })
                );
            })
            .catch((error) => {
                dispatch(
                    ModalShowAction({
                        head: 'Ошибка!',
                        body: error,
                    })
                );
            })
            .finally(() => {
                dispatch(LoadingEndAction('Авторизация ...'));
            });
    };

export const UserRegisterAction =
    (data: RegisterRequest, history: History) => (dispatch: Dispatch<any>) => {
        dispatch(LoadingStartAction('Регистрация ...'));
        register(data)
            .then(() => {
                dispatch(UserOauthAction(data, history));
            })
            .catch((error) => {
                dispatch(
                    ModalShowAction({
                        head: 'Ошибка!',
                        body: error,
                    })
                );
            })
            .finally(() => {
                dispatch(LoadingEndAction('Регистрация ...'));
            });
    };
