import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

//Thunk para registrar usuario
export const registerUser = createAsyncThunk(
    'auth/register',
    async (userData, thunkAPI) => {
        try {
            const res = await api.post('/auth/register', userData);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.error || 'Error al registrar');
        }
    }
);

//Thunk para iniciar sesión
export const loginUser = createAsyncThunk(
    'auth/login',
    async (credentials, thunkAPI) => {
        try {
            const res = await api.post('/auth/login', credentials);
            return res.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.error || 'Error al iniciar sesión')
        }
    }
);

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),

    loading: false,
    error: null,
};


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },
    },

    extraReducers: (builder) => {
        builder

            //Register


            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })


            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isAuthenticated = false;
            })


            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            //LOGIN 

            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })


            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                localStorage.setItem('token', action.payload.token);
                localStorage.setItem('user', JSON.stringify(action.payload.user));
            })


            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;