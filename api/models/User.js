//Importamos Mongoose para definir el esquema y bcrypt para encriptar contraseñas
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

//Definimo el esquema de usuario
const userSchema = new mongoose.Schema({
    //Nombre de usuario único y obligatorio
    username: { type: String, required: true, unique: true },
    //Email único y obligatorio
    email: { type: String, required: true, unique: true },
    //Contraseña obligatoria(se almacenará encriptada)
    password: { type: String, required: true }
}, { timestamps: true });

//Middleware que se ejecuta antes de guardar un usuario
userSchema.pre('save', async function (next) {
    //Si la contraseña no fue modificada continúa sin hacer nada 
    if (!this.isModified('password')) return next();
    //Encripta la contraseña con un salt de 10 rondas
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

//Metodo para comparar una contraseña en texto plano con la contraseña encriptada
userSchema.methods.comparePassword = async function (plainPassword) {
    return bcrypt.compare(plainPassword, this.password)
}

const User = mongoose.model('User', userSchema);
export default User;