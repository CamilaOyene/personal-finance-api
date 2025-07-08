import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

// Thunk para obtener los datos del dashboard
export const getDashboardData = createAsyncThunk(
  'dashboard/getDashboardData',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/dashboard');
      console.log('fulfilled dashboardData: ', response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Estado inicial
const initialState = {
  totalIncome: 0,
  totalExpense: 0,
  balance: 0,
  accounts: [],
  latestTransactions: [],
  chartTransactions: [],
  loading: false,
  error: null,
};

// Slice
const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.totalIncome = action.payload.totalIncome;
          state.totalExpense = action.payload.totalExpense;
          state.balance = action.payload.balance;
          state.accounts = action.payload.accounts;
          state.latestTransactions = action.payload.latestTransactions;
          state.chartTransactions = action.payload.chartTransactions;
          state.error = null;
        } else {
          state.error = 'No se pudo obtener información del dashboard.';
        }
      })
      .addCase(getDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
