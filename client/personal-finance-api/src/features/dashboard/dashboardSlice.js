import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

export const getDashboardData = createAsyncThunk(
    'dashboard/getDashboardData',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/dashboard');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

const initialState = {
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    account: [],
    latestTransactions: [],
    loading: false,
    error: null
}

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
                state.totalIncome = action.payload.totalIncome;
                state.totalExpense = action.payload.totalExpense;
                state.balance = action.payload.balance;
                state.accounts = action.payload.accounts;
                state.latestTransactions = action.payload.latestTransactions;
                state.error = null
            })
            .addCase(getDashboardData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export default dashboardSlice.reducer;