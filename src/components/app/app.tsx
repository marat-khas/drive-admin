import { FC, StrictMode } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { AppRouter } from '@components/app-router';
import { store } from '@state/store';

export const App: FC = () => (
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter basename={PUBLIC_PATH}>
                <div className='app'>
                    <AppRouter />
                </div>
            </BrowserRouter>
        </Provider>
    </StrictMode>
);
