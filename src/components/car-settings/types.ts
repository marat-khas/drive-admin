export interface CarSettingsProps {
    nameValue: string;
    nameChangeHandle: (value: string) => void;
    categoryValue: {
        name: string;
        description: string;
        id: string;
    };
    categoryChangeHandle: (value: {
        name: string;
        description: string;
        id: string;
    }) => void;
    colors: string[];
    colorsChangeHandle: (value: string[]) => void;
    applyHandle: () => void;
    cancelHandle: () => void;
    deleteHandle: () => void;
}
