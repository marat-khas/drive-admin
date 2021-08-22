import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import isEqual from 'lodash.isequal';

import CarPlaceholder from '@assets/img/car_placeholder.jpg';
import { CarCard } from '@components/car-card';
import { CarSettings } from '@components/car-settings';
import { Confirm } from '@components/confirm';
import {
    CarChangeAction,
    CarDeleteAction,
    CarGetAction,
} from '@state/car/actions';
import { Car } from '@state/cars/types';
import { getCar } from '@state/selectors';
import { imageSrc } from '@utils/image-src';

export const AdminCar: FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const accessToken = Cookies.get('access_token');

    const { id } = useParams<{ id: string | undefined }>();
    const car = useSelector(getCar);

    const [img, setImg] = useState<File | null>(null);
    const [imgSrc, setImgSrc] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [category, setCategory] = useState<{
        name: string;
        description: string;
        id: string;
    }>({
        name: '',
        description: '',
        id: '',
    });
    const [tank, setTank] = useState('');
    const [number, setNumber] = useState('');
    const [colors, setColors] = useState<string[]>([]);
    const [confirmOpen, setConfirmOpen] = useState(false);

    useEffect(() => {
        if ((!car || car?.id !== id) && id) {
            dispatch(CarGetAction(id, history));
        }
    }, [car, id]);

    const updateStateFromStore = () => {
        if (car) {
            setImgSrc(
                car.thumbnail ? imageSrc(car.thumbnail.path) : CarPlaceholder
            );
            setImg(null);
            if (
                car.description !== undefined &&
                car.description !== description
            ) {
                setDescription(car.description);
            }
            if (car.name !== name) {
                setName(car.name);
            }
            if (car.categoryId?.id !== category?.id) {
                setCategory(car.categoryId);
            }
            if (car.tank && car.tank?.toString() !== tank) {
                setTank(car.tank.toString());
            }
            if (car.number && car.number !== number) {
                setNumber(car.number);
            }
            if (!isEqual(car.colors, colors)) {
                setColors(car.colors);
            }
        }
    };

    useEffect(updateStateFromStore, [car]);

    const changeHandle = () => {
        const newCar: Partial<Omit<Car, 'thumbnail'>> & { thumbnail?: File } =
            {};
        if (img) {
            newCar.thumbnail = img;
        }
        if (description !== car?.description) {
            newCar.description = description;
        }
        if (name !== car?.name) {
            newCar.name = name;
        }
        if (category.id !== car?.categoryId?.id) {
            newCar.categoryId = category;
        }
        if (tank !== car?.tank?.toString()) {
            newCar.tank = parseInt(tank, 10);
        }
        if (number !== car?.number) {
            newCar.number = number;
        }
        if (!isEqual(colors, car?.colors)) {
            newCar.colors = colors;
        }
        if (Object.keys(newCar).length) {
            if (id && accessToken) {
                dispatch(
                    CarChangeAction({
                        id,
                        accessToken,
                        data: newCar,
                    })
                );
            }
        }
    };

    const deleteHandle = () => {
        if (id && accessToken) {
            dispatch(CarDeleteAction(id, accessToken, history));
        }
        setConfirmOpen(false);
    };

    const imgChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files) {
            setImg(files[0]);
            setImgSrc(URL.createObjectURL(files[0]));
        }
    };

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
                                <CarCard
                                    car={car}
                                    src={imgSrc}
                                    tankValue={tank}
                                    imgChangeHandle={imgChangeHandle}
                                    descValue={description}
                                    descChangeHandle={setDescription}
                                />
                            </div>
                        </div>
                        <div className='admin__col admin__col--settings'>
                            <div className='admin__wrap'>
                                <div className='admin__subtitle'>
                                    <h2>Настройки автомобиля</h2>
                                </div>
                                <CarSettings
                                    nameChangeHandle={setName}
                                    nameValue={name}
                                    categoryChangeHandle={setCategory}
                                    categoryValue={category}
                                    tankChangeHandle={setTank}
                                    tankValue={tank}
                                    numberChangeHandle={setNumber}
                                    numberValue={number}
                                    colors={colors}
                                    colorsChangeHandle={setColors}
                                    applyHandle={changeHandle}
                                    cancelHandle={updateStateFromStore}
                                    deleteHandle={() => {
                                        setConfirmOpen(true);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <>Нет данных</>
                )}
            </div>
            <Confirm
                info='Вы действительно хотить удалить автомобиль из базы?'
                open={confirmOpen}
                applyHandle={deleteHandle}
                cancelHandle={() => {
                    setConfirmOpen(false);
                }}
            />
        </>
    );
};
