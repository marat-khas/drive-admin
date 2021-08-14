import { FC } from 'react';

import { CarCard } from '@components/car-card';
import { CarSettings } from '@components/car-settings';

export const AdminCard: FC = () => (
    <>
        <div className='admin__title'>
            <h1>Карточка автомобиля</h1>
        </div>
        <div className='admin__container'>
            <div className='admin__row'>
                <div className='admin__col admin__col--card'>
                    <div className='admin__wrap'>
                        <CarCard />
                    </div>
                </div>
                <div className='admin__col admin__col--settings'>
                    <div className='admin__wrap'>
                        <div className='admin__subtitle'>
                            <h2>Настройки автомобиля</h2>
                        </div>
                        <CarSettings />
                    </div>
                </div>
            </div>
        </div>
    </>
);
