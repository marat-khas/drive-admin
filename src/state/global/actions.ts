import {
    GlobalActionTypes,
    LoadingEnd,
    LoadingStart,
    Modal,
    ModalHide,
    ModalShow,
} from './types';

export const LoadingStartAction = (process: string): LoadingStart => ({
    type: GlobalActionTypes.LOADING_START,
    payload: process,
});

export const LoadingEndAction = (process: string): LoadingEnd => ({
    type: GlobalActionTypes.LOADING_END,
    payload: process,
});

export const ModalShowAction = (modal: Modal): ModalShow => ({
    type: GlobalActionTypes.MODAL_SHOW,
    payload: modal,
});

export const ModalHideAction = (): ModalHide => ({
    type: GlobalActionTypes.MODAL_HIDE,
});
