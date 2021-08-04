import { FC } from 'react';

import CarImg from '@assets/img/car.jpg';
import { Checkbox } from '@components/common/checkbox';

import './orders-item.scss';

export const OrdersItem: FC = () => (
    <div className='order-item'>
        <div className='order-item__wrapper'>
            <div className='order-item__part'>
                <div className='order-item__car'>
                    <div className='order-item__img'>
                        <img src={CarImg} alt='' />
                    </div>
                    <div className='order-item__desc'>
                        <ul>
                            <li>ELANTRA</li>
                            <li>Ульяновск, Нариманова 42</li>
                            <li>12.06.2019 12:00 — 13.06.2019 12:00</li>
                            <li>Цвет: Голубой</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='order-item__part'>
                <div className='order-item__props'>
                    <div className='order-item__option'>
                        <Checkbox name='full-tank' id='full-tank'>
                            Полный бак
                        </Checkbox>
                    </div>
                    <div className='order-item__option'>
                        <Checkbox name='child-chair' id='child-chair'>
                            Детское кресло
                        </Checkbox>
                    </div>
                    <div className='order-item__option'>
                        <Checkbox name='right-wheel' id='right-wheel'>
                            Правый руль
                        </Checkbox>
                    </div>
                </div>
            </div>
            <div className='order-item__part'>
                <div className='order-item__price'>4 300 ₽</div>
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
