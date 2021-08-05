import { Dispatch } from 'redux';

import { check, logout, oauth, refresh, register } from '@services/auth';
import {
    CheckRequest,
    LogoutRequest,
    OauthRequest,
    RefreshRequest,
    RegisterRequest,
} from '@services/auth/types';
import {
    LoadingEndAction,
    LoadingStartAction,
    ModalShowAction,
} from '@state/global/actions';
import { OrderRecordAction } from '@state/order/actions';

import { UserActionTypes, UserAuth } from './types';

export const UserAuthAction = (data: boolean): UserAuth => ({
    type: UserActionTypes.USER_AUTH,
    payload: data,
});

export const UserOauthAction =
    (data: OauthRequest) => (dispatch: Dispatch<any>) => {
        dispatch(LoadingStartAction('Авторизация ...'));
        oauth(data)
            .then((user) => {
                localStorage.setItem('access_token', user.access_token);
                localStorage.setItem('refresh_token', user.refresh_token);
                dispatch(UserAuthAction(true));
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
                        body: error.response.data,
                    })
                );
            })
            .finally(() => {
                dispatch(LoadingEndAction('Авторизация ...'));
            });
    };

export const UserRegisterAction =
    (data: RegisterRequest) => (dispatch: Dispatch<any>) => {
        dispatch(LoadingStartAction('Регистрация ...'));
        register(data)
            .then(() => {
                dispatch(UserOauthAction(data));
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
                dispatch(LoadingEndAction('Регистрация ...'));
            });
    };

export const UserCheckAction =
    (data: CheckRequest) => (dispatch: Dispatch<any>) => {
        dispatch(LoadingStartAction('Проверка пользователя ...'));
        check(data)
            .then(() => {
                dispatch(UserAuthAction(true));
            })
            .catch((error) => {
                dispatch(UserAuthAction(false));
                dispatch(
                    ModalShowAction({
                        head: 'Ошибка!',
                        body: error.response.data,
                    })
                );
            })
            .finally(() => {
                dispatch(LoadingEndAction('Проверка пользователя ...'));
            });
    };

export const UserRefreshAction =
    (data: RefreshRequest) => (dispatch: Dispatch<any>) => {
        dispatch(LoadingStartAction('Обновление данных ...'));
        refresh(data)
            .then((user) => {
                localStorage.setItem('access_token', user.access_token);
                dispatch(UserAuthAction(true));
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
                dispatch(LoadingEndAction('Обновление данных ...'));
            });
    };

export const UserLogoutAction =
    (data: LogoutRequest) => (dispatch: Dispatch<any>) => {
        dispatch(LoadingStartAction('Выход из учетной записи ...'));
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        logout(data)
            .then(() => {
                dispatch(UserAuthAction(false));
                dispatch(OrderRecordAction(null));
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
                dispatch(LoadingEndAction('Выход из учетной записи ...'));
            });
    };
