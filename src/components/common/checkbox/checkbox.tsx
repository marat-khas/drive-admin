import { FC } from 'react';
import classNames from 'classnames';

import './checkbox.scss';

import { CheckboxProps } from './types';

export const Checkbox: FC<CheckboxProps> = ({
    children,
    name,
    id,
    checked,
    className,
    changeHandle,
}) => {
    let classNamesArray = ['checkbox'];
    if (className) {
        if (Array.isArray(className)) {
            classNamesArray = [...classNamesArray, ...className];
        } else {
            classNamesArray.push(className);
        }
    }
    const classes = classNames(...classNamesArray);

    return (
        <div className={classes}>
            <input
                type='checkbox'
                name={name}
                id={id}
                checked={checked}
                onChange={changeHandle}
            />
            <label htmlFor={id}> {children} </label>
        </div>
    );
};
