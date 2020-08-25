import { combineReducers } from '@reduxjs/toolkit';

import { accountsReducer } from './accounts/accountsSlice';
import { chartReducer } from './chart/chartSlice';

export const rootReducer = combineReducers({
  accounts: accountsReducer,
  chart: chartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
