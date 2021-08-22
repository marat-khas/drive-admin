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
    CAR_GET = 'CAR_GET',
    CAR_CHANGE = 'CAR_CHANGE',
    CAR_DELETE = 'CAR_DELETE',
}

export interface CarGet {
    type: CarActionTypes.CAR_GET;
    payload: Car;
}

export interface CarChange {
    type: CarActionTypes.CAR_CHANGE;
    payload: {
        id: string;
        data: Partial<Car>;
    };
}

export interface CarDelete {
    type: CarActionTypes.CAR_DELETE;
    payload: string;
}

export type CarAction = CarGet | CarChange | CarDelete;
