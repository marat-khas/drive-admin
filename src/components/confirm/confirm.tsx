import { FC } from 'react';
import classNames from 'classnames';

import { Button } from '@components/common/button';

import './confirm.scss';

import { ConfirmProps } from './types';

export const Confirm: FC<ConfirmProps> = ({
    open,
    info,
    applyHandle,
    cancelHandle,
}) => {
    const classes = classNames('confirm', {
        isOpen: open,
    });
    return (
        <div className={classes}>
            <div className='confirm__wrapper'>
                <div className='confirm__info'>{info}</div>
                <div className='confirm__action'>
                    <div className='confirm__btn'>
                        <Button onClick={applyHandle}>Подтвердить</Button>
                    </div>
                    <div className='confirm__btn'>
                        <Button onClick={cancelHandle} bg='red'>
                            Отменить
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
