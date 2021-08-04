import { Dispatch } from 'redux';

import { logout, oauth, refresh, register } from '@services/auth';
import {
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

import { User, UserActionTypes, UserAuth } from './types';

export const UserAuthAction = (data: User | null): UserAuth => ({
    type: UserActionTypes.USER_AUTH,
    payload: data,
});

export const UserOauthAction =
    (data: OauthRequest) => (dispatch: Dispatch<any>) => {
        dispatch(LoadingStartAction('Авторизация ...'));
        oauth(data)
            .then((user) => {
                localStorage.setItem('refresh_token', user.refresh_token);
                dispatch(UserAuthAction(user));
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
            .then((user) => {
                localStorage.setItem('refresh_token', user.refresh_token);
                dispatch(UserAuthAction(user));
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
        localStorage.removeItem('refresh_token');
        logout(data)
            .then(() => {
                dispatch(UserAuthAction(null));
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
