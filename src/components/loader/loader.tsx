import { FC } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import { getLoading } from '@state/selectors';

import './loader.scss';

export const Loader: FC = () => {
    const loading = useSelector(getLoading);
    const classes = classNames('loader', {
        'loader--active': loading.length,
    });
    return (
        <div className={classes}>
            <div className='loader__list'>
                {loading.map((process) => (
                    <div className='loader__item' key={process}>
                        {process}
                    </div>
                ))}
            </div>
        </div>
    );
};
