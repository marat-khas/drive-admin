import { useSelector } from 'react-redux';

import { getAuthStatus } from '@state/selectors';

export const useAuth = (): boolean => useSelector(getAuthStatus);
