import { ChangeEvent } from 'react';

export interface UploadProps {
    id: string;
    label?: string;
    btnText?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
