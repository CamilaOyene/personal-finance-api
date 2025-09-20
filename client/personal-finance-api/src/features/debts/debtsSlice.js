import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';


//Obtener todaslas deudas
export const getAllDebts = createAsyncThunk(
    'debts/getAllDebts',
    async (_, thunkAPI) => {
        try {
            const response = await api.get('/debts');
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.message || error.message);
        }
    }
);


//Crear una deuda 
export const createDebt = createAsyncThunk(
    'debts/createDebt',
    async (debtData, thunkAPI) => {
        try {
            const response = await api.post('/debts', debtData)
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.message || error.message);
        }
    }
);


//Editar deuda 
export const updateDebt = createAsyncThunk(
    'debts/updateDebt',
    async ({ debtId, updatedData }, thunkAPI) => {
        try {
            const response = await api.put(`/debts/${debtId}`, updatedData);
            return response.data;

        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.message || error.message);
        }
    }
);


//Eliminar deuda
export const deleteDebt = createAsyncThunk(
    'debts/deleteDebt',
    async (debtId, thunkAPI) => {
        try {
            await api.delete(`/debts/${debtId}`);
            return debtId;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.message || error.message);
        }
    }
);


//Obtener deuda por ID 
export const getDebtById = createAsyncThunk(
    'debts/getDebtById',
    async (debtId, thunkAPI) => {
        try {
            const response = await api.get(`/debts/${debtId}`);
            return response.data;

        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

//Marcar deuda como pagada 
export const markDebtAsPaid = createAsyncThunk(
    'debts/markDebtAsPaid',
    async ({ debtId, accountId }, thunkAPI) => {
        try {
            const response = await api.put(`/debts/mark-paid`, { debtId, accountId });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

//Estado inicial 
const initialState = {
    debts: [],
    selectedDebt: null,
    loading: false,
    error: null,
};

//Slice
const debtsSlice = createSlice({
    name: 'debts',
    initialState,
    reducers: {
        clearSelectedDebt: (state) => {
            state.selectedDebt = null;
        },
    },
    extraReducers: (builder) => {
        builder

            //Obtener todas las deudas
            .addCase(getAllDebts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getAllDebts.fulfilled, (state, action) => {
                state.loading = false;
                state.debts = action.payload;
                state.error = null;
            })

            .addCase(getAllDebts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //Crear deuda
            .addCase(createDebt.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createDebt.fulfilled, (state, action) => {
                state.loading = false;
                state.debts.push(action.payload);
                state.error = null;
            })
            .addCase(createDebt.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //Editar deuda 
            .addCase(updateDebt.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(updateDebt.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.debts.findIndex((debt) => debt._id === action.payload._id);
                if (index !== -1) {
                    state.debts[index] = action.payload;
                }
                state.error = null;
            })

            .addCase(updateDebt.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //Eliminar deuda
            .addCase(deleteDebt.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(deleteDebt.fulfilled, (state, action) => {
                state.loading = false;
                state.debts = state.debts.filter((debt) => debt._id !== action.payload);
                state.error = null;
            })

            .addCase(deleteDebt.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //Obtener deuda por ID
            .addCase(getDebtById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getDebtById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedDebt = action.payload;
                state.error = null;
            })

            .addCase(getDebtById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //Marcar deuda como pagada
            .addCase(markDebtAsPaid.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(markDebtAsPaid.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.debts.findIndex((debt) => debt._id === action.payload._id);
                if (index !== -1) state.debts[index] = action.payload;
                state.error = null;
            })

            .addCase(markDebtAsPaid.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});


export const { clearSelectedDebt } = debtsSlice.actions;
export default debtsSlice.reducer;