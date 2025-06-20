import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';



//Obtener todas las cuentas
export const getAllAccounts = createAsyncThunk(
    'accounts/getAll',
    async (_, thunkAPI) => {
        try {
            const res = await api.get('/accounts');
            return res.data

        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.error || 'Error al obtener cuentas')
        }
    }
);

//Obtener una cuenta por ID 
export const getAccountById = createAsyncThunk(
    'accounts/getById',
    async (id, thunkAPI) => {
        try {
            const res = await api.get(`/accounts/${id}`);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.error || 'Error al obtener la cuenta')
        }
    }
);


//Actualizar una cuenta 
export const createAccount = createAsyncThunk(
    'accounts/create',
    async (data, thunkAPI) => {
        try {
            const res = api.post('/accounts', data);
            return res.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.error || 'Error al crear cuenta')
        }
    }
);


//Actualizar una cuenta
export const updateAccount = createAsyncThunk(
    'accounts/update',
    async (data, thunkAPI) => {
        try {
            const res = await api.post('/accounts', data);
            return res.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.error || 'Error al actualizar cuenta');
        }
    }
);


//Eliminar una cuenta
export const deleteAccount = createAsyncThunk(
    'accounts/delete',
    async (id, thunkAPI) => {
        try {
            await api.delete(`/accounts/${id}`);
            return id;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.error || 'Error al eliminar cuenta')
        }
    }
);


//----------------------SLICE-----------------------

const initialState = {
    accounts: [],
    account: null,
    loading: false,
    error: null
};


const accountsSlice = createSlice({
    name: 'accounts',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder

            //getAll
            .addCase(getAllAccounts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getAllAccounts.fulfilled, (state, action) => {
                state.loading = false;
                state.accounts = action.payload;
            })

            .addCase(getAllAccounts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            //getById
            .addCase(getAccountById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getAccountById.fulfilled, (state, action) => {
                state.loading = false;
                state.account = action.payload;
            })

            .addCase(getAccountById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            //create
            .addCase(createAccount.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(createAccount.fulfilled, (state, action) => {
                state.loading = false;
                state.accounts.push(action.payload);
            })

            .addCase(createAccount.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            //update
            .addCase(updateAccount.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(updateAccount.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.accounts.findIndex(account => account._id === action.payload._id);
                if (index !== -1) {
                    state.accounts[index] = action.payload;
                }
            })

            .addCase(updateAccount.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            //delete
            .addCase(deleteAccount.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(deleteAccount.fulfilled, (state, action) => {
                state.loading = false;
                state.accounts = state.accounts.filter(account => account._id !== action.payload);
            })

            .addCase(deleteAccount.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    },
});



export default accountsSlice.reducer;