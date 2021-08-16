import { ChangeEventHandler } from 'react';

export interface RadioProps {
    name: string;
    id: string;
    checked?: boolean;
    className?: string | string[];
    onChange?: ChangeEventHandler<HTMLInputElement>;
}
