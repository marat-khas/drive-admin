import { RootState } from './types';

export const getLoading = (state: RootState) => state.global.loading;

export const getModal = (state: RootState) => state.global.modal;

export const getCities = (state: RootState) => state.cities.cities;

export const getCategories = (state: RootState) => state.categories.categories;

export const getUser = (state: RootState) => state.user.data;

export const getOrders = (state: RootState) => state.order.data;
