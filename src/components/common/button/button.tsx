import { FC } from 'react';
import classNames from 'classnames';

import './button.scss';

import { ButtonProps } from './types';

export const Button: FC<ButtonProps> = ({
    children,
    submit = false,
    onClick,
    bg = 'blue',
}) => {
    const classes = classNames('button', `button--${bg}`);
    return (
        <button
            type={submit ? 'submit' : 'button'}
            className={classes}
            onClick={onClick}
        >
            {children}
        </button>
    );
};
