//Importa Mongoose, la biblioteca para trabajar con MongoDB 
import { connect } from 'mongoose';

//Función asincrónica que conecta a MongoDB
const connectDB = async () => {
    try {
        //Intenta conectarse a la URI de MongoDB desde el archivo .env
        await connect(process.env.MONGO_URI);
        console.log('Conectando a MongoDB con URI:', process.env.MONGO_URI);

        console.log('✅ Conectado a MongoDB')
    } catch (error) {
        //Si ocurre un error,lomuestra en consola 
        console.error('❌ Error conectando a MongoDB', error.message);
        //Finañizaelproceso con un código de  error 
        process.exit(1);
    }
};

//Exporta para poder usar en otros archivos. 
export default connectDB;