import { object, SchemaOf, string } from 'yup';

import { ERROR_MESSAGES } from '@constants/validation';

import { CarSettingsSchemaProps } from './types';

const VALIDATION = {
    model: {
        min: 6,
        max: 20,
    },
    type: {
        min: 6,
        max: 20,
    },
    color: {
        min: 3,
        max: 15,
    },
};

export const CarSettingsSchema: SchemaOf<CarSettingsSchemaProps> =
    object().shape({
        model: string()
            .min(VALIDATION.model.min, ERROR_MESSAGES.min(VALIDATION.model.min))
            .max(VALIDATION.model.max, ERROR_MESSAGES.max(VALIDATION.model.max))
            .required(ERROR_MESSAGES.required),
        type: string()
            .min(VALIDATION.type.min, ERROR_MESSAGES.min(VALIDATION.type.min))
            .max(VALIDATION.type.max, ERROR_MESSAGES.max(VALIDATION.type.max))
            .required(ERROR_MESSAGES.required),
        color: string()
            .min(VALIDATION.color.min, ERROR_MESSAGES.min(VALIDATION.color.min))
            .max(VALIDATION.color.max, ERROR_MESSAGES.max(VALIDATION.color.max))
            .required(ERROR_MESSAGES.required),
    });
