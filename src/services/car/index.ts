import { CAR_URL } from '@constants/urls';
import { baseApi } from '@services/base';
import { Car } from '@state/cars/types';

import { GetCarResponse, GetCarsResponse } from './types';

export const getCars = (filter?: string): Promise<GetCarsResponse> => {
    const URL = filter ? `${CAR_URL}/?${filter}` : CAR_URL;
    return baseApi
        .request({
            url: URL,
        })
        .then((response) => response.data);
};

export const getCar = (id: string): Promise<Car> =>
    baseApi
        .request({
            url: `${CAR_URL}/${id}`,
        })
        .then((response: GetCarResponse) => response.data.data);

export const changeCar = (
    id: string,
    accessToken: string,
    data: Partial<Car>
): Promise<string> =>
    baseApi.put(`${CAR_URL}/${id}`, data, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

export const deleteCar = (id: string, accessToken: string): Promise<string> =>
    baseApi.delete(`${CAR_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
