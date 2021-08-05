import { City } from '@state/cities/types';

export interface GetCitiesResponse {
    data: {
        data: City[];
    };
}
