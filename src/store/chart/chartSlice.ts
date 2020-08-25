import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChartState {
  initialBarColor: string;
  barColorsById: Record<string, string>;
  maxBarCount: number;
}

const initialState: ChartState = {
  initialBarColor: '#8884d8',
  barColorsById: {},
  maxBarCount: 8,
};

const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    changeBarColor(
      state: ChartState,
      { payload }: PayloadAction<{ id: string; color: string }>
    ) {
      const { id, color } = payload;

      state.barColorsById[id] = color;
    },
  },
});

export const { changeBarColor } = chartSlice.actions;
export const chartReducer = chartSlice.reducer;
