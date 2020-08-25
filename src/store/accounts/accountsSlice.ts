import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk } from '../index';

import {
  MAccount,
  getAccounts as getAccountsFromApi,
  addAccount as addAccountToApi,
  updateAccount as updateAccountInApi,
  deleteAccount as deleteAccountFromApi,
} from '../../api/api';

import { delay } from '../../utils/delay';

interface AccountsState {
  byId: Record<string, MAccount>;
  allIds: string[];
  isLoading: boolean;
  error: string | null;
}

const initialState: AccountsState = {
  byId: {},
  allIds: [],
  isLoading: false,
  error: null,
};

const startLoading = (state: AccountsState) => {
  state.isLoading = true;
};

const loadingFailed = (state: AccountsState, action: PayloadAction<string>) => {
  state.isLoading = false;
  state.error = action.payload;
};

const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    getAccountsStart: startLoading,
    addAccountStart: startLoading,
    updateAccountStart: startLoading,
    deleteAccountStart: startLoading,
    getAccountsSucess(
      state: AccountsState,
      { payload: accounts }: PayloadAction<MAccount[]>
    ) {
      state.isLoading = false;
      state.error = null;

      accounts.forEach((account) => {
        state.byId[account.id] = account;
        state.allIds.push(account.id);
      });
    },
    addAccountSucess(
      state: AccountsState,
      { payload: addedAccount }: PayloadAction<MAccount>
    ) {
      state.isLoading = false;
      state.error = null;

      state.byId[addedAccount.id] = addedAccount;
      state.allIds.push(addedAccount.id);
    },
    updateAccountSucess(
      state: AccountsState,
      { payload: updatedAccount }: PayloadAction<MAccount>
    ) {
      state.isLoading = false;
      state.error = null;

      state.byId[updatedAccount.id] = updatedAccount;
    },
    deleteAccountSucess(
      state: AccountsState,
      { payload: id }: PayloadAction<string>
    ) {
      state.isLoading = false;
      state.error = null;

      delete state.byId[id];
      state.allIds.splice(
        state.allIds.findIndex((accountId) => accountId === id),
        1
      );
    },
    getAccountsFailure: loadingFailed,
    addAccountFailure: loadingFailed,
    updateAccountFailure: loadingFailed,
    deleteAccountFailure: loadingFailed,
  },
});

export const {
  getAccountsStart,
  addAccountStart,
  updateAccountStart,
  deleteAccountStart,
  getAccountsSucess,
  addAccountSucess,
  updateAccountSucess,
  deleteAccountSucess,
  getAccountsFailure,
  addAccountFailure,
  updateAccountFailure,
  deleteAccountFailure,
} = accountsSlice.actions;

export const accountsReducer = accountsSlice.reducer;

export const getAccounts = (): AppThunk => async (dispatch) => {
  try {
    dispatch(getAccountsStart());
    await delay();
    const accounts = await getAccountsFromApi();
    dispatch(getAccountsSucess(accounts));
  } catch (error) {
    dispatch(getAccountsFailure(error.message));
  }
};

export const postAccount = (accountData: Partial<MAccount>): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(addAccountStart());
    const account = await addAccountToApi(accountData);
    dispatch(addAccountSucess(account));
  } catch (error) {
    dispatch(addAccountFailure(error.message));
  }
};

export const patchAccount = (
  id: string,
  accountData: Partial<MAccount>
): AppThunk => async (dispatch) => {
  try {
    dispatch(updateAccountStart());
    const account = await updateAccountInApi(id, accountData);
    dispatch(updateAccountSucess(account));
  } catch (error) {
    dispatch(updateAccountFailure(error.message));
  }
};

export const deleteAccount = (id: string): AppThunk => async (dispatch) => {
  try {
    dispatch(deleteAccountStart());
    await deleteAccountFromApi(id);
    dispatch(deleteAccountSucess(id));
  } catch (error) {
    dispatch(deleteAccountFailure(error.message));
  }
};
