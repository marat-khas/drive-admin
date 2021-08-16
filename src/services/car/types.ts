import { Car } from '@state/cars/types';

export interface GetCarsResponse {
    count: number;
    data: Car[];
}

export interface GetCarResponse {
    data: {
        data: Car;
    };
}
