import { POINT_URL } from '@constants/urls';
import { baseApi } from '@services/base';

import { GetPointsResponse } from './types';

export const getPoints = (filter?: string): Promise<GetPointsResponse> =>
    baseApi
        .request({
            url: filter ? `${POINT_URL}/?${filter}` : POINT_URL,
        })
        .then((response) => response.data);
