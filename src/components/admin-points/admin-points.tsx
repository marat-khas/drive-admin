import { FC } from 'react';

import { Points } from '@components/points';

export const AdminPoints: FC = () => (
    <>
        <div className='admin__title'>
            <h1>Список офисов</h1>
        </div>
        <div className='admin__container'>
            <div className='admin__row'>
                <div className='admin__col'>
                    <div className='admin__wrap'>
                        <Points />
                    </div>
                </div>
            </div>
        </div>
    </>
);
