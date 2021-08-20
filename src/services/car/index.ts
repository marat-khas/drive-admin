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

export const changeCar = (
    id: string,
    accessToken: string,
    data: Partial<Omit<Car, 'thumbnail'>> & { thumbnail?: File }
): Promise<string> => {
    const formData = Object.entries(data).reduce((acc, [key, value]) => {
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
                acc.append(key, JSON.stringify(value));
                break;
        }
        return acc;
    }, new FormData());
    return baseApi.put(`${CAR_URL}/${id}`, formData, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const deleteCar = (id: string, accessToken: string): Promise<string> =>
    baseApi.delete(`${CAR_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
