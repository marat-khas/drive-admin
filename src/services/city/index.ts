import { CITY_URL } from '@constants/urls';
import { baseApi } from '@services/base';
import { City } from '@state/cities/types';

import { GetCitiesResponse } from './types';

export const getCities = (): Promise<City[]> =>
    baseApi
        .request({
            url: CITY_URL,
        })
        .then((response: GetCitiesResponse) => response.data.data);
