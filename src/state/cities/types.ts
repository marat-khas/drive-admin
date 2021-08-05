export interface City {
    id: string;
    name: string;
}

export interface CitiesState {
    cities: City[] | null;
}

export enum CitiesActionTypes {
    GET_CITIES_SUCCESS = 'GET_CITIES_SUCCESS',
}

export interface GetCities {
    type: CitiesActionTypes.GET_CITIES_SUCCESS;
    payload: City[];
}

export type CitiesAction = GetCities;
