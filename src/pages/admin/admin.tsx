import { FC } from 'react';

import { AdminBody } from '@components/admin-body';
import { AdminFoot } from '@components/admin-foot';
import { AdminHead } from '@components/admin-head';
import { AdminSidebar } from '@components/admin-sidebar';

import './admin.scss';

export const Admin: FC = () => (
    <div className='admin'>
        <div className='admin__wrapper'>
            <AdminSidebar />
            <div className='admin__main'>
                <AdminHead />
                <AdminBody />
                <AdminFoot />
            </div>
        </div>
        <aside />
    </div>
);
