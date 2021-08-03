import { FC } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

export const Admin: FC = () => {
    const { path } = useRouteMatch();
    return (
        <div className='admin'>
            <div className='admin__wrapper'>
                <aside className='admin__sidebar' />
                <div className='admin__body'>
                    <header className='admin__topbar' />
                    <main className='admin__main'>
                        <Switch>
                            <Route exact path={path}>
                                <div>Order List</div>
                            </Route>
                            <Route path={`${path}/car`}>
                                <div>Карточка автомобиля</div>
                            </Route>
                            <Route path={`${path}/`}>
                                <div>500 Error</div>
                            </Route>
                        </Switch>
                    </main>
                </div>
            </div>
            <aside />
        </div>
    );
};
