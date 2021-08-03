import { RootState } from './types';

export const getLoading = (state: RootState) => state.global.loading;

export const getModal = (state: RootState) => state.global.modal;

export const getUser = (state: RootState) => state.user.data;
