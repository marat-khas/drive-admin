import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import CarPlaceholder from '@assets/img/car_placeholder.jpg';
import { Checkbox } from '@components/common/checkbox';
import { OrderChangeAction } from '@state/order/actions';
import { Order } from '@state/order/types';
import { imgSrc } from '@utils/img-src';
import { numSpace } from '@utils/num-space';

import './orders-item.scss';

import { OrdersItemProps } from './types';

export const OrdersItem: FC<OrdersItemProps> = ({ order }) => {
    const dispatch = useDispatch();

    const [editMode, setEditMode] = useState(false);
    const [price, setPrice] = useState(order.price.toString() || '0');
    const [isFullTank, setIsFullTank] = useState(order.isFullTank);
    const [isNeedChildChair, setIsNeedChildChair] = useState(
        order.isNeedChildChair
    );
    const [isRightWheel, setIsRightWheel] = useState(order.isRightWheel);

    const [priceItem, setPriceItem] = useState(<span>Не указана</span>);

    useEffect(() => {
        if (editMode) {
            setPriceItem(
                <input
                    value={price}
                    disabled={!editMode}
                    onChange={(e) => {
                        const { value } = e.target;
                        if (value.search(/^\d*$/) !== -1) {
                            setPrice(e.target.value);
                        }
                    }}
                />
            );
        } else if (order.price) {
            setPriceItem(<span>{`${numSpace(order.price)} ₽`}</span>);
        } else {
            setPriceItem(<span>Не указана</span>);
        }
    }, [editMode, order.price, price]);

    const img = order.carId?.thumbnail.path
        ? imgSrc(order.carId?.thumbnail.path)
        : CarPlaceholder;

    const applyHandle = () => {
        const newOrder: {
            id: string;
            data: Partial<Order>;
        } = {
            id: order.id,
            data: {},
        };
        if (parseInt(price, 10) !== order.price) {
            newOrder.data.price = parseInt(price, 10);
        }
        if (isFullTank !== order.isFullTank) {
            newOrder.data.isFullTank = isFullTank;
        }
        if (isNeedChildChair !== order.isNeedChildChair) {
            newOrder.data.isNeedChildChair = isNeedChildChair;
        }
        if (isRightWheel !== order.isRightWheel) {
            newOrder.data.isRightWheel = isRightWheel;
        }
        if (Object.keys(newOrder.data).length) {
            dispatch(OrderChangeAction(newOrder));
        }
        setEditMode(false);
    };

    const cancelHandle = () => {
        setPrice(order.price.toString() || '0');
        setIsFullTank(order.isFullTank);
        setIsNeedChildChair(order.isNeedChildChair);
        setIsRightWheel(order.isRightWheel);
        setEditMode(false);
    };

    return (
        <div className='order-item'>
            <div className='order-item__wrapper'>
                <div className='order-item__part order-item__part--car'>
                    <div className='order-item__car'>
                        <div className='order-item__img'>
                            <img
                                src={img}
                                alt={order.carId?.name || 'Автомобиль'}
                            />
                        </div>
                        <div className='order-item__desc'>
                            <ul>
                                <li>
                                    Категория:{' '}
                                    {order.carId?.categoryId?.name ||
                                        'Не указана'}
                                </li>
                                <li>
                                    <span>
                                        {order.carId?.name ||
                                            'Модель не указана'}
                                    </span>
                                </li>
                                <li>
                                    Цвет:{' '}
                                    {order.color ? order.color : 'Не указан'}
                                </li>
                                <li>
                                    <span>
                                        {order.cityId?.name ||
                                            'Город не указан'}
                                    </span>
                                    {order.pointId &&
                                        `, ${order.pointId.address}`}
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
                <div className='order-item__part order-item__part--props'>
                    <div className='order-item__props'>
                        <div className='order-item__option'>
                            <Checkbox
                                name='full-tank'
                                id={`full-tank${order.id}`}
                                checked={isFullTank}
                                changeHandle={(e) => {
                                    setIsFullTank(e.target.checked);
                                }}
                                disabled={!editMode}
                            >
                                Полный бак
                            </Checkbox>
                        </div>
                        <div className='order-item__option'>
                            <Checkbox
                                name='child-chair'
                                id={`child-chair${order.id}`}
                                checked={isNeedChildChair}
                                changeHandle={(e) => {
                                    setIsNeedChildChair(e.target.checked);
                                }}
                                disabled={!editMode}
                            >
                                Детское кресло
                            </Checkbox>
                        </div>
                        <div className='order-item__option'>
                            <Checkbox
                                name='right-wheel'
                                id={`right-wheel${order.id}`}
                                checked={isRightWheel}
                                changeHandle={(e) => {
                                    setIsRightWheel(e.target.checked);
                                }}
                                disabled={!editMode}
                            >
                                Правый руль
                            </Checkbox>
                        </div>
                    </div>
                </div>
                <div className='order-item__part order-item__part--price'>
                    <div className='order-item__price'>{priceItem}</div>
                </div>
                <div className='order-item__part order-item__part--action'>
                    <div className='order-item__action'>
                        {editMode ? (
                            <>
                                <button
                                    className='order-item__btn order-item__btn--ok'
                                    type='button'
                                    onClick={applyHandle}
                                >
                                    Готово
                                </button>
                                <button
                                    className='order-item__btn order-item__btn--cancel'
                                    type='button'
                                    onClick={cancelHandle}
                                >
                                    Отмена
                                </button>
                            </>
                        ) : (
                            <button
                                className='order-item__btn order-item__btn--edit'
                                type='button'
                                onClick={() => {
                                    setEditMode(true);
                                }}
                            >
                                Изменить
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
