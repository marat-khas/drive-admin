import { FC } from 'react';
import classNames from 'classnames';
import { ErrorMessage, Field } from 'formik';

import './input.scss';

import { InputProps } from './types';

export const Input: FC<InputProps> = ({
    name,
    id,
    type = 'text',
    label,
    error,
    keyUpHandle,
}) => {
    const classes = classNames('inp', {
        'inp--error': error,
    });
    return (
        <div className={classes}>
            <label htmlFor={id} className='inp__label'>
                {label}
            </label>
            <Field
                type={type}
                name={name}
                id={id}
                className='inp__input'
                onKeyUp={keyUpHandle}
            />
            <span className='inp__error'>
                <ErrorMessage name={name} />
            </span>
        </div>
    );
};
