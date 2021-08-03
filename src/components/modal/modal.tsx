import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { Button } from '@components/common/button';
import { ModalHideAction } from '@state/global/actions';
import { getModal } from '@state/selectors';

import './modal.scss';

export const Modal: FC = () => {
    const dispatch = useDispatch();

    const modal = useSelector(getModal);
    const classes = classNames('modal', {
        'modal--open': modal,
    });

    const clickHandle = () => {
        dispatch(ModalHideAction());
    };

    return (
        <div className={classes}>
            <div className='modal__wrapper'>
                <div className='modal__head'>{modal?.head}</div>
                <div className='modal__body'>{modal?.body}</div>
                <div className='modal__close'>
                    <Button onClick={clickHandle}>Закрыть</Button>
                </div>
            </div>
        </div>
    );
};
