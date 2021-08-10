import { Car } from '@state/cars/types';

export interface GetCarsResponse {
    data: {
        data: Car[];
    };
}
