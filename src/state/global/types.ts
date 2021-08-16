export interface Modal {
    head: string;
    body: string;
}

export interface GlobalState {
    loading: string[];
    modal: Modal | null;
}

export enum GlobalActionTypes {
    LOADING_START = 'LOADING_START',
    LOADING_END = 'LOADING_END',
    MODAL_SHOW = 'MODAL_SHOW',
    MODAL_HIDE = 'MODAL_HIDE',
}

export interface LoadingStart {
    type: GlobalActionTypes.LOADING_START;
    payload: string;
}

export interface LoadingEnd {
    type: GlobalActionTypes.LOADING_END;
    payload: string;
}

export interface ModalShow {
    type: GlobalActionTypes.MODAL_SHOW;
    payload: Modal;
}

export interface ModalHide {
    type: GlobalActionTypes.MODAL_HIDE;
}

export type GlobalAction = LoadingStart | LoadingEnd | ModalShow | ModalHide;
