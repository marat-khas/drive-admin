import { CATEGORY_URL } from '@constants/urls';
import { baseApi } from '@services/base';
import { Category } from '@state/categories/types';

import { GetCategoriesResponse } from './types';

export const getCategories = (): Promise<Category[]> =>
    baseApi
        .request({
            url: CATEGORY_URL,
        })
        .then((response: GetCategoriesResponse) => response.data.data);
