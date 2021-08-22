import { FC } from 'react';

import { Upload } from '@components/common/upload';

import './car-card.scss';

import { CarCardProps } from './types';

export const CarCard: FC<CarCardProps> = ({
    car,
    src,
    tankValue,
    descValue,
    descChangeHandle,
    imgChangeHandle,
}) => (
    <div className='car-card'>
        <div className='car-card__item'>
            <div className='car-card-view'>
                <div className='car-card-view__img'>
                    <img src={src} alt={car.name} />
                </div>
                <div className='car-card-view__info'>
                    <div className='car-card-view__model'>{car.name}</div>
                    <div className='car-card-view__category'>
                        {car.categoryId?.name}
                    </div>
                </div>
                <div className='car-card-view__upload'>
                    <Upload id='car-card-upload' onChange={imgChangeHandle} />
                </div>
            </div>
        </div>
        <div className='car-card__item'>
            <div className='car-card-complete'>
                <div className='car-card-complete__head'>
                    <div className='car-card-complete__label'>Заполнено</div>
                    <div className='car-card-complete__label'>
                        {parseInt(tankValue, 10) || 0}%
                    </div>
                </div>
                <div className='car-card-complete__body'>
                    <div className='car-card-complete__scale'>
                        <div
                            className='car-card-complete__fill'
                            style={{
                                width: `${parseInt(tankValue, 10) || 0}%`,
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
                        <textarea
                            value={descValue}
                            onChange={(e) => {
                                if (descChangeHandle) {
                                    descChangeHandle(e.target.value);
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
);
