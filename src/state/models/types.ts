export interface Model {
    id: string;
    name: string;
}

export interface ModelsState {
    data: Model[] | null;
}

export enum ModelsActionTypes {
    GET_MODELS_SUCCESS = 'GET_MODELS_SUCCESS',
}

export interface GetModels {
    type: ModelsActionTypes.GET_MODELS_SUCCESS;
    payload: Model[];
}

export type ModelsAction = GetModels;
