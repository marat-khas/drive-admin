import { FC } from 'react';

import CarPlaceholder from '@assets/img/car_placeholder.jpg';
import { Upload } from '@components/common/upload';
import { Car } from '@state/cars/types';
import { imgSrc } from '@utils/img-src';

import './car-card.scss';

export const CarCard: FC<{ car: Car }> = ({ car }) => {
    const img = car.thumbnail ? imgSrc(car.thumbnail.path) : CarPlaceholder;
    return (
        <div className='car-card'>
            <div className='car-card__item'>
                <div className='car-card-view'>
                    <div className='car-card-view__img'>
                        <img src={img} alt={car.name} />
                    </div>
                    <div className='car-card-view__info'>
                        <div className='car-card-view__model'>{car.name}</div>
                        <div className='car-card-view__category'>
                            {car.categoryId?.name}
                        </div>
                    </div>
                    <div className='car-card-view__upload'>
                        <Upload id='car-card-upload' />
                    </div>
                </div>
            </div>
            <div className='car-card__item'>
                <div className='car-card-complete'>
                    <div className='car-card-complete__head'>
                        <div className='car-card-complete__label'>
                            Заполнено
                        </div>
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
                            {car.description}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
