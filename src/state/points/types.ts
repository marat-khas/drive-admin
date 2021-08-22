export interface Point {
    name: string;
    address: string;
    id: string;
    cityId: {
        id: string;
        name: string;
    };
}

export interface PointsState {
    data: Point[] | null;
    count: number;
}

export enum PointsActionTypes {
    GET_POINTS_SUCCESS = 'GET_POINTS_SUCCESS',
    POINTS_COUNT = 'POINTS_COUNT',
    POINTS_CHANGE = 'POINTS_CHANGE',
}

export interface GetPoints {
    type: PointsActionTypes.GET_POINTS_SUCCESS;
    payload: Point[];
}

export interface CountPoints {
    type: PointsActionTypes.POINTS_COUNT;
    payload: number;
}

export interface ChangePoints {
    type: PointsActionTypes.POINTS_CHANGE;
    payload: {
        id: string;
        data: Partial<Point>;
    };
}

export type PointsAction = GetPoints | CountPoints | ChangePoints;
