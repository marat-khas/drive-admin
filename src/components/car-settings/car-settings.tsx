import { ChangeEvent, FC, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { CarSettingsProps } from '@components/car-settings/types';
import { Button } from '@components/common/button';
import { GetCategoriesAction } from '@state/categories/actions';
import { getCategories } from '@state/selectors';

import './car-settings.scss';

export const CarSettings: FC<CarSettingsProps> = ({
    nameValue,
    nameChangeHandle,
    categoryValue,
    categoryChangeHandle,
    colors,
    colorsChangeHandle,
    applyHandle,
    cancelHandle,
    deleteHandle,
}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const categories = useSelector(getCategories);

    useEffect(() => {
        if (!categories) {
            dispatch(GetCategoriesAction(history));
        }
    }, [categories]);

    const colorRef = useRef<HTMLInputElement | null>(null);

    const addColor = (color: string) => {
        if (color.trim() !== '' && colors.indexOf(color) === -1) {
            colorsChangeHandle([...colors, color]);
        }
    };

    const removeColor = (color: string) => {
        colorsChangeHandle([
            ...colors.filter((colorName) => colorName !== color),
        ]);
    };

    return (
        <>
            <div className='car-settings__body'>
                <div className='car-settings__wrapper'>
                    <div className='car-settings__item'>
                        <div className='car-settings__label'>
                            <label htmlFor='car-name' className='label'>
                                Модель автомобиля
                            </label>
                        </div>
                        <div className='car-settings__input'>
                            <input
                                id='car-name'
                                className='input'
                                type='text'
                                value={nameValue}
                                onChange={(e) => {
                                    nameChangeHandle(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    {categories && (
                        <div className='car-settings__item'>
                            <div className='car-settings__label'>
                                <label htmlFor='car-category' className='label'>
                                    Тип автомобиля
                                </label>
                            </div>
                            <div className='car-settings__input'>
                                <select
                                    id='car-category'
                                    className='select'
                                    value={categoryValue?.id}
                                    onChange={(
                                        e: ChangeEvent<HTMLSelectElement>
                                    ) => {
                                        const selectedCategory =
                                            categories.find(
                                                (category) =>
                                                    category.id ===
                                                    e.target.value
                                            );
                                        if (selectedCategory) {
                                            categoryChangeHandle(
                                                selectedCategory
                                            );
                                        }
                                    }}
                                >
                                    {categories.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}

                    <div className='car-settings__item'>
                        <div className='car-settings__label'>
                            <label htmlFor='car-colors' className='label'>
                                Доступные цвета
                            </label>
                        </div>
                        <div className='car-settings__input'>
                            <input
                                id='car-colors'
                                className='input'
                                type='text'
                                ref={colorRef}
                            />
                            <div
                                className='car-settings__add'
                                onClick={() => {
                                    if (colorRef !== null) {
                                        addColor(
                                            (
                                                colorRef.current as HTMLInputElement
                                            ).value
                                        );
                                        (
                                            colorRef.current as HTMLInputElement
                                        ).value = '';
                                    }
                                }}
                            />
                        </div>
                        <div className='car-settings__colors'>
                            <ul>
                                {colors &&
                                    colors.map((colorName) => (
                                        <li key={colorName}>
                                            <span
                                                onClick={() => {
                                                    removeColor(colorName);
                                                }}
                                            >
                                                {colorName}
                                            </span>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className='car-settings__foot'>
                <div className='car-settings__action'>
                    <div className='car-settings__btn'>
                        <Button onClick={applyHandle}>Сохранить</Button>
                    </div>
                    <div className='car-settings__btn'>
                        <Button bg='red' onClick={cancelHandle}>
                            Отменить
                        </Button>
                    </div>
                    <div className='car-settings__btn car-settings__btn--delete'>
                        <Button bg='gray' onClick={deleteHandle}>
                            Удалить
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};
