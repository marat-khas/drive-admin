import { FC, useState } from 'react';

import './upload.scss';

import { UploadProps } from './types';

export const Upload: FC<UploadProps> = ({
    id,
    label = 'Выберите файл...',
    btnText = 'Обзор',
    onChange,
}) => {
    const [value, setValue] = useState('');
    return (
        <div className='upload'>
            <input
                type='file'
                accept='image/png, image/jpeg'
                id={id}
                className='upload__input'
                onChange={(e) => {
                    setValue(e.target.value);
                    onChange(e);
                }}
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
