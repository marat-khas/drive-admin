import { FC, StrictMode } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { AppRouter } from '@components/app-router';
import { Loader } from '@components/loader';
import { Modal } from '@components/modal';
import { store } from '@state/store';

import './app.scss';

export const App: FC = () => (
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter basename={PUBLIC_PATH}>
                <div className='app'>
                    <AppRouter />
                    <Loader />
                    <Modal />
                </div>
            </BrowserRouter>
        </Provider>
    </StrictMode>
);
