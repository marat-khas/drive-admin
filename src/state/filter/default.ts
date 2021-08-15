import { FilterState } from './types';

export const FilterStateDefault: FilterState = {
    orders: {
        limit: 10,
        page: 0,
        dateFrom: null,
        dateTo: null,
        carId: null,
        cityId: null,
        categoryId: null,
        orderStatusId: null,
    },
    cars: {
        limit: 10,
        page: 0,
    },
};
