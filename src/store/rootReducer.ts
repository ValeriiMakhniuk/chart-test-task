import { combineReducers } from '@reduxjs/toolkit';

import { accountsReducer } from './accounts/accountsSlice';

export const rootReducer = combineReducers({
  accounts: accountsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
