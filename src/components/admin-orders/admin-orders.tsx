import { FC } from 'react';

import { Orders } from '@components/orders';

export const AdminOrders: FC = () => (
    <>
        <div className='admin__title'>
            <h1>Заказы</h1>
        </div>
        <div className='admin__container'>
            <div className='admin__row'>
                <div className='admin__col'>
                    <div className='admin__wrap'>
                        <Orders />
                    </div>
                </div>
            </div>
        </div>
    </>
);
