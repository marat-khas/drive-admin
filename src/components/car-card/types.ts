import { Car } from '@state/cars/types';

export interface CarCardProps {
    car: Car;
    descValue: string;
    descChangeHandle: (val: string) => void;
    imgChangeHandle: (val: string) => void;
}
