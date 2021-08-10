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
    cars: Car[] | null;
}

export enum CarsActionTypes {
    GET_CARS_SUCCESS = 'GET_CARS_SUCCESS',
}

export interface GetCars {
    type: CarsActionTypes.GET_CARS_SUCCESS;
    payload: Car[];
}

export type CarsAction = GetCars;
