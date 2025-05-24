import { configureStore } from '@reduxjs/toolkit';

//Importar reducers

export const store = configureStore({
    reducer: {
        //auth: authReducer,
        // account: accountsReducer,
    },
});