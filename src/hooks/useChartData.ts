import { useSelector } from 'react-redux';
import { RootState } from './../store/rootReducer';

export const useChartData = () => {
  const { byId, allIds } = useSelector((state: RootState) => state.accounts);

  const accounts = allIds.map((accId) => byId[accId]);

  const { barColorsById, maxBarCount, initialBarColor } = useSelector(
    (state: RootState) => state.chart
  );

  return { accounts, maxBarCount, initialBarColor, barColorsById };
};
