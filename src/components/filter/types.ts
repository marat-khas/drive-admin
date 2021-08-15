import { Option } from '@components/common/select/types';

export interface FilterSelect {
    id: number;
    options: Option[];
    selectedValue: string | null;
    onChange?: (data: string) => void;
}

export interface FilterProps {
    filterItems: FilterSelect[];
    applyHandle: () => void;
    clearHandle: () => void;
}
