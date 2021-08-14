import Cookies from 'js-cookie';
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

import { User, UserActionTypes, UserAuth } from './types';

export const UserAuthAction = (
    data: Omit<User, 'password'> | null
): UserAuth => ({
    type: UserActionTypes.USER_AUTH,
    payload: data,
});

export const UserCheckAction =
    (data: CheckRequest) => (dispatch: Dispatch<any>) => {
        dispatch(LoadingStartAction('Проверка пользователя ...'));
        check(data)
            .then((user) => {
                dispatch(UserAuthAction(user));
            })
            .catch((error) => {
                Cookies.remove('access_token');
                dispatch(UserAuthAction(null));
                console.error(error);
            })
            .finally(() => {
                dispatch(LoadingEndAction('Проверка пользователя ...'));
            });
    };

export const UserOauthAction =
    (data: OauthRequest) => (dispatch: Dispatch<any>) => {
        dispatch(LoadingStartAction('Авторизация ...'));
        oauth(data)
            .then((access) => {
                Cookies.set('access_token', access.access_token);
                Cookies.set('refresh_token', access.refresh_token);
                dispatch(UserCheckAction(access));
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

export const UserRefreshAction =
    (data: RefreshRequest) => (dispatch: Dispatch<any>) => {
        dispatch(LoadingStartAction('Обновление данных ...'));
        refresh(data)
            .then((access) => {
                Cookies.set('access_token', access.access_token);
                dispatch(UserCheckAction(access));
            })
            .catch((error) => {
                Cookies.remove('refresh_token');
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
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        logout(data)
            .then(() => {
                dispatch(UserAuthAction(null));
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
