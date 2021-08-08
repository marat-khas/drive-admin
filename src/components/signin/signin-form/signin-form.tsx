import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, FormikHelpers } from 'formik';

import { Button } from '@components/common/button';
import { Input } from '@components/common/input/input';
import { UserOauthAction, UserRegisterAction } from '@state/user/actions';

import './signin-form.scss';

import { SigninSchema } from './schema';
import { FieldProps, SigninSchemaProps } from './types';

export const SigninForm: FC = () => {
    const dispatch = useDispatch();

    const initialValues: SigninSchemaProps = {
        username: '',
        password: '',
    };

    const fields: FieldProps[] = [
        {
            name: 'username',
            id: 'signin-username',
            type: 'text',
            label: 'Логин',
        },
        {
            name: 'password',
            id: 'signin-password',
            type: 'password',
            label: 'Пароль',
        },
    ];

    const [mode, setMode] = useState('oauth');

    const submitHandle = (
        { username, password }: SigninSchemaProps,
        { resetForm }: FormikHelpers<SigninSchemaProps>
    ) => {
        if (mode === 'oauth') {
            dispatch(
                UserOauthAction({
                    username,
                    password,
                })
            );
        } else {
            dispatch(
                UserRegisterAction({
                    username,
                    password,
                })
            );
        }
        resetForm();
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={SigninSchema}
            onSubmit={submitHandle}
        >
            {({ handleSubmit, errors, touched }) => (
                <form onSubmit={handleSubmit} className='signin-form'>
                    <div className='signin-form__body'>
                        {fields.map(({ name, id, type, label }) => (
                            <div className='signin-form__item' key={id}>
                                <Input
                                    error={Boolean(
                                        errors[name] && touched[name]
                                    )}
                                    name={name}
                                    id={id}
                                    type={type}
                                    label={label}
                                />
                            </div>
                        ))}
                    </div>
                    <div className='signin-form__foot'>
                        <div className='signin-form__access'>
                            <button
                                onClick={() => {
                                    setMode('register');
                                }}
                                type='submit'
                            >
                                Запросить доступ
                            </button>
                        </div>
                        <div className='signin-form__submit'>
                            <Button
                                onClick={() => {
                                    setMode('oauth');
                                }}
                                submit
                            >
                                Войти
                            </Button>
                        </div>
                    </div>
                </form>
            )}
        </Formik>
    );
};
