import { FC, useState } from 'react';
import { Formik } from 'formik';

import { CarSettingsSchema } from '@components/car-settings/schema';
import { CarSettingsSchemaProps } from '@components/car-settings/types';
import { Button } from '@components/common/button';
import { Input } from '@components/common/input/input';
import { Car } from '@state/cars/types';

import './car-settings.scss';

export const CarSettings: FC<{ car: Car }> = ({ car }) => {
    const [colors, setColors] = useState(car.colors || []);

    const addColor = (color: string) => {
        if (color.trim() !== '' && colors.indexOf(color) === -1) {
            setColors([...colors, color]);
        }
    };

    const removeColor = (color: string) => {
        setColors([...colors.filter((colorName) => colorName !== color)]);
    };

    const initialValues: CarSettingsSchemaProps = {
        model: car.name,
        type: car.categoryId?.name || '',
        color: '',
    };

    const submitHandle = (props: CarSettingsSchemaProps) => {
        console.log(props);
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={CarSettingsSchema}
            onSubmit={submitHandle}
        >
            {({ handleSubmit, errors, touched, values }) => (
                <div className='car-settings'>
                    <form
                        onSubmit={handleSubmit}
                        className='car-settings__form'
                    >
                        <div className='car-settings__body'>
                            <div className='car-settings__wrapper'>
                                <div className='car-settings__item'>
                                    <div className='car-settings__input'>
                                        <Input
                                            id='car-settings-model'
                                            name='model'
                                            label='Модель автомобиля'
                                            error={Boolean(
                                                errors.model && touched.model
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className='car-settings__item'>
                                    <div className='car-settings__input'>
                                        <Input
                                            id='car-settings-type'
                                            name='type'
                                            label='Тип автомобиля'
                                            error={Boolean(
                                                errors.type && touched.type
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className='car-settings__item'>
                                    <div className='car-settings__input'>
                                        <Input
                                            id='car-settings-color'
                                            name='color'
                                            label='Доступные цвета'
                                            error={Boolean(
                                                errors.color && touched.color
                                            )}
                                        />
                                        <div
                                            className='car-settings__add'
                                            onClick={() => {
                                                addColor(values.color);
                                                values.color = '';
                                            }}
                                        />
                                    </div>
                                    <div className='car-settings__colors'>
                                        <ul>
                                            {colors.map((colorName) => (
                                                <li key={colorName}>
                                                    <span
                                                        onClick={() => {
                                                            removeColor(
                                                                colorName
                                                            );
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
                                    <Button>Сохранить</Button>
                                </div>
                                <div className='car-settings__btn'>
                                    <Button bg='red'>Отменить</Button>
                                </div>
                                <div className='car-settings__btn car-settings__btn--delete'>
                                    <Button bg='gray'>Удалить</Button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </Formik>
    );
};
