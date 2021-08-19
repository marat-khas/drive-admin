import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Select } from '@components/common/select';
import { PointsItemProps } from '@components/points/points-item/types';
import { GetCitiesAction } from '@state/cities/actions';
import { PointChangeAction } from '@state/points/actions';
import { Point } from '@state/points/types';
import { getCities } from '@state/selectors';

export const PointsItem: FC<PointsItemProps> = ({ point }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [city, setCity] = useState(point.cityId);
    const [name, setName] = useState(point.name);
    const [address, setAddress] = useState(point.address);

    const [editMode, setEditMode] = useState(false);
    const cities = useSelector(getCities);

    useEffect(() => {
        if (!cities) {
            dispatch(GetCitiesAction(history));
        }
    }, [cities]);

    const applyHandle = () => {
        const newPoint: {
            id: string;
            data: Partial<Point>;
        } = {
            id: point.id,
            data: {},
        };
        if (city && city.id !== point.cityId?.id) {
            newPoint.data.cityId = city;
        }
        if (!city && cities) {
            newPoint.data.cityId = { ...cities[0] };
        }
        if (name !== point.name) {
            newPoint.data.name = name;
        }
        if (address !== point.address) {
            newPoint.data.address = address;
        }
        if (Object.keys(newPoint.data).length) {
            dispatch(PointChangeAction(newPoint));
        }
        setEditMode(false);
    };

    const cancelHandle = () => {
        setCity(point.cityId);
        setName(point.name);
        setAddress(point.address);
        setEditMode(false);
    };

    return (
        <div className='entities__tr entities__link'>
            <div className='entities__td'>
                {editMode && cities ? (
                    <Select
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                            setCity(
                                cities.find(
                                    (item) => item.id === e.target.value
                                )!
                            );
                        }}
                        selectedValue={city?.id}
                        options={cities.map((cityId) => ({
                            label: cityId.name,
                            value: cityId.id,
                        }))}
                    />
                ) : (
                    <span>{point.cityId?.name}</span>
                )}
            </div>
            <div className='entities__td'>
                {editMode ? (
                    <input
                        className='input'
                        value={name}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setName(e.target.value);
                        }}
                    />
                ) : (
                    <span>{point.name}</span>
                )}
            </div>
            <div className='entities__td'>
                {editMode ? (
                    <input
                        className='input'
                        value={address}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setAddress(e.target.value);
                        }}
                    />
                ) : (
                    <span>{point.address}</span>
                )}
            </div>
            <div className='entities__td'>
                <div className='entities__action'>
                    {editMode ? (
                        <>
                            <button
                                className='order-item__btn order-item__btn--ok'
                                type='button'
                                onClick={applyHandle}
                            >
                                Готово
                            </button>
                            <button
                                className='order-item__btn order-item__btn--cancel'
                                type='button'
                                onClick={cancelHandle}
                            >
                                Отмена
                            </button>
                        </>
                    ) : (
                        <button
                            className='order-item__btn order-item__btn--edit'
                            type='button'
                            onClick={() => {
                                setEditMode(true);
                            }}
                        >
                            Изменить
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
