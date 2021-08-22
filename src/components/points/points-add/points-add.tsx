import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';

import { Button } from '@components/common/button';
import { Select } from '@components/common/select';
import { GetCitiesAction } from '@state/cities/actions';
import { City } from '@state/cities/types';
import { ModalShowAction } from '@state/global/actions';
import { PointAddAction } from '@state/points/actions';
import { getCities } from '@state/selectors';

import { PointsAddProps } from './types';

export const PointsAdd: FC<PointsAddProps> = ({ open, closeHandle }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [city, setCity] = useState<City | null>(null);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');

    const formClear = () => {
        setName('');
        setAddress('');
    };

    const cities = useSelector(getCities);

    useEffect(() => {
        if (!cities) {
            dispatch(GetCitiesAction(history));
        } else {
            setCity(cities[0]);
        }
    }, [cities]);

    const submitHandle = () => {
        if (name && address && city) {
            dispatch(
                PointAddAction({
                    name,
                    address,
                    cityId: city,
                })
            );
            formClear();
            closeHandle();
        } else {
            dispatch(
                ModalShowAction({
                    head: 'Ошибка!',
                    body: 'Поля со звездочкой должны быть заполнены',
                })
            );
        }
    };

    const classes = classNames('entities-add', {
        isOpen: open,
    });

    return (
        <div className={classes}>
            <div className='entities-add__wrapper'>
                <div className='entities-add__head'>Новый пункт выдачи</div>
                <div className='entities-add__body'>
                    {cities && (
                        <div className='entities-add__item'>
                            <label className='label'>Город*</label>
                            <Select
                                onChange={(
                                    e: ChangeEvent<HTMLSelectElement>
                                ) => {
                                    setCity(
                                        cities.find(
                                            (item) => item.id === e.target.value
                                        )!
                                    );
                                }}
                                selectedValue={city?.id || cities[0].id}
                                options={cities.map((cityId) => ({
                                    label: cityId.name,
                                    value: cityId.id,
                                }))}
                            />
                        </div>
                    )}
                    <div className='entities-add__item'>
                        <label className='label'>Название*</label>
                        <input
                            type='text'
                            className='input'
                            value={name}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setName(e.target.value);
                            }}
                        />
                    </div>
                    <div className='entities-add__item'>
                        <label className='label'>Адрес*</label>
                        <input
                            type='text'
                            className='input'
                            value={address}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setAddress(e.target.value);
                            }}
                        />
                    </div>
                </div>
                <div className='entities-add__foot'>
                    <div className='entities-add__button'>
                        <Button onClick={submitHandle}>Создать</Button>
                    </div>
                    <div className='entities-add__button'>
                        <Button bg='red' onClick={closeHandle}>
                            Отменить
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
