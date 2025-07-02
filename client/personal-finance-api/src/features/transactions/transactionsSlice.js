import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';


//Obtener todas las transacciones
export const getAllTransactions = createAsyncThunk(
    'transactions/getAll',
    async ({ filters = {}, page = 1, limit = 10 }, thunkAPI) => {
        try {
            const query = new URLSearchParams({
                ...filters,
                page,
                limit
            }).toString();

            const res = await api.get(`/transactions?${query}`);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.error || 'Error al obtener las transacciones');

        }
    }
);


//Obtener transacción por ID
export const getTransactionById = createAsyncThunk(
    'transactions/getById',
    async (id, thunkAPI) => {
        try {
            const res = await api.get(`/transactions/${id}`);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.error || 'Error al mostrar transacción')
        }
    }
);

// Crear transacción
export const createTransaction = createAsyncThunk(
    'transactions/create',
    async (transactionData, thunkAPI) => {
        try {
            const res = await api.post('/transactions', transactionData);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.error || 'Error al crear la transacción');
        }
    }
);


//Actualizar transacción

export const updateTransaction = createAsyncThunk(
    'transactions/update',
    async ({ id, data }, thunkAPI) => {
        try {
            const res = await api.put(`/transactions/${id}`, data);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.error || 'Error al actualizar la transacción');
        }
    }
);


//Eliminar transacción
export const deleteTransaction = createAsyncThunk(
    'transactions/delete',
    async (id, thunkAPI) => {
        try {
            await api.delete(`/transactions/${id}`);
            return id;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.error || 'Error  al eliminar transacción');
        }
    }
);

//estado inicial
const initialState = {
    transactions: [],
    selectedTransaction: null,
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
}


//Slice

const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        clearSelectedTransaction: (state) => {
            state.selectedTransaction = null;
        }
    },
    extraReducers: (builder) => {
        builder

            //GET ALL
            .addCase(getAllTransactions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getAllTransactions.fulfilled, (state, action) => {
                state.transactions = action.payload.transactions;
                state.total = action.payload.total;
                state.currentPage = action.payload.currentPage;
                state.totalPages = action.payload.totalPages;
                state.loading = false;
                state.error = null;
            })

            .addCase(getAllTransactions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            //get by id 
            .addCase(getTransactionById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getTransactionById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedTransaction = action.payload;
                state.error = null;
            })

            .addCase(getTransactionById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            //createTransaction
            .addCase(createTransaction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(createTransaction.fulfilled, (state, action) => {
                state.loading = false;
                state.transactions.push(action.payload);
                state.error = null;
            })

            .addCase(createTransaction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            //UPDATE
            .addCase(updateTransaction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(updateTransaction.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.transactions.findIndex(transaction => transaction._id === action.payload._id);
                if (index !== -1) {
                    state.transactions[index] = action.payload;
                };
                state.error = null;
            })

            .addCase(updateTransaction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            //delete transaction
            .addCase(deleteTransaction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(deleteTransaction.fulfilled, (state, action) => {
                state.loading = false;
                state.transactions = state.transactions.filter(transaction => transaction._id !== action.payload);
                state.error = null;
            })

            .addCase(deleteTransaction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});


export const { clearSelectedTransaction } = transactionsSlice.actions;

export default transactionsSlice.reducer;