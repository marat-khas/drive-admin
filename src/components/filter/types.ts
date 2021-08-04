import { Option } from '@components/common/select/types';

export interface FilterSelect {
    id: number;
    options: Option[];
    onChange: () => void;
}

export interface FilterProps {
    items: FilterSelect[];
}
