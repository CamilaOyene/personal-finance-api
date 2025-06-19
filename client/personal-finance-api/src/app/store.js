import { configureStore } from '@reduxjs/toolkit';
//Importo reducer de slice de autenticación
import authReducer from './authSlice';


export const store = configureStore({
    reducer: {
       auth: authReducer,   
    },
});