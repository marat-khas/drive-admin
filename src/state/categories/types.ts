export interface Category {
    id: string;
    name: string;
    description: string;
}

export interface CategoriesState {
    categories: Category[] | null;
}

export enum CategoriesActionTypes {
    GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS',
}

export interface GetCategories {
    type: CategoriesActionTypes.GET_CATEGORIES_SUCCESS;
    payload: Category[];
}

export type CategoriesAction = GetCategories;
