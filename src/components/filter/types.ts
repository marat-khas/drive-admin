import { Option } from '@components/common/select/types';

export interface FilterSelect {
    id: number;
    options: Option[];
    onChange?: (data: string) => void;
}
