import { RootState } from './types';

export const getLoading = (state: RootState) => state.global.loading;

export const getModal = (state: RootState) => state.global.modal;

export const getAuthStatus = (state: RootState) => state.user.auth;

export const getOrders = (state: RootState) => state.order.data;
