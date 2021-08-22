import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import Cookies from 'js-cookie';

import { Button } from '@components/common/button';
import { Select } from '@components/common/select';
import { Upload } from '@components/common/upload';
import { CarAddAction } from '@state/cars/actions';
import { Car } from '@state/cars/types';
import { GetCategoriesAction } from '@state/categories/actions';
import { Category } from '@state/categories/types';
import { ModalShowAction } from '@state/global/actions';
import { getCategories } from '@state/selectors';
import { isNumber } from '@utils/is-number';

import { PointsAddProps } from './types';

export const CarsAdd: FC<PointsAddProps> = ({ open, closeHandle }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const accessToken = Cookies.get('access_token');

    const [category, setCategory] = useState<Category | null>(null);
    const [name, setName] = useState('');
    const [description, setDiscription] = useState('');
    const [priceMin, setPriceMin] = useState('');
    const [priceMax, setPriceMax] = useState('');
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [src, setSrc] = useState('');
    const [colors, setColors] = useState<string[]>([]);
    const [tank, setTank] = useState('');
    const [number, setNumber] = useState('');

    const categories = useSelector(getCategories);

    const clearForm = () => {
        setName('');
        setDiscription('');
        setPriceMin('');
        setPriceMax('');
        setSrc('');
        setColors([]);
        setTank('');
        setNumber('');
    };

    useEffect(() => {
        if (!categories) {
            dispatch(GetCategoriesAction(history));
        }
    }, [categories]);

    const submitHandle = () => {
        if (
            accessToken &&
            name &&
            description &&
            category &&
            priceMax &&
            priceMin &&
            colors.length &&
            thumbnail
        ) {
            const newCar: Omit<Car, 'id' | 'thumbnail'> & { thumbnail?: File } =
                {
                    name,
                    description,
                    categoryId: category,
                    priceMax: parseInt(priceMax, 10),
                    priceMin: parseInt(priceMin, 10),
                    colors,
                    thumbnail,
                };
            if (tank) {
                newCar.tank = parseInt(tank, 10);
            }
            if (number) {
                newCar.number = number;
            }
            dispatch(CarAddAction(newCar, accessToken));
            clearForm();
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
                <div className='entities-add__head'>Новый автомобиль</div>
                <div className='entities-add__body'>
                    <div className='entities-add__item'>
                        <label className='label'>Изображение*</label>
                        <div className='entities-add__upload'>
                            <Upload
                                id='car-card-upload'
                                onChange={(
                                    e: ChangeEvent<HTMLInputElement>
                                ) => {
                                    const { files } = e.target;
                                    if (files) {
                                        setThumbnail(files[0]);
                                        setSrc(URL.createObjectURL(files[0]));
                                    }
                                }}
                            />
                        </div>
                        {src && (
                            <div className='entities-add__img'>
                                <img src={src} alt={name} />
                            </div>
                        )}
                    </div>
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
                    {categories && (
                        <div className='entities-add__item'>
                            <label className='label'>Категория*</label>
                            <Select
                                onChange={(
                                    e: ChangeEvent<HTMLSelectElement>
                                ) => {
                                    setCategory(
                                        categories.find(
                                            (item) => item.id === e.target.value
                                        )!
                                    );
                                }}
                                selectedValue={category?.id || categories[0].id}
                                options={categories.map((categoryId) => ({
                                    label: categoryId.name,
                                    value: categoryId.id,
                                }))}
                            />
                        </div>
                    )}
                    <div className='entities-add__item'>
                        <label className='label'>Опиание*</label>
                        <input
                            type='text'
                            className='input'
                            value={description}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setDiscription(e.target.value);
                            }}
                        />
                    </div>
                    <div className='entities-add__item entities-add__item--half'>
                        <label className='label'>Мин.*</label>
                        <input
                            type='text'
                            className='input'
                            value={priceMin}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                const { value } = e.target;
                                if (isNumber(value) || value === '') {
                                    setPriceMin(e.target.value);
                                }
                            }}
                        />
                    </div>
                    <div className='entities-add__item entities-add__item--half'>
                        <label className='label'>Макс.*</label>
                        <input
                            type='text'
                            className='input'
                            value={priceMax}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                const { value } = e.target;
                                if (isNumber(value) || value === '') {
                                    setPriceMax(e.target.value);
                                }
                            }}
                        />
                    </div>
                    <div className='entities-add__item'>
                        <label className='label'>Цвета (через запятую)*</label>
                        <input
                            type='text'
                            className='input'
                            value={colors}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setColors(
                                    e.target.value
                                        .split(',')
                                        .map((color) => color.trim())
                                );
                            }}
                        />
                    </div>
                    <div className='entities-add__item entities-add__item--half'>
                        <label className='label'>Топливо</label>
                        <input
                            type='text'
                            className='input'
                            value={tank}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                const { value } = e.target;
                                if (
                                    value === '' ||
                                    (isNumber(value) &&
                                        parseInt(value, 10) <= 100)
                                ) {
                                    setTank(e.target.value);
                                }
                            }}
                        />
                    </div>
                    <div className='entities-add__item entities-add__item--half'>
                        <label className='label'>Номер</label>
                        <input
                            type='text'
                            className='input'
                            value={number}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setNumber(e.target.value);
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
