import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || '12312312312';

const authMiddleware = (req,res,next)=> {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({error: 'Token no proporcionado o inválido'});
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded ; // ahora tenés acceso a req.user.userId,etc
        next();
    } catch (error) {
        return res.status(401).json({error: 'Token inválido o expirado'})
    }

};


export default authMiddleware