import { CAR_URL } from '@constants/urls';
import { baseApi } from '@services/base';
import { Car } from '@state/cars/types';

import { GetCarsResponse } from './types';

export const getCars = (): Promise<Car[]> =>
    baseApi
        .request({
            url: CAR_URL,
        })
        .then((response: GetCarsResponse) => response.data.data);
