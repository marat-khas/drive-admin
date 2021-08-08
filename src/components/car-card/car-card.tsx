import { FC } from 'react';

import CarPhoto from '@assets/img/car.jpg';
import { Upload } from '@components/common/upload';

import './car-card.scss';

export const CarCard: FC = () => (
    <div className='car-card'>
        <div className='car-card__item'>
            <div className='car-card-view'>
                <div className='car-card-view__img'>
                    <img src={CarPhoto} alt='auto-name' />
                </div>
                <div className='car-card-view__info'>
                    <div className='car-card-view__model'>Hyndai, i30 N</div>
                    <div className='car-card-view__category'>Компакт-кар</div>
                </div>
                <div className='car-card-view__upload'>
                    <Upload id='car-card-upload' />
                </div>
            </div>
        </div>
        <div className='car-card__item'>
            <div className='car-card-complete'>
                <div className='car-card-complete__head'>
                    <div className='car-card-complete__label'>Заполнено</div>
                    <div className='car-card-complete__label'>74%</div>
                </div>
                <div className='car-card-complete__body'>
                    <div className='car-card-complete__scale'>
                        <div
                            className='car-card-complete__fill'
                            style={{
                                width: '74%',
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
        <div className='car-card__item'>
            <div className='car-card-info'>
                <div className='car-card-info__item'>
                    <div className='car-card-info__head'>Описание</div>
                    <div className='car-card-info__body'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Odio eaque, quidem, commodi soluta qui quae quod dolorum
                        sint alias, possimus illum assumenda eligendi cumque?
                    </div>
                </div>
            </div>
        </div>
    </div>
);
