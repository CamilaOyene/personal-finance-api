//Carga variables de entorno del archivo .env
require('dotenv').config(); 
// Importa la función para conectar con MongoDB 
import connectDB from './config/db.js';
//Importa express 
import express, { json } from 'express';
// Inicializa la aplicación de Express
const app = express();


//Define el puerto a usar(Lo toma del .env o usa  3000 por defecto )
const PORT = process.env.PORT || 3000;



//conecta a la base  de datos MongoDB
connectDB();

// Middleware para que Express  entienda JSON en el body de las peticiones
app.use(json());

//Rutade prueba en la raíz de la API 
app.get('/', (req, res) => {
    res.send('API Finanzas Personales funcionando🚀')
});

//Inicializa el servidor y lo  deja escuchando en el puerto indicado
app.listen(PORT, ()=> {
    console.log(`Servidor escuchando en puerto ${PORT}`)
})