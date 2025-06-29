import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../utils/api';


//Estado inicial
const initialState = {
    categories: [],
    loading: false,
    error: null,
};


//1. Obtener todas las categorías 
export const getAllCategories = createAsyncThunk(
    'categories/getAllCategories',
    async (_, thunkAPI) => {
        try {
            const res = await api('/categories');
            return res.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.error || 'Error al obtener categorías');
        }
    }
);


//2. Crear Categoría
export const createCategory = createAsyncThunk(
    'categories/create',
    async (categoryData, thunkAPI) => {
        try {
            const res = await api.post('/categories', categoryData);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.error || 'Error al crear categoría')
        }
    }
);


//3.Actualizar categoría

export const updateCategory = createAsyncThunk(
    'categories/update',
    async ({ id, data }, thunkAPI) => {
        try {
            const res = await api.put(`/categories/${id}`, data);
            return res.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.error || 'Error  al actualizar categoría')
        }
    }
);


//4. Eliminar categoria
export const deleteCategory = createAsyncThunk(
    'categories/delete',
    async (id, thunkAPI) => {
        try {
            await api.delete(`/categories/${id}`);
            return id;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.error || 'Error al eliminar categoria');
        }
    }
);



//Slice
const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder


            //Obtener todas las categorias
            .addCase(getAllCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getAllCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })

            .addCase(getAllCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            //Crear
            .addCase(createCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(createCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.categories.push(action.payload);
                state.error = null;
            })

            .addCase(createCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            //Update
            .addCase(updateCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(updateCategory.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.categories.findIndex(category => category._id === action.payload._id);
                if (index !== -1) {
                    state.categories[index] = action.payload;
                }
                state.error = null;
            })

            .addCase(updateCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            //Eliminar
            .addCase(deleteCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = state.categories.filter(category => category._id !== action.payload);
                state.error = null;
            })

            .addCase(deleteCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});


export default categoriesSlice.reducer;

