import { ChangeEvent } from 'react';

import { Car } from '@state/cars/types';

export interface CarCardProps {
    car: Car;
    src: string;
    descValue: string;
    descChangeHandle: (val: string) => void;
    imgChangeHandle: (e: ChangeEvent<HTMLInputElement>) => void;
}
