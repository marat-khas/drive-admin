import { FC } from 'react';

import { Cars } from '@components/cars/cars';

export const AdminCars: FC = () => (
    <>
        <div className='admin__title'>
            <h1>Список автомобилей</h1>
        </div>
        <div className='admin__container'>
            <div className='admin__row'>
                <div className='admin__col'>
                    <div className='admin__wrap'>
                        <Cars />
                    </div>
                </div>
            </div>
        </div>
    </>
);
