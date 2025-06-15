import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'secretkey';

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log('🔐 Authorization Header:', authHeader);// Verificar si el token está presente y si comienza con 'Bearer '

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token no proporcionado o inválido' });
    }

    const token = authHeader.split(' ')[1];
    console.log('🧾 Token recibido:', token);

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        console.log('✅ Token decodificado:', decoded);

        req.user = decoded; // ahora tenés acceso a req.user.userId,etc
        next();
    } catch (error) {
        console.error('❌ Error al verificar token:', error.message);
        return res.status(401).json({ error: 'Token inválido o expirado' })
    }

};


export default authMiddleware