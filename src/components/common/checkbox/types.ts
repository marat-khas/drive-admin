import { ChangeEventHandler } from 'react';

export interface CheckboxProps {
    name: string;
    id: string;
    checked?: boolean;
    disabled?: boolean;
    className?: string | string[];
    changeHandle?: ChangeEventHandler<HTMLInputElement>;
}
