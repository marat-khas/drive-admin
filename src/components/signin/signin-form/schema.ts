import { object, SchemaOf, string } from 'yup';

import { ERROR_MESSAGES } from '@constants/validation';

import { SigninSchemaProps } from './types';

const VALIDATION = {
    username: {
        min: 3,
        max: 20,
    },
    password: {
        min: 3,
        max: 20,
    },
};

export const SigninSchema: SchemaOf<SigninSchemaProps> = object().shape({
    username: string()
        .min(
            VALIDATION.username.min,
            ERROR_MESSAGES.min(VALIDATION.username.min)
        )
        .max(
            VALIDATION.username.max,
            ERROR_MESSAGES.max(VALIDATION.username.max)
        )
        .required(ERROR_MESSAGES.required),
    password: string()
        .min(
            VALIDATION.password.min,
            ERROR_MESSAGES.min(VALIDATION.password.min)
        )
        .max(
            VALIDATION.password.max,
            ERROR_MESSAGES.max(VALIDATION.password.max)
        )
        .required(ERROR_MESSAGES.required),
});
