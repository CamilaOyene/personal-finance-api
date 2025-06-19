import axios from 'axios';

//Creamos una instancia de Axios con una URL base para todas las requests
const api = axios.create({
    baseURL: 'http://localhost:3000/api',
});

//Interceptor que se ejecuta antes de cada request saliente 
api.interceptors.request.use((config) => {
    //Lista de rutas públicas que NO necesitan autenticación
    const publicRoutes = ['/auth/register', '/auth/login'];

    //Verificamos si la URL de la request actual coincide con alguna pública
    const isPublic = publicRoutes.some((route) => config.url.includes((route)));

    //Si la ruta NO es pública, agregamos el token al header Autorization
    if (!isPublic) {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }

    //Retornamos la configuración modificada o original
    return config;
}, (error) => {
    //Si hubo un error antes de enviar la request, lo rechazamos
    return Promise.reject(error);
});


//Exportamos esta instancia lista para usar en toda la app 
export default api;