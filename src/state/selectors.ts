import { RootState } from './types';

export const getLoading = (state: RootState) => state.global.loading;

export const getModal = (state: RootState) => state.global.modal;

export const getCities = (state: RootState) => state.cities.cities;

export const getPoints = (state: RootState) => state.points.data;

export const getPointsCount = (state: RootState) => state.points.count;

export const getPointsFilter = (state: RootState) => state.filter.points;

export const getCar = (state: RootState) => state.car.car;

export const getCars = (state: RootState) => state.cars.data;

export const getCarsCount = (state: RootState) => state.cars.count;

export const getCarsFilter = (state: RootState) => state.filter.cars;

export const getModels = (state: RootState) => state.models.data;

export const getUser = (state: RootState) => state.user.data;

export const getOrders = (state: RootState) => state.order.data;

export const getOrdersCount = (state: RootState) => state.order.count;

export const getOrdersFilter = (state: RootState) => state.filter.orders;

export const getCategories = (state: RootState) => state.categories.categories;
