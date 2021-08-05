import { CitiesStateDefault } from './default';
import { CitiesAction, CitiesActionTypes, CitiesState } from './types';

export const citiesReducer = (
    state = CitiesStateDefault,
    action: CitiesAction
): CitiesState => {
    switch (action.type) {
        case CitiesActionTypes.GET_CITIES_SUCCESS: {
            return {
                ...state,
                cities: action.payload,
            };
        }
        default:
            return state;
    }
};
