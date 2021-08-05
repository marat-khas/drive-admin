import { FC } from 'react';

import CarPlaceholder from '@assets/img/car_placeholder.jpg';
import { Checkbox } from '@components/common/checkbox';
import { imgSrc } from '@utils/img-src';
import { numSpace } from '@utils/num-space';

import './orders-item.scss';

import { OrdersItemProps } from './types';

export const OrdersItem: FC<OrdersItemProps> = ({ order }) => {
    const img = order.carId.thumbnail.path
        ? imgSrc(order.carId.thumbnail.path)
        : CarPlaceholder;
    return (
        <div className='order-item'>
            <div className='order-item__wrapper'>
                <div className='order-item__part'>
                    <div className='order-item__car'>
                        <div className='order-item__img'>
                            <img src={img} alt={order.carId.name} />
                        </div>
                        <div className='order-item__desc'>
                            <ul>
                                <li>
                                    <span>{order.carId.name}</span>
                                </li>
                                <li>Цвет: {order.color}</li>
                                <li>
                                    <span>{order.cityId.name}</span>,{' '}
                                    {order.pointId.address}
                                </li>
                                <li>{`${new Date(
                                    order.dateFrom
                                ).toLocaleDateString()} — ${new Date(
                                    order.dateTo
                                ).toLocaleDateString()}`}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='order-item__part'>
                    <div className='order-item__props'>
                        <div className='order-item__option'>
                            <Checkbox
                                name='full-tank'
                                id='full-tank'
                                checked={order.isFullTank}
                            >
                                Полный бак
                            </Checkbox>
                        </div>
                        <div className='order-item__option'>
                            <Checkbox
                                name='child-chair'
                                id='child-chair'
                                checked={order.isNeedChildChair}
                            >
                                Детское кресло
                            </Checkbox>
                        </div>
                        <div className='order-item__option'>
                            <Checkbox
                                name='right-wheel'
                                id='right-wheel'
                                checked={order.isRightWheel}
                            >
                                Правый руль
                            </Checkbox>
                        </div>
                    </div>
                </div>
                <div className='order-item__part'>
                    <div className='order-item__price'>
                        {numSpace(order.price)} ₽
                    </div>
                </div>
                <div className='order-item__part'>
                    <div className='order-item__action'>
                        <button
                            className='order-item__btn order-item__btn--ok'
                            type='button'
                        >
                            Готово
                        </button>
                        <button
                            className='order-item__btn order-item__btn--cancel'
                            type='button'
                        >
                            Отмена
                        </button>
                        <button
                            className='order-item__btn order-item__btn--edit'
                            type='button'
                        >
                            Изменить
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
