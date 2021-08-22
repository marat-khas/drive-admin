import { CAR_URL } from '@constants/urls';
import { baseApi } from '@services/base';
import { Car } from '@state/cars/types';
import { Category } from '@state/categories/types';

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

const carData = (
    data: Partial<Omit<Car, 'id' | 'thumbnail'> & { thumbnail?: File }>
) =>
    Object.entries(data).reduce((acc, [key, value]) => {
        switch (key) {
            case 'categoryId':
                acc.append(key, (value as Category).id);
                break;
            case 'colors':
                (value as string[]).forEach((color) => {
                    acc.append(key, color);
                });
                break;
            case 'thumbnail':
                acc.append(key, value as File);
                break;
            default:
                acc.append(key, value.toString());
                break;
        }
        return acc;
    }, new FormData());

export const changeCar = (
    id: string,
    accessToken: string,
    data: Partial<Omit<Car, 'id' | 'thumbnail'> & { thumbnail?: File }>
): Promise<string> =>
    baseApi.put(`${CAR_URL}/${id}`, carData(data), {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
        },
    });

export const deleteCar = (id: string, accessToken: string): Promise<string> =>
    baseApi.delete(`${CAR_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

export const addCar = (
    data: Omit<Car, 'id' | 'thumbnail'> & { thumbnail?: File },
    accessToken: string
): Promise<string> =>
    baseApi.post(CAR_URL, carData(data), {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
