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

export interface CarState {
    car: Car | null;
}

export enum CarActionTypes {
    GET_CAR_SUCCESS = 'GET_CAR_SUCCESS',
}

export interface GetCar {
    type: CarActionTypes.GET_CAR_SUCCESS;
    payload: Car;
}

export type CarAction = GetCar;
