import { KeyboardEvent } from 'react';

export interface InputProps {
    name: string;
    id: string;
    type?: string;
    label: string;
    error: boolean;
    keyUpHandle?: (e: KeyboardEvent<HTMLInputElement>) => void;
}
