import { RootState } from './types';

export const getUser = (state: RootState) => state.user.data;
