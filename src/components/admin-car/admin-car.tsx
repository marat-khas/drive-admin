import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { CarCard } from '@components/car-card';
import { CarSettings } from '@components/car-settings';
import { GetCarAction } from '@state/car/actions';
import { getCar } from '@state/selectors';

export const AdminCar: FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { id } = useParams<{ id: string | undefined }>();
    const car = useSelector(getCar);

    useEffect(() => {
        if ((!car || car?.id !== id) && id) {
            dispatch(GetCarAction(id, history));
        }
    }, [car, dispatch, history, id]);

    return (
        <>
            <div className='admin__title'>
                <h1>Карточка автомобиля</h1>
            </div>
            <div className='admin__container'>
                {car ? (
                    <div className='admin__row'>
                        <div className='admin__col admin__col--card'>
                            <div className='admin__wrap'>
                                <CarCard car={car} />
                            </div>
                        </div>
                        <div className='admin__col admin__col--settings'>
                            <div className='admin__wrap'>
                                <div className='admin__subtitle'>
                                    <h2>Настройки автомобиля</h2>
                                </div>
                                <CarSettings car={car} />
                            </div>
                        </div>
                    </div>
                ) : (
                    <>Нет данных</>
                )}
            </div>
        </>
    );
};
