import { configureStore } from '@reduxjs/toolkit';

//Importar reducers
// eslint-disable-next-line no-unused-vars 
const dummyReducer = (state = {},action) => state;

export const store = configureStore({
    reducer: {
        dummy: dummyReducer,    
    },
});