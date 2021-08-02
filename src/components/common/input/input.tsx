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
}) => {
    const classes = classNames('input', {
        'input--error': error,
    });
    return (
        <div className={classes}>
            <label htmlFor={id} className='input__label'>
                {label}
            </label>
            <Field type={type} name={name} id={id} className='input__inp' />
            <span className='input__error'>
                <ErrorMessage name={name} />
            </span>
        </div>
    );
};
