import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Formik, FormikHelpers } from 'formik';

import { Button } from '@components/common/button';
import { Input } from '@components/common/input/input';
import { UserOauthAction, UserRegisterAction } from '@state/user/actions';

import './signin-form.scss';

import { SigninSchema } from './schema';
import { FieldProps, SigninSchemaProps } from './types';

export const SigninForm: FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const initialValues: SigninSchemaProps = {
        email: '',
        password: '',
    };

    const fields: FieldProps[] = [
        {
            name: 'email',
            id: 'signin-email',
            type: 'email',
            label: 'Почта',
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
        { email, password }: SigninSchemaProps,
        { resetForm }: FormikHelpers<SigninSchemaProps>
    ) => {
        if (mode === 'oauth') {
            dispatch(
                UserOauthAction(
                    {
                        username: email,
                        password,
                    },
                    history
                )
            );
        } else {
            dispatch(
                UserRegisterAction(
                    {
                        username: email,
                        password,
                    },
                    history
                )
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
