export interface SigninSchemaProps {
    email: string;
    password: string;
}

export interface FieldProps {
    name: keyof SigninSchemaProps;
    id: string;
    type: string;
    label: string;
}
