import { configureStore } from '@reduxjs/toolkit';
//Importo reducer de slice de autenticación
import authReducer from '../features/auth/authSlice';
import accountsReducer from '../features/accounts/accountsSlice';
import categoriesReducer from '../features/categories/categoriesSlice';
import transactionsReducer from '../features/transactions/transactionsSlice';
import dashboardReducer from '../features/dashboard/dashboardSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        accounts: accountsReducer,
        categories: categoriesReducer,
        transactions: transactionsReducer,
        dashboard: dashboardReducer
    },
});