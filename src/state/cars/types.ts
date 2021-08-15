export interface Car {
    id: string;
    name: string;
    categoryId: {
        name: string;
        description: string;
        id: string;
    };
    priceMax: number;
    priceMin: number;
    thumbnail: {
        path: string;
    };
    colors: string[];
    number?: string;
    description?: string;
    tank?: number;
}

export interface CarsState {
    data: Car[] | null;
    count: number;
}

export enum CarsActionTypes {
    GET_CARS_SUCCESS = 'GET_CARS_SUCCESS',
    CARS_COUNT = 'CARS_COUNT',
}

export interface GetCars {
    type: CarsActionTypes.GET_CARS_SUCCESS;
    payload: Car[];
}

export interface CarsCount {
    type: CarsActionTypes.CARS_COUNT;
    payload: number;
}

export type CarsAction = GetCars | CarsCount;
