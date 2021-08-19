import { POINT_URL } from '@constants/urls';
import { baseApi } from '@services/base';
import { Point } from '@state/points/types';

import { GetPointsResponse } from './types';

export const getPoints = (filter?: string): Promise<GetPointsResponse> =>
    baseApi
        .request({
            url: filter ? `${POINT_URL}/?${filter}` : POINT_URL,
        })
        .then((response) => response.data);

export const changePoint = (
    id: string,
    data: Partial<Point>
): Promise<string> => baseApi.put(`${POINT_URL}/${id}`, data);

export const addPoint = (data: Omit<Point, 'id'>): Promise<string> =>
    baseApi.post(POINT_URL, data);
