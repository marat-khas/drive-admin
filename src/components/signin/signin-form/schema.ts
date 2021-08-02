import { object, SchemaOf, string } from 'yup';

import { ERROR_MESSAGES } from '@constants/validation';

import { SigninSchemaProps } from './types';

const VALIDATION = {
    password: {
        min: 6,
        max: 20,
    },
};

export const SigninSchema: SchemaOf<SigninSchemaProps> = object().shape({
    email: string()
        .email(ERROR_MESSAGES.email)
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
