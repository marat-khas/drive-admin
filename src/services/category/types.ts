import { Category } from '@state/categories/types';

export interface GetCategoriesResponse {
    data: {
        data: Category[];
    };
}
