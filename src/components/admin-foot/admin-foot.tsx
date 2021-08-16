import { FC } from 'react';

import { Links } from '@components/links/links';

import './admin-foot.scss';

export const AdminFoot: FC = () => (
    <footer className='admin__foot'>
        <div className='admin-foot'>
            <div className='admin-foot__item'>
                <Links />
            </div>
            <div className='admin-foot__item'>
                <div className='admin-copyright'>
                    Copyright © 2021 Simbirsoft
                </div>
            </div>
        </div>
    </footer>
);
