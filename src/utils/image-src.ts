import { SERVER_URL } from '@constants/urls';

export const imageSrc = (path: string) =>
    path.search(/^data/) === -1 ? `${SERVER_URL}/${path}` : path;
