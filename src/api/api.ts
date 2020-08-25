import axios from 'axios';

export interface MAccount {
  id: string;
  name: string;
  amount: number;
}

export const getAccounts = async (): Promise<MAccount[]> => {
  return await axios.get('/accounts').then((response) => response.data);
};

export const addAccount = async (
  account: Partial<MAccount>
): Promise<MAccount> => {
  return await axios
    .post('/acounts', account, {
      headers: { 'Content-Type': 'application/json' },
    })
    .then((response) => response.data);
};

export const updateAccount = async (
  id: string,
  account: Partial<MAccount>
): Promise<MAccount> => {
  return await axios
    .patch(`/acounts/${id}`, account, {
      headers: { 'Content-Type': 'application/json' },
    })
    .then((response) => response.data);
};

export const deleteAccount = async (id: string) => {
  await axios.delete(`accounts/${id}`);
};
