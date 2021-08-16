import { useSelector } from 'react-redux';

import { getUser } from '@state/selectors';

export const useAuth = (): boolean => Boolean(useSelector(getUser));
