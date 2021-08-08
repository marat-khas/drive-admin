export interface SigninSchemaProps {
    username: string;
    password: string;
}

export interface FieldProps {
    name: keyof SigninSchemaProps;
    id: string;
    type: string;
    label: string;
}
