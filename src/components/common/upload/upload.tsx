import { ChangeEvent, FC, useState } from 'react';

import './upload.scss';

import { UploadProps } from './types';

export const Upload: FC<UploadProps> = ({
    id,
    label = 'Выберите файл...',
    btnText = 'Обзор',
}) => {
    const [value, setValue] = useState<string | null>(null);
    const changeHandle = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };
    return (
        <div className='upload'>
            <input
                type='file'
                id={id}
                className='upload__input'
                onChange={changeHandle}
            />
            <label htmlFor={id} className='upload__label'>
                <div className='upload__text'>
                    <span>{value || label}</span>
                </div>
                <div className='upload__btn'>{btnText}</div>
            </label>
        </div>
    );
};
