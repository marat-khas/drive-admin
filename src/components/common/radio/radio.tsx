import { FC } from 'react';
import classNames from 'classnames';

import './radio.scss';

import { RadioProps } from './types';

export const Radio: FC<RadioProps> = ({
    children,
    name,
    id,
    checked = false,
    className,
    onChange,
}) => {
    let classNamesArray = ['radio'];
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
                type='radio'
                checked={checked}
                name={name}
                id={id}
                onChange={onChange}
            />
            <label htmlFor={id}> {children} </label>
        </div>
    );
};
