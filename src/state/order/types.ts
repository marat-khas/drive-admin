export interface Order {
    updatedAt: number;
    createdAt: number;
    orderStatusId: {
        name: string;
        id: string;
    };
    cityId: {
        name: string;
        id: string;
    };
    pointId: {
        address: string;
        name: string;
        id: string;
    };
    carId: {
        name: string;
        description: string;
        categoryId: {
            name: string;
            description: string;
            id: string;
        };
        priceMax: number;
        thumbnail: {
            path: string;
        };
        priceMin: number;
        number: string;
        tank: number;
        colors: string[];
        id: string;
    };
    color: string;
    dateTo: number;
    price: number;
    isFullTank: boolean;
    isNeedChildChair: boolean;
    isRightWheel: boolean;
    rateId: {
        rateTypeId: {
            unit: string;
            name: string;
            id: string;
        };
        price: number;
        id: string;
    };
    dateFrom: number;
    id: string;
}

export interface OrderState {
    data: Order[] | null;
    count: number;
}

export enum OrderActionTypes {
    ORDER_RECORD = 'ORDER_RECORD',
    ORDER_COUNT = 'ORDER_COUNT',
    ORDER_CHANGE = 'ORDER_CHANGE',
}

export interface OrderRecord {
    type: OrderActionTypes.ORDER_RECORD;
    payload: Order[] | null;
}

export interface OrderCount {
    type: OrderActionTypes.ORDER_COUNT;
    payload: number;
}

export interface OrderChange {
    type: OrderActionTypes.ORDER_CHANGE;
    payload: {
        id: string;
        data: Partial<Order>;
    };
}

export type OrderAction = OrderRecord | OrderCount | OrderChange;
