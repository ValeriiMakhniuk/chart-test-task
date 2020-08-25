import React from 'react';

import { useSelector } from 'react-redux';

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { MAccount } from '../../api/api';

import { RootState } from '../../store/rootReducer';

import { EditChartModal } from '../edit-chart-modal/editChartModal';

interface AccountsChartProps {
  accounts: MAccount[];
}

export const AccountsChart: React.FC<AccountsChartProps> = ({ accounts }) => {
  const { initialBarColor, barColorsById } = useSelector(
    (state: RootState) => state.chart
  );

  return (
    <>
      <ResponsiveContainer width='100%' height={330}>
        <BarChart data={accounts}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Bar dataKey='amount'>
            {accounts.map((account) => {
              const color = barColorsById[account.id];
              return (
                <Cell
                  key={account.id}
                  fill={!color ? initialBarColor : color}
                />
              );
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <EditChartModal />
    </>
  );
};
