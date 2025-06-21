import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';


//Obtener todas las transacciones
export const getAllTransactions = createAsyncThunk(
    'transactions/getAll',
    async (_, thunkAPI) => {
        try {
            const res = await api.get('/transactions')
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
            return thunkAPI.rejectWithValue(error.response?.data?.error);
        }
    }
);

//estado inicial
const initialState = {
    transactions: [],
    selectedTransaction: null,
    loading: false,
    error: null,
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

    }
})