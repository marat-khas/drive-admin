import { ChangeEventHandler } from 'react';

export interface Option {
    label: string;
    value: string;
}

export interface SelectProps {
    options: Option[];
    onChange: ChangeEventHandler<HTMLSelectElement>;
}
